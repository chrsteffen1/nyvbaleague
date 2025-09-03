// FILE: scripts/one-time-seed.mjs
import fs from 'fs/promises';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ---- REQUIRED envs (server-only) ----
const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See .env.seeding below.');
  process.exit(1);
}
const supabase = createClient(url, serviceKey);

// Map JSON division keys -> EXISTING DB division names
// You said you already created: "Mens - A", "Mens - B", "Womens"
const DIVISION_NAME_MAP = {
  'mens-a': 'Mens - A',
  'mens-b': 'Mens - B',
  'womens-a': 'Womens',
};

const asInt = (v) => (v === null || v === undefined || v === '' ? 0 : Number(v) || 0);

async function fetchDivisionsByNames(names) {
  const { data, error } = await supabase.from('divisions').select('id,name').in('name', names);
  if (error) throw error;
  const map = new Map(data.map((d) => [d.name, d.id]));
  return map;
}

async function fetchTeamsByDivisionIds(divIds) {
  const { data, error } = await supabase
    .from('teams')
    .select('id,division_id,name,wins,losses')
    .in('division_id', divIds);
  if (error) throw error;
  return data ?? [];
}

async function fetchPlayersByDivisionIds(divIds) {
  const { data, error } = await supabase
    .from('players')
    .select('id,division_id,team_id,player_name,awards,is_captain,position')
    .in('division_id', divIds);
  if (error) throw error;
  return data ?? [];
}

async function main() {
  // 1) Load JSON
  const raw = await fs.readFile('./data/seed.json', 'utf8');
  const json = JSON.parse(raw);

  const allJsonDivisionSlugs = Object.keys(json.divisionStats || {});
  const targetDivisionNames = allJsonDivisionSlugs.map((slug) => DIVISION_NAME_MAP[slug] || slug);

  // 2) Get existing division IDs (we DO NOT create divisions here)
  const divNameToId = await fetchDivisionsByNames(targetDivisionNames);

  // Ensure every mapped division exists
  const missing = targetDivisionNames.filter((n) => !divNameToId.has(n));
  if (missing.length) {
    console.error('❌ These divisions do not exist in DB (create them or adjust DIVISION_NAME_MAP):', missing);
    process.exit(1);
  }

  const divisionSlugToId = Object.fromEntries(
    allJsonDivisionSlugs.map((slug) => [slug, divNameToId.get(DIVISION_NAME_MAP[slug])])
  );
  const divisionIds = Object.values(divisionSlugToId);

  // 3) Teams: build desired state from JSON
  const desiredTeams = [];
  for (const [slug, teams] of Object.entries(json.divisionStats || {})) {
    const division_id = divisionSlugToId[slug];
    for (const t of teams) {
      desiredTeams.push({
        division_id,
        name: String(t.name),
        wins: asInt(t.wins),
        losses: asInt(t.losses),
      });
    }
  }

  // Fetch current teams in those divisions
  const existingTeams = await fetchTeamsByDivisionIds(divisionIds);
  const teamKey = (division_id, name) => `${division_id}::${name}`;
  const existingTeamMap = new Map(existingTeams.map((t) => [teamKey(t.division_id, t.name), t]));

  const teamsToInsert = [];
  const teamsToUpdate = [];
  for (const t of desiredTeams) {
    const k = teamKey(t.division_id, t.name);
    const ex = existingTeamMap.get(k);
    if (!ex) {
      teamsToInsert.push(t);
    } else if (ex.wins !== t.wins || ex.losses !== t.losses || ex.name !== t.name) {
      teamsToUpdate.push({ id: ex.id, ...t });
    }
  }

  if (teamsToInsert.length) {
    const { error } = await supabase.from('teams').insert(teamsToInsert);
    if (error) throw error;
    console.log(`✅ Inserted ${teamsToInsert.length} teams`);
  } else {
    console.log('ℹ️ No new teams to insert');
  }

  // Update teams one-by-one (no unique index required)
  for (const t of teamsToUpdate) {
    const { error } = await supabase.from('teams').update({
      name: t.name,
      wins: t.wins,
      losses: t.losses,
    }).eq('id', t.id);
    if (error) throw error;
  }
  if (teamsToUpdate.length) console.log(`✅ Updated ${teamsToUpdate.length} teams`);

  // Refresh teams to get their IDs for linking players
  const teamsAfter = await fetchTeamsByDivisionIds(divisionIds);
  const teamIdByDivAndName = new Map(
    teamsAfter.map((t) => [teamKey(t.division_id, t.name), t.id])
  );

  // 4) Players: build desired state
  const desiredPlayers = (json.awardData || []).map((p) => {
    const divisionName = DIVISION_NAME_MAP[p.division] || p.division; // mapped to DB name
    const division_id = divNameToId.get(divisionName);
    const teamName = p.team ? String(p.team) : '';
    const team_id = teamName ? teamIdByDivAndName.get(teamKey(division_id, teamName)) ?? null : null;

    return {
      division_id,
      team_id,
      player_name: String(p.playerName),
      awards: asInt(p.awards),
      is_captain: !!p.isCaptain,
      position: String(p.position || 'OH'),
    };
  });

  // Fetch existing players for those divisions
  const existingPlayers = await fetchPlayersByDivisionIds(divisionIds);
  const playerKey = (division_id, name) => `${division_id}::${name.toLowerCase()}`;
  const existingPlayerMap = new Map(existingPlayers.map((p) => [playerKey(p.division_id, p.player_name), p]));

  const playersToInsert = [];
  const playersToUpdate = [];
  for (const p of desiredPlayers) {
    const k = playerKey(p.division_id, p.player_name);
    const ex = existingPlayerMap.get(k);
    if (!ex) {
      playersToInsert.push(p);
    } else {
      // Compare fields; update if different
      if (
        ex.team_id !== p.team_id ||
        ex.awards !== p.awards ||
        ex.is_captain !== p.is_captain ||
        ex.position !== p.position
      ) {
        playersToUpdate.push({ id: ex.id, ...p });
      }
    }
  }

  if (playersToInsert.length) {
    // Insert in reasonable chunks
    const chunk = 500;
    for (let i = 0; i < playersToInsert.length; i += chunk) {
      const slice = playersToInsert.slice(i, i + chunk);
      const { error } = await supabase.from('players').insert(slice);
      if (error) throw error;
    }
    console.log(`✅ Inserted ${playersToInsert.length} players`);
  } else {
    console.log('ℹ️ No new players to insert');
  }

  for (const p of playersToUpdate) {
    const { error } = await supabase.from('players').update({
      division_id: p.division_id,
      team_id: p.team_id,
      player_name: p.player_name,
      awards: p.awards,
      is_captain: p.is_captain,
      position: p.position,
    }).eq('id', p.id);
    if (error) throw error;
  }
  if (playersToUpdate.length) console.log(`✅ Updated ${playersToUpdate.length} players`);

  console.log('🎉 One-time import complete.');
}

main().catch((e) => {
  console.error('❌ Import failed:', e);
  process.exit(1);
});
