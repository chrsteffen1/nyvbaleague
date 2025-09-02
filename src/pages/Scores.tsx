import React, { useState } from 'react';
import Hero from '../components/Hero';
import leagueData from '../data/league-data.json';
import RosterSelector from '../components/RosterSelctor';

interface TeamStats {
  name: string;
  wins: number;
  losses: number;
}

interface AwardData {
  playerName: string;
  team: string;
  division: string;
  awards: number;
  isCaptain: boolean;
  position: string;
}

// Keys of divisions based on the JSON shape
type DivisionKey = keyof typeof leagueData.divisionStats;
type DivisionMap = Record<DivisionKey, TeamStats[]>;

// Normalize raw JSON -> strong typed numbers
const normalizeDivisionStats = (raw: typeof leagueData.divisionStats): DivisionMap => {
  return Object.fromEntries(
    Object.entries(raw).map(([division, teams]) => [
      division,
      (teams as any[]).map((t) => ({
        name: String(t.name),
        wins: Number(t.wins) || 0,
        losses: Number(t.losses) || 0,
      })),
    ])
  ) as DivisionMap;
};

const normalizeAwardData = (raw: typeof leagueData.awardData): AwardData[] => {
  return (raw as any[]).map((p) => ({
    playerName: String(p.playerName),
    team: String(p.team),
    division: String(p.division),
    awards: Number(p.awards) || 0,
    isCaptain: Boolean(p.isCaptain),
    position: String(p.position ?? ''),
  }));
};

const ScoresAndAwards: React.FC = () => {
  // Normalize once; keeps UI logic identical but fixes TS errors
  const initialDivisionStats = React.useMemo(
    () => normalizeDivisionStats(leagueData.divisionStats),
    []
  );
  const initialAwardData = React.useMemo(
    () => normalizeAwardData(leagueData.awardData),
    []
  );

  const [activeTab, setActiveTab] = useState<DivisionKey>('mens-a');
  const [activeAwardTab, setActiveAwardTab] = useState<DivisionKey>('mens-a');
  const [divisionStats, setDivisionStats] = useState<DivisionMap>(initialDivisionStats);
  const [awardData, setAwardData] = useState<AwardData[]>(initialAwardData);

  return (
    <div>
      <Hero
        title="League Scores, Statistics & Player Awards"
        subtitle="Stay updated with the latest results, team statistics and player awards"
        backgroundImage="https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-bold text-navy mb-4 md:mb-0">League Standings</h2>
              <div className="inline-flex bg-white shadow rounded-lg">
                {(Object.keys(divisionStats) as DivisionKey[]).map((division) => (
                  <button
                    key={division}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === division ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                    }`}
                    onClick={() => setActiveTab(division)}
                  >
                    {division.replace('-', ' ').replace(/(^|\s)\S/g, (L) => L.toUpperCase())}
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
                  {[...divisionStats[activeTab]]
                    .sort((a, b) => b.wins - a.wins)
                    .map((team, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.wins}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.losses}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.wins + team.losses}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-bold text-navy mb-4 md:mb-0">Man of the Match Leaders</h2>
                <div className="inline-flex bg-white shadow rounded-lg">
                  {(Object.keys(divisionStats) as DivisionKey[]).map((division) => (
                    <button
                      key={division}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeAwardTab === division ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                      }`}
                      onClick={() => setActiveAwardTab(division)}
                    >
                      {division.replace('-', ' ').replace(/(^|\s)\S/g, (L) => L.toUpperCase())}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awards</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {awardData
                      .filter((player) => player.division === activeAwardTab)
                      .sort((a, b) => b.awards - a.awards)
                      .slice(0, 3)
                      .map((player, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.playerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.team}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.awards}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RosterSelector/>
    </div>
  );
};

export default ScoresAndAwards;
