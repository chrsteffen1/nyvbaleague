import React from 'react';
import Hero from '../components/Hero';

interface AwardData {
  playerName: string;
  team: string;
  division: string;
  awards: number;
}

const Awards: React.FC = () => {
  // Sample award data - replace with actual data from your database
  const awardData: AwardData[] = [
    { playerName: "John Smith", team: "Spikers", division: "Men's A", awards: 5 },
    { playerName: "Sarah Johnson", team: "Phoenix", division: "Women's A", awards: 4 },
    { playerName: "Mike Brown", team: "Thunder", division: "Men's A", awards: 3 },
    { playerName: "Emily Davis", team: "Storm", division: "Women's A", awards: 3 },
    { playerName: "Chris Wilson", team: "Setters", division: "Men's B", awards: 3 },
    { playerName: "Lisa Anderson", team: "Fire", division: "Women's A", awards: 2 },
  ];

  return (
    <div>
      <Hero 
        title="Player Awards" 
        subtitle="Tracking Player of the Match Awards Throughout the Season"
        backgroundImage="https://images.pexels.com/photos/6550839/pexels-photo-6550839.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8">Player of the Match Leaders</h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Player Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Division
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Awards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {awardData
                      .sort((a, b) => b.awards - a.awards)
                      .map((player, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.playerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.team}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.division}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.awards}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;