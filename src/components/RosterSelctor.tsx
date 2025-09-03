import React from 'react';
import { supabase } from '../lib/supabaseClient';

/** DB row types */
type DivisionRow = { id: string; name: string };
type TeamRow = { id: string; division_id: string; name: string; wins: number; losses: number };
type PlayerRow = {
  id: string;
  division_id: string;
  team_id: string | null;
  player_name: string;
  awards: number;
  is_captain: boolean;
  position: 'OH' | 'MB' | 'S' | 'RS' | string;
};

/** UI types (same shape you were using) */
type Team = { name: string; wins: number; losses: number };
type Award = {
  playerName: string;
  team: string;
  division: string;
  awards: number;
  isCaptain: boolean;
  position: string;
};

const RosterSelector: React.FC = () => {
  // Raw DB rows
  const [divisions, setDivisions] = React.useState<DivisionRow[]>([]);
  const [teams, setTeams] = React.useState<TeamRow[]>([]);
  const [players, setPlayers] = React.useState<PlayerRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  // UI selections
  const [division, setDivision] = React.useState<string>(''); // division name
  const [team, setTeam] = React.useState<string>('');         // team name

  // Fetch helpers
  const fetchAll = React.useCallback(async () => {
    const [{ data: d, error: e1 }, { data: t, error: e2 }, { data: p, error: e3 }] =
      await Promise.all([
        supabase.from('divisions').select('*').order('name'),
        supabase.from('teams').select('*'),
        supabase.from('players').select('*'),
      ]);
    if (e1 || e2 || e3) console.error(e1 ?? e2 ?? e3);
    setDivisions(d ?? []);
    setTeams(t ?? []);
    setPlayers(p ?? []);
  }, []);

  // Initial load
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
  }, [fetchAll]);

  // (Optional) realtime refresh
  React.useEffect(() => {
    const ch = supabase
      .channel('realtime-roster')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'divisions' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetchAll)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [fetchAll]);

  // Build lookup maps
  const byIdDiv = React.useMemo(() => Object.fromEntries(divisions.map(d => [d.id, d])), [divisions]);
  const byIdTeam = React.useMemo(() => Object.fromEntries(teams.map(t => [t.id, t])), [teams]);

  // Derive division -> teams[]
  const divisionStats: Record<string, Team[]> = React.useMemo(() => {
    const map: Record<string, Team[]> = {};
    divisions.forEach(d => { map[d.name] = []; });
    teams.forEach(t => {
      const divName = byIdDiv[t.division_id]?.name;
      if (!divName) return;
      (map[divName] ||= []).push({
        name: t.name,
        wins: Number(t.wins) || 0,
        losses: Number(t.losses) || 0,
      });
    });
    Object.keys(map).forEach(k => map[k].sort((a, b) => a.name.localeCompare(b.name)));
    return map;
  }, [divisions, teams, byIdDiv]);

  // Derive awardData with human-readable division/team names
  const awardData: Award[] = React.useMemo(() => {
    return players.map(p => ({
      playerName: p.player_name,
      team: p.team_id ? (byIdTeam[p.team_id]?.name ?? '') : '',
      division: byIdDiv[p.division_id]?.name ?? '',
      awards: Number(p.awards) || 0,
      isCaptain: !!p.is_captain,
      position: String(p.position ?? 'OH'),
    }));
  }, [players, byIdDiv, byIdTeam]);

  // Division/Team lists for selectors
  const divisionNames = React.useMemo(() => divisions.map(d => d.name), [divisions]);
  const teamsInDivision = React.useMemo(() => divisionStats[division] ?? [], [divisionStats, division]);

  // Keep selections valid when data changes
  React.useEffect(() => {
    if (!divisionNames.length) {
      setDivision('');
      setTeam('');
      return;
    }
    if (!division || !divisionNames.includes(division)) {
      setDivision(divisionNames[0]);
    }
  }, [divisionNames, division]);

  React.useEffect(() => {
    const nextTeams = division ? (divisionStats[division] ?? []) : [];
    if (!team || !nextTeams.some(t => t.name === team)) {
      setTeam(nextTeams[0]?.name ?? '');
    }
  }, [division, divisionStats, team]);

  // Roster for selected division & team
  const roster = React.useMemo(() => {
    return awardData
      .filter(p => p.division === division && p.team === team)
      .sort((a, b) => Number(b.isCaptain) - Number(a.isCaptain) || a.playerName.localeCompare(b.playerName));
  }, [awardData, division, team]);

  const currentTeamMeta = React.useMemo(
    () => (divisionStats[division] ?? []).find(t => t.name === team),
    [division, team, divisionStats]
  );
  const played = currentTeamMeta ? currentTeamMeta.wins + currentTeamMeta.losses : 0;

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">Loading roster…</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-navy mb-4">Team Rosters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">League / Division</label>
              <select
                className="w-full border rounded-lg p-2"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              >
                {divisionNames.length === 0 ? (
                  <option value="">No divisions</option>
                ) : (
                  divisionNames.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))
                )}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                className="w-full border rounded-lg p-2"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                {(teamsInDivision ?? []).map((t) => (
                  <option key={t.name} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Team meta */}
        {team && currentTeamMeta && (
          <div className="mb-4 text-gray-700">
            <span className="font-semibold">{team}</span> — {currentTeamMeta.wins}W / {currentTeamMeta.losses}L · Played {played}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Captain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Man Of the Match</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roster.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No players listed for this team yet.
                    </td>
                  </tr>
                ) : (
                  roster.map((p, i) => (
                    <tr key={`${p.playerName}-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.playerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.isCaptain ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.awards}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RosterSelector;
