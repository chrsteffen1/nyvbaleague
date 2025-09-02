import React from 'react';
import leagueData from '../data/league-data.json';

type DivisionKey = keyof typeof leagueData.divisionStats;

type Team = { name: string; wins: number; losses: number };
type Award = {
  playerName: string;
  team: string;
  division: string;
  awards: number;
  isCaptain: boolean;
  position: string;
};

// --- Normalize JSON once so TS arithmetic & filters are safe ---
const normalizeDivisionStats = (raw: typeof leagueData.divisionStats) => {
  return Object.fromEntries(
    Object.entries(raw).map(([division, teams]) => [
      division,
      (teams as any[]).map((t) => ({
        name: String(t.name),
        wins: Number(t.wins) || 0,
        losses: Number(t.losses) || 0,
      })) as Team[],
    ])
  ) as Record<DivisionKey, Team[]>;
};

const normalizeAwardData = (raw: typeof leagueData.awardData) => {
  return (raw as any[]).map((p) => ({
    playerName: String(p.playerName),
    team: String(p.team),
    division: String(p.division),
    awards: Number(p.awards) || 0,
    isCaptain: Boolean(p.isCaptain),
    position: String(p.position ?? 'OH'),
  })) as Award[];
};

const divisionStats = normalizeDivisionStats(leagueData.divisionStats);
const awardData = normalizeAwardData(leagueData.awardData);

const divisionKeys = Object.keys(divisionStats) as DivisionKey[];

const RosterSelector: React.FC = () => {
  // Initial selection: first division, then first team in that division (if any)
  const [division, setDivision] = React.useState<DivisionKey>(divisionKeys[0]);
  const teamsInDivision = divisionStats[division] ?? [];
  const [team, setTeam] = React.useState<string>(teamsInDivision[0]?.name ?? '');

  // When division changes, reset team to that division's first team (if available)
  React.useEffect(() => {
    const nextTeams = divisionStats[division] ?? [];
    setTeam(nextTeams[0]?.name ?? '');
  }, [division]);

  const roster = awardData
    .filter((p) => p.division === division && p.team === team)
    // Optional: captains first, then alphabetical
    .sort((a, b) => Number(b.isCaptain) - Number(a.isCaptain) || a.playerName.localeCompare(b.playerName));

  const currentTeamMeta = (divisionStats[division] ?? []).find((t) => t.name === team);
  const played = currentTeamMeta ? currentTeamMeta.wins + currentTeamMeta.losses : 0;

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
                onChange={(e) => setDivision(e.target.value as DivisionKey)}
              >
                {divisionKeys.map((d) => (
                  <option key={d} value={d}>
                    {d.replace('-', ' ').replace(/(^|\s)\S/g, (L) => L.toUpperCase())}
                  </option>
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
                {(divisionStats[division] ?? []).map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Team meta (optional) */}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.playerName}
                      </td>
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
