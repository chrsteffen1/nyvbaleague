import React, { useState } from 'react';
import Hero from '../components/Hero';

interface TeamStats {
  name: string;
  wins: number;
  losses: number;
  played: number;
}

const Scores: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mens-a' | 'mens-b' | 'womens-a'>('mens-a');

  const divisionStats = {
    'mens-a': [
      { name: "Spikers", wins: 8, losses: 2, played: 10 },
      { name: "Blockers", wins: 7, losses: 3, played: 10 },
      { name: "Phoenix", wins: 5, losses: 5, played: 10 },
      { name: "Thunder", wins: 4, losses: 6, played: 10 },
    ],
    'mens-b': [
      { name: "Setters", wins: 7, losses: 3, played: 10 },
      { name: "Diggers", wins: 6, losses: 4, played: 10 },
      { name: "Smashers", wins: 4, losses: 6, played: 10 },
      { name: "Lightning", wins: 3, losses: 7, played: 10 },
    ],
    'womens-a': [
      { name: "Aces", wins: 9, losses: 1, played: 10 },
      { name: "Fire", wins: 6, losses: 4, played: 10 },
      { name: "Storm", wins: 5, losses: 5, played: 10 },
      { name: "Strikers", wins: 4, losses: 6, played: 10 },
    ],
  };

  return (
    <div>
      <Hero
        title="League Scores & Statistics"
        subtitle="Stay updated with the latest results and team statistics"
        backgroundImage="https://images.pexels.com/photos/1202587/pexels-photo-1202587.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-bold text-navy mb-4 md:mb-0">League Standings</h2>
              <div className="inline-flex bg-white shadow rounded-lg">
                <button 
                  className={`px-4 py-2 rounded-l-lg text-sm font-medium ${
                    activeTab === 'mens-a' ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                  }`}
                  onClick={() => setActiveTab('mens-a')}
                >
                  Men's A
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'mens-b' ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                  }`}
                  onClick={() => setActiveTab('mens-b')}
                >
                  Men's B
                </button>
                <button 
                  className={`px-4 py-2 rounded-r-lg text-sm font-medium ${
                    activeTab === 'womens-a' ? 'bg-orange text-white' : 'text-gray-700 hover:text-orange'
                  }`}
                  onClick={() => setActiveTab('womens-a')}
                >
                  Women's A
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Losses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Played
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {divisionStats[activeTab]
                    .sort((a, b) => b.wins - a.wins)
                    .map((team, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {team.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {team.wins}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {team.losses}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {team.played}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Scores;