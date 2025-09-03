import React from 'react';
import { supabase } from '../lib/supabaseClient';

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

// Robust matcher: women, womens, women's, etc.
const isWomenDivision = (name?: string) => !!name && /\bwomen'?s?\b/i.test(name);
const motmLabelFor = (name?: string) => (isWomenDivision(name) ? 'Women of the Match' : 'Man of the Match');

const RosterSelector: React.FC = () => {
  const [divisions, setDivisions] = React.useState<DivisionRow[]>([]);
  const [teams, setTeams] = React.useState<TeamRow[]>([]);
  const [players, setPlayers] = React.useState<PlayerRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [division, setDivision] = React.useState<string>(''); // division name
  const [team, setTeam] = React.useState<string>('');         // team name

  const fetchAll = React.useCallback(async () => {
    const [{ data: d }, { data: t }, { data: p }] = await Promise.all([
      supabase.from('divisions').select('*').order('name'),
      supabase.from('teams').select('*'),
      supabase.from('players').select('*'),
    ]);
    setDivisions(d ?? []);
    setTeams(t ?? []);
    setPlayers(p ?? []);
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
  }, [fetchAll]);

  // keep selection valid
  React.useEffect(() => {
    if (!divisions.length) {
      setDivision('');
      setTeam('');
      return;
    }
    if (!division || !divisions.some(d => d.name === division)) {
      const first = divisions[0].name;
      setDivision(first);
      const firstTeam = teams
        .filter(t => t.division_id === divisions[0].id)
        .sort((a,b)=>a.name.localeCompare(b.name))[0]?.name ?? '';
      setTeam(firstTeam);
    }
  }, [divisions]); // eslint-disable-line

  React.useEffect(() => {
    if (!division) { setTeam(''); return; }
    const divId = divisions.find(d => d.name === division)?.id;
    const firstTeam = divId
      ? teams.filter(t => t.division_id === divId).sort((a,b)=>a.name.localeCompare(b.name))[0]?.name ?? ''
      : '';
    const valid = !!teams.find(t => t.name === team && t.division_id === divId);
    if (!valid) setTeam(firstTeam);
  }, [division, teams, divisions]); // eslint-disable-line

  const divisionTeams = React.useMemo(() => {
    const divId = divisions.find(d => d.name === division)?.id;
    return divId
      ? teams.filter(t => t.division_id === divId).sort((a,b)=>a.name.localeCompare(b.name))
      : [];
  }, [division, teams, divisions]);

  const roster = React.useMemo(() => {
    const divId = divisions.find(d => d.name === division)?.id;
    const teamId = teams.find(t => t.name === team && t.division_id === divId)?.id || null;
    const list = players
      .filter(p => p.division_id === divId && (teamId ? p.team_id === teamId : true))
      .map(p => ({
        id: p.id,
        playerName: p.player_name,
        position: p.position,
        awards: p.awards,
      }))
      // blanks last, then alphabetical
      .sort((a,b) => {
        const aBlank = a.playerName.trim() === '' ? 1 : 0;
        const bBlank = b.playerName.trim() === '' ? 1 : 0;
        if (aBlank !== bBlank) return aBlank - bBlank;
        return a.playerName.localeCompare(b.playerName);
      });
    return list;
  }, [players, division, team, divisions, teams]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">Loading…</div>
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
                {divisions.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                className="w-full border rounded-lg p-2"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                {divisionTeams.map((t) => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {motmLabelFor(division)}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roster.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No players listed for this team yet.
                    </td>
                  </tr>
                ) : (
                  roster.map((p, i) => (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.playerName || <span className="text-gray-400 italic">Unnamed</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.position}</td>
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
