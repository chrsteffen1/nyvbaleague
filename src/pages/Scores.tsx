import React from 'react';
import Hero from '../components/Hero';
import RosterSelector from '../components/RosterSelctor';
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
  position: 'OH' | 'MB' | 'S' | 'RS';
};

interface TeamStats { name: string; wins: number; losses: number; }
interface AwardData {
  playerName: string;
  team: string;
  division: string;
  awards: number;
  isCaptain: boolean;
  position: string;
}
type DivisionMap = Record<string, TeamStats[]>;

const pretty = (s: string) =>
  s.replace('-', ' ').replace(/(^|\s)\S/g, (L) => L.toUpperCase());

// Robust matcher: women, womens, women's, etc.
const isWomenDivision = (name?: string) => !!name && /\bwomen'?s?\b/i.test(name);
const motmLabelFor = (name?: string) => (isWomenDivision(name) ? 'Woman of the Match' : 'Man of the Match');

const Scores: React.FC = () => {
  // raw DB rows
  const [divisions, setDivisions] = React.useState<DivisionRow[]>([]);
  const [teams, setTeams] = React.useState<TeamRow[]>([]);
  const [players, setPlayers] = React.useState<PlayerRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  // UI state
  const [activeTab, setActiveTab] = React.useState<string>('');        // standings tab
  const [activeAwardTab, setActiveAwardTab] = React.useState<string>(''); // leaders tab

  // fetch once
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

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
  }, [fetchAll]);

  // keep active tabs valid
  React.useEffect(() => {
    if (!divisions.length) {
      setActiveTab('');
      setActiveAwardTab('');
      return;
    }
    if (!activeTab || !divisions.some((x) => x.name === activeTab)) {
      setActiveTab(divisions[0].name);
    }
    if (!activeAwardTab || !divisions.some((x) => x.name === activeAwardTab)) {
      setActiveAwardTab(divisions[0].name);
    }
  }, [divisions, activeTab, activeAwardTab]);

  // Optional realtime refresh
  React.useEffect(() => {
    const ch = supabase
      .channel('realtime-scores')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'divisions' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetchAll)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [fetchAll]);

  // Derive shapes
  const divisionStats: DivisionMap = React.useMemo(() => {
    const byIdDiv = Object.fromEntries(divisions.map((d) => [d.id, d]));
    const map: DivisionMap = {};
    divisions.forEach((d) => { map[d.name] = []; });
    teams.forEach((t) => {
      const divName = byIdDiv[t.division_id]?.name;
      if (!divName) return;
      (map[divName] ||= []).push({
        name: t.name,
        wins: Number(t.wins) || 0,
        losses: Number(t.losses) || 0,
      });
    });
    Object.keys(map).forEach((k) => map[k].sort((a, b) => a.name.localeCompare(b.name)));
    return map;
  }, [divisions, teams]);

  const awardData: AwardData[] = React.useMemo(() => {
    const byIdDiv = Object.fromEntries(divisions.map((d) => [d.id, d]));
    const byIdTeam = Object.fromEntries(teams.map((t) => [t.id, t]));
    return players.map((p) => ({
      playerName: p.player_name,
      team: p.team_id ? (byIdTeam[p.team_id]?.name ?? '') : '',
      division: byIdDiv[p.division_id]?.name ?? '',
      awards: Number(p.awards) || 0,
      isCaptain: !!p.is_captain,
      position: p.position,
    }));
  }, [divisions, teams, players]);

  const divisionNames = divisions.map((d) => d.name);

  if (loading) {
    return (
      <div>
        <Hero
          title="League Scores, Statistics & Player Awards"
          subtitle="Stay updated with the latest results, team statistics and player awards"
          backgroundImage="https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">Loading…</div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title="League Scores, Statistics & Player Awards"
        subtitle="Stay updated with the latest results, team statistics and player awards"
        backgroundImage="https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* ---------- Standings ---------- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-bold text-navy mb-4 md:mb-0">League Standings</h2>
              <div className="inline-flex bg-white shadow rounded-lg">
                {divisionNames.map((division) => (
                  <button
                    key={division}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === division ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                    }`}
                    onClick={() => setActiveTab(division)}
                  >
                    {pretty(division)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Played</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...(divisionStats[activeTab] ?? [])]
                    .sort((a, b) => b.wins - a.wins)
                    .map((team, index) => (
                      <tr key={`${team.name}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.wins}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.losses}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.wins + team.losses}</td>
                      </tr>
                    ))}
                  {!divisionStats[activeTab]?.length && (
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-500" colSpan={4}>
                        No teams yet in {pretty(activeTab)}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Awards (dynamic label + top 5) ---------- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-bold text-navy mb-4 md:mb-0">
                  {motmLabelFor(activeAwardTab)} Leaders
                </h2>
                <div className="inline-flex bg-white shadow rounded-lg">
                  {divisionNames.map((division) => (
                    <button
                      key={division}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeAwardTab === division ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                      }`}
                      onClick={() => setActiveAwardTab(division)}
                    >
                      {pretty(division)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {motmLabelFor(activeAwardTab)}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {awardData
                      .filter((player) => player.division === activeAwardTab)
                      .sort((a, b) => b.awards - a.awards || a.playerName.localeCompare(b.playerName))
                      .slice(0, 5)
                      .map((player, index) => (
                        <tr key={`${player.playerName}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.playerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.team}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.awards}</td>
                        </tr>
                      ))}
                    {!awardData.some((p) => p.division === activeAwardTab) && (
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-500" colSpan={4}>
                          No player awards yet in {pretty(activeAwardTab)}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Rosters (separate component) */}
      <RosterSelector />
    </div>
  );
};

export default Scores;
