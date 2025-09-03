import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// --- DB row types ---
type DivisionRow = { id: string; name: string };
type TeamRow = { id: string; division_id: string; name: string; wins: number; losses: number };
type PlayerRow = {
  id: string;
  division_id: string;
  team_id: string | null;
  player_name: string;
  awards: number;
  is_captain: boolean;
  position: 'OH' | 'MB' | 'S' | 'RS';
};

// --- UI model ---
type Team = { id: string; name: string; wins: number; losses: number };
type DivisionStats = Record<string, Team[]>;
type Player = {
  id: string;
  playerName: string;
  team: string;     // team name for dropdown
  division: string; // division name
  awards: number;
  isCaptain: boolean;
  position: 'OH' | 'MB' | 'S' | 'RS';
};
type LeagueData = { divisionStats: DivisionStats; awardData: Player[] };

const Admin: React.FC = () => {
  const [dbDivisions, setDbDivisions] = useState<DivisionRow[]>([]);
  const [dbTeams, setDbTeams] = useState<TeamRow[]>([]);
  const [dbPlayers, setDbPlayers] = useState<PlayerRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Player Management selectors
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>(''); // '' = All, '__none__' = No Team

  // Draft names so we only persist & resort on blur
  const [nameDrafts, setNameDrafts] = useState<Record<string, string>>({});

  // UI feedback
  const [msg, setMsg] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);
  const note = (type: 'error' | 'success' | 'info', text: string) => setMsg({ type, text });

  // --- Create panel local state ---
  const [newDivisionName, setNewDivisionName] = useState('');
  const [newTeamDivision, setNewTeamDivision] = useState(''); // division name
  const [newTeamName, setNewTeamName] = useState('');
  const [newPlayerDivision, setNewPlayerDivision] = useState(''); // division name
  const [newPlayerTeam, setNewPlayerTeam] = useState(''); // team name (optional)
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState<'OH' | 'MB' | 'S' | 'RS'>('OH');
  const [newPlayerCaptain, setNewPlayerCaptain] = useState(false);
  const [newPlayerAwards, setNewPlayerAwards] = useState<number>(0);

  // Fetch all data
  const fetchAll = async () => {
    const [{ data: divisions, error: e1 }, { data: teams, error: e2 }, { data: players, error: e3 }] =
      await Promise.all([
        supabase.from('divisions').select('*').order('name'),
        supabase.from('teams').select('*'),
        supabase.from('players').select('*'),
      ]);
    if (e1 || e2 || e3) console.error(e1 ?? e2 ?? e3);

    setDbDivisions(divisions ?? []);
    setDbTeams(teams ?? []);
    setDbPlayers(players ?? []);
    setNameDrafts({}); // clear drafts after refresh so sorting is stable
  };

  // Initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep selected division valid
  useEffect(() => {
    if (!dbDivisions.length) {
      setSelectedDivision('');
      return;
    }
    if (!selectedDivision || !dbDivisions.some(x => x.name === selectedDivision)) {
      setSelectedDivision(dbDivisions[0].name);
    }
  }, [dbDivisions, selectedDivision]);

  // Reset team filter & drafts when switching division
  useEffect(() => {
    setSelectedTeam('');
    setNameDrafts({});
  }, [selectedDivision]);

  // Build UI data
  const data: LeagueData = useMemo(() => {
    const byIdDiv = Object.fromEntries(dbDivisions.map(d => [d.id, d]));
    const byIdTeam = Object.fromEntries(dbTeams.map(t => [t.id, t]));

    const divisionStats: DivisionStats = {};
    dbDivisions.forEach(d => { divisionStats[d.name] = []; });
    dbTeams.forEach(t => {
      const divName = byIdDiv[t.division_id]?.name;
      if (!divName) return;
      (divisionStats[divName] ||= []).push({ id: t.id, name: t.name, wins: t.wins, losses: t.losses });
    });

    const awardData: Player[] = dbPlayers.map(p => {
      const divName = byIdDiv[p.division_id]?.name ?? '';
      const teamName = p.team_id ? (byIdTeam[p.team_id]?.name ?? '') : '';
      return {
        id: p.id,
        playerName: p.player_name,
        team: teamName,
        division: divName,
        awards: p.awards,
        isCaptain: p.is_captain,
        position: p.position,
      };
    });

    for (const key of Object.keys(divisionStats)) {
      divisionStats[key].sort((a, b) => a.name.localeCompare(b.name));
    }

    return { divisionStats, awardData };
  }, [dbDivisions, dbTeams, dbPlayers]);

  // Derived lists
  const allDivisionNames = dbDivisions.map(d => d.name);

  const teamsForSelectedDivision = useMemo(
    () => data.divisionStats[selectedDivision]?.map(t => t.name) ?? [],
    [data.divisionStats, selectedDivision]
  );

  // Filter players by selected division and optional team; then sort by name (empty names last).
  const playersForSelectedDivision = useMemo(() => {
    const filtered = data.awardData.filter(p => p.division === selectedDivision)
      .filter(p => {
        if (selectedTeam === '') return true;           // All teams
        if (selectedTeam === '__none__') return !p.team; // No team
        return p.team === selectedTeam;                 // Specific team
      });

    // Sort only by saved names (not drafts) so typing doesn't reorder rows;
    // empty names go last.
    return [...filtered].sort((a, b) => {
      const an = a.playerName.trim().toLowerCase();
      const bn = b.playerName.trim().toLowerCase();
      const aEmpty = an.length === 0;
      const bEmpty = bn.length === 0;
      if (aEmpty && bEmpty) return a.id.localeCompare(b.id);
      if (aEmpty) return 1;
      if (bEmpty) return -1;
      const byName = an.localeCompare(bn);
      return byName !== 0 ? byName : a.id.localeCompare(b.id);
    });
  }, [data.awardData, selectedDivision, selectedTeam]);

  // helpers
  const findDivisionIdByName = (name: string) => dbDivisions.find(d => d.name === name)?.id ?? null;
  const findTeamIdByDivisionAndName = (divisionName: string, teamName: string) => {
    const divId = findDivisionIdByName(divisionName);
    if (!divId) return null;
    return dbTeams.find(t => t.division_id === divId && t.name === teamName)?.id ?? null;
  };

  // ----- Create handlers (Division / Team / Player) -----
  const handleCreateDivision = async () => {
    const name = newDivisionName.trim();
    if (!name) return note('error', 'Division name is required.');
    const { data, error } = await supabase.from('divisions').insert({ name }).select('*').single();
    if (error) {
      note('error', `Create division failed: ${error.message}`);
      return;
    }
    note('success', `Division "${data.name}" created.`);
    setNewDivisionName('');
    setSelectedDivision(data.name);
    setNewTeamDivision(data.name);
    setNewPlayerDivision(data.name);
    await fetchAll();
  };

  const handleCreateTeam = async () => {
    const divName = newTeamDivision || selectedDivision;
    const name = newTeamName.trim();
    if (!divName) return note('error', 'Select a division for the new team.');
    if (!name) return note('error', 'Team name is required.');
    const division_id = findDivisionIdByName(divName);
    if (!division_id) return note('error', 'Selected division not found.');
    const { error } = await supabase.from('teams').insert({ division_id, name, wins: 0, losses: 0 });
    if (error) {
      note('error', `Create team failed: ${error.message}`);
      return;
    }
    note('success', `Team "${name}" created in ${divName}.`);
    setNewTeamName('');
    await fetchAll();
  };

  const handleCreatePlayer = async () => {
    const divName = newPlayerDivision || selectedDivision;
    const playerName = newPlayerName.trim();
    if (!divName) return note('error', 'Select a division for the new player.');
    if (!playerName) return note('error', 'Player name is required.');
    const division_id = findDivisionIdByName(divName);
    if (!division_id) return note('error', 'Selected division not found.');
    const team_id = newPlayerTeam ? findTeamIdByDivisionAndName(divName, newPlayerTeam) : null;

    const { error } = await supabase.from('players').insert({
      division_id,
      team_id,
      player_name: playerName,
      awards: Number(newPlayerAwards) || 0,
      is_captain: !!newPlayerCaptain,
      position: newPlayerPosition,
    });
    if (error) {
      note('error', `Create player failed: ${error.message}`);
      return;
    }
    note('success', `Player "${playerName}" created in ${divName}${team_id ? ` (${newPlayerTeam})` : ''}.`);
    setNewPlayerName('');
    setNewPlayerTeam('');
    setNewPlayerAwards(0);
    setNewPlayerCaptain(false);
    setNewPlayerPosition('OH');
    await fetchAll();
  };

  // ----- Team editing -----
  const handleTeamChange = async (
    divisionName: string,
    teamIndex: number,
    field: 'name' | 'wins' | 'losses',
    value: string
  ) => {
    const team = data.divisionStats[divisionName]?.[teamIndex];
    if (!team) return;
    const payload: Partial<TeamRow> =
      field === 'wins' || field === 'losses'
        ? ({ [field]: Number(value) || 0 } as any)
        : ({ [field]: value } as any);
    const { error } = await supabase.from('teams').update(payload).eq('id', team.id);
    if (error) note('error', `Update team failed: ${error.message}`);
    else note('success', 'Team updated.');
    await fetchAll();
  };

  const handleAddTeamInline = async (divisionName: string) => {
    const division_id = findDivisionIdByName(divisionName);
    if (!division_id) return note('error', 'Division not found.');
    const { error } = await supabase.from('teams').insert({ division_id, name: 'New Team', wins: 0, losses: 0 });
    if (error) note('error', `Create team failed: ${error.message}`);
    else note('success', `Team created in ${divisionName}.`);
    await fetchAll();
  };

  const handleRemoveTeam = async (divisionName: string, teamIndex: number) => {
    const team = data.divisionStats[divisionName]?.[teamIndex];
    if (!team) return;
    const { error: e1 } = await supabase.from('players').update({ team_id: null }).eq('team_id', team.id);
    const { error: e2 } = await supabase.from('teams').delete().eq('id', team.id);
    if (e1 || e2) note('error', `Remove team failed: ${(e1 ?? e2)?.message}`);
    else note('success', 'Team removed.');
    await fetchAll();
  };

  // ----- Player editing -----
  const handleAwardChangeById = async (playerId: string, field: keyof Player, value: any) => {
    const p = dbPlayers.find(x => x.id === playerId);
    if (!p) return;

    let error = null as any;

    if (field === 'playerName') {
      ({ error } = await supabase.from('players').update({ player_name: String(value) }).eq('id', playerId));
    } else if (field === 'awards') {
      ({ error } = await supabase.from('players').update({ awards: Number(value) || 0 }).eq('id', playerId));
    } else if (field === 'isCaptain') {
      ({ error } = await supabase.from('players').update({ is_captain: !!value }).eq('id', playerId));
    } else if (field === 'position') {
      ({ error } = await supabase.from('players').update({ position: value as Player['position'] }).eq('id', playerId));
    } else if (field === 'team') {
      // Use the currently selected division (this table is filtered by it)
      const teamId = value ? findTeamIdByDivisionAndName(selectedDivision, String(value)) : null;
      const divisionId = teamId
        ? dbTeams.find(t => t.id === teamId)?.division_id ?? p.division_id
        : p.division_id;
      ({ error } = await supabase
        .from('players')
        .update({ team_id: teamId, division_id: divisionId })
        .eq('id', playerId));
    } else if (field === 'division') {
      const divisionId = findDivisionIdByName(String(value));
      if (divisionId) ({ error } = await supabase.from('players').update({ division_id: divisionId }).eq('id', playerId));
    }

    if (error) note('error', `Update player failed: ${error.message}`);
    else note('success', 'Player updated.');
    await fetchAll();
  };

  const handleAddPlayerInline = async (divisionName: string) => {
    const division_id = findDivisionIdByName(divisionName);
    if (!division_id) return note('error', 'Division not found.');
    const { error } = await supabase.from('players').insert({
      division_id,
      team_id: null,
      player_name: '',
      awards: 0,
      is_captain: false,
      position: 'OH',
    });
    if (error) note('error', `Create player failed: ${error.message}`);
    else note('success', `Blank player created in ${divisionName}.`);
    await fetchAll();
  };

  const handleRemovePlayerById = async (playerId: string) => {
    const { error } = await supabase.from('players').delete().eq('id', playerId);
    if (error) note('error', `Remove player failed: ${error.message}`);
    else note('success', 'Player removed.');
    await fetchAll();
  };

  // --- Player name draft handlers (only persist & resort on blur) ---
  const onPlayerNameChange = (playerId: string, next: string) => {
    setNameDrafts((d) => ({ ...d, [playerId]: next }));
  };
  const onPlayerNameBlur = async (player: Player) => {
    const draft = (nameDrafts[player.id] ?? '').trim();
    if (draft !== player.playerName) {
      await handleAwardChangeById(player.id, 'playerName', draft);
    }
    setNameDrafts((d) => {
      const { [player.id]: _, ...rest } = d;
      return rest;
    });
  };

  // ---------- Render ----------
  if (loading) return <div className="p-4">Loading…</div>;

  const teamsForSelectedPlayerDivision =
    (newPlayerDivision ? data.divisionStats[newPlayerDivision] : [])?.map(t => t.name) ?? [];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {msg && (
        <div
          className={
            msg.type === 'error'
              ? 'p-3 rounded bg-red-50 text-red-700 border border-red-200'
              : msg.type === 'success'
              ? 'p-3 rounded bg-green-50 text-green-700 border border-green-200'
              : 'p-3 rounded bg-blue-50 text-blue-700 border border-blue-200'
          }
        >
          {msg.text}
        </div>
      )}

      {/* Create Panel */}
      <section className="p-4 border rounded space-y-4">
        <h2 className="text-xl font-semibold">Create</h2>

        {/* Create Division */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="border p-2"
            placeholder="New division name"
            value={newDivisionName}
            onChange={e => setNewDivisionName(e.target.value)}
          />
          <button onClick={handleCreateDivision} className="bg-indigo-600 text-white px-3 py-2 rounded">
            Create Division
          </button>
        </div>

        {/* Create Team */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="border p-2"
            value={newTeamDivision || selectedDivision}
            onChange={e => setNewTeamDivision(e.target.value)}
          >
            {allDivisionNames.length === 0 ? (
              <option value="">Create a division first</option>
            ) : (
              allDivisionNames.map(d => (
                <option key={d} value={d}>{d}</option>
              ))
            )}
          </select>
          <input
            className="border p-2"
            placeholder="New team name"
            value={newTeamName}
            onChange={e => setNewTeamName(e.target.value)}
          />
          <button onClick={handleCreateTeam} className="bg-green-600 text-white px-3 py-2 rounded" disabled={!allDivisionNames.length}>
            Create Team
          </button>
        </div>

        {/* Create Player */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="border p-2"
            value={newPlayerDivision || selectedDivision}
            onChange={e => { setNewPlayerDivision(e.target.value); setNewPlayerTeam(''); }}
          >
            {allDivisionNames.length === 0 ? (
              <option value="">Create a division first</option>
            ) : (
              allDivisionNames.map(d => (
                <option key={d} value={d}>{d}</option>
              ))
            )}
          </select>

          <select
            className="border p-2"
            value={newPlayerTeam}
            onChange={e => setNewPlayerTeam(e.target.value)}
          >
            <option value="">(no team)</option>
            {teamsForSelectedPlayerDivision.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <input
            className="border p-2"
            placeholder="Player name"
            value={newPlayerName}
            onChange={e => setNewPlayerName(e.target.value)}
          />

          <select
            className="border p-2"
            value={newPlayerPosition}
            onChange={e => setNewPlayerPosition(e.target.value as Player['position'])}
          >
            <option value="OH">OH</option>
            <option value="MB">MB</option>
            <option value="S">S</option>
            <option value="RS">RS</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newPlayerCaptain}
              onChange={e => setNewPlayerCaptain(e.target.checked)}
            />
            Captain
          </label>

          <input
            className="border p-2 w-24"
            type="number"
            placeholder="Awards"
            value={newPlayerAwards}
            onChange={e => setNewPlayerAwards(Number(e.target.value) || 0)}
          />

          <button onClick={handleCreatePlayer} className="bg-blue-600 text-white px-3 py-2 rounded" disabled={!allDivisionNames.length}>
            Create Player
          </button>
        </div>
      </section>

      {/* Team Standings */}
      {!dbDivisions.length ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          No divisions found. Create one above to get started.
        </div>
      ) : (
        <section>
          <h2 className="text-xl font-bold mb-2">Team Standings</h2>
          {Object.entries(data.divisionStats).map(([divisionName, teamsInDiv]) => (
            <div key={divisionName} className="mb-4">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold">{divisionName}</h3>
                <button
                  onClick={() => handleAddTeamInline(divisionName)}
                  className="bg-green-500 text-white px-2 py-1 rounded ml-4"
                >
                  Add Team
                </button>
                <button
                  onClick={() => handleAddPlayerInline(divisionName)}
                  className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                >
                  Add Blank Player
                </button>
              </div>

              {!teamsInDiv.length ? (
                <div className="text-sm text-gray-500 mb-2">No teams in this division yet.</div>
              ) : null}

              {teamsInDiv.map((team, teamIndex) => (
                <div key={team.id} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleTeamChange(divisionName, teamIndex, 'name', e.target.value)}
                    className="border p-1 mr-2"
                  />
                  <input
                    type="number"
                    value={team.wins}
                    onChange={(e) => handleTeamChange(divisionName, teamIndex, 'wins', e.target.value)}
                    className="border p-1 mr-2 w-20"
                  />
                  <input
                    type="number"
                    value={team.losses}
                    onChange={(e) => handleTeamChange(divisionName, teamIndex, 'losses', e.target.value)}
                    className="border p-1 mr-2 w-20"
                  />
                  <button
                    onClick={() => handleRemoveTeam(divisionName, teamIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Player Management */}
      {allDivisionNames.length > 0 && (
        <section className="border rounded p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-bold">Player Management</h2>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Division:</span>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="border p-2 rounded"
              >
                {allDivisionNames.map((division) => (
                  <option key={division} value={division}>{division}</option>
                ))}
              </select>

              <span className="text-sm text-gray-600 ml-2">Team:</span>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">(All teams)</option>
                <option value="__none__">(No team)</option>
                {teamsForSelectedDivision.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>

              <button
                onClick={() => handleAddPlayerInline(selectedDivision)}
                className="bg-blue-500 text-white px-3 py-2 rounded ml-4"
              >
                Add Player to {selectedDivision}
              </button>
            </div>
          </div>

          {!playersForSelectedDivision.length ? (
            <div className="text-sm text-gray-500 mb-2">
              No players in <strong>{selectedDivision}</strong>
              {selectedTeam === '' ? '' : selectedTeam === '__none__' ? ' without a team' : ` on ${selectedTeam}`}
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Captain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MVP Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {playersForSelectedDivision.map((player) => {
                    const draft = nameDrafts[player.id];
                    const effectiveName = draft ?? player.playerName;
                    return (
                      <tr key={player.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={effectiveName}
                            onChange={(e) => onPlayerNameChange(player.id, e.target.value)}
                            onBlur={() => onPlayerNameBlur(player)}
                            className="border p-1 w-full rounded"
                            placeholder="Player name"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={teamsForSelectedDivision.includes(player.team) ? player.team : ''}
                            onChange={(e) => handleAwardChangeById(player.id, 'team', e.target.value)}
                            className="border p-1 w-full rounded"
                          >
                            <option value="">No Team</option>
                            {teamsForSelectedDivision.map((team) => (
                              <option key={team} value={team}>{team}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={player.position}
                            onChange={(e) => handleAwardChangeById(player.id, 'position', e.target.value)}
                            className="border p-1 w-full rounded"
                          >
                            <option value="OH">OH</option>
                            <option value="MB">MB</option>
                            <option value="S">S</option>
                            <option value="RS">RS</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input
                            type="checkbox"
                            checked={player.isCaptain}
                            onChange={(e) => handleAwardChangeById(player.id, 'isCaptain', e.target.checked)}
                            className="border p-1"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={player.awards}
                            onChange={(e) => handleAwardChangeById(player.id, 'awards', e.target.value)}
                            className="border p-1 w-20 rounded"
                            min="0"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleRemovePlayerById(player.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Admin;
