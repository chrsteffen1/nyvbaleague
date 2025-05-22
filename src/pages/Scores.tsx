import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust path if necessary
import Footer from '../components/Footer'; // Adjust path if necessary

const Scores: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mens-a' | 'mens-b' | 'womens-a'>('mens-a');

  const teamData = {
    'mens-a': [
      { teamName: "Aces", score: 10 },
      { teamName: "Bombers", score: 8 },
      { teamName: "Crushers", score: 7 },
      { teamName: "Dragons", score: 6 },
      { teamName: "Eagles", score: 5 },
      { teamName: "Falcons", score: 4 },
    ],
    'mens-b': [
      { teamName: "Generals", score: 9 },
      { teamName: "Hawks", score: 7 },
      { teamName: "Invaders", score: 6 },
      { teamName: "Jaguars", score: 5 },
      { teamName: "Knights", score: 4 },
      { teamName: "Lions", score: 3 },
    ],
    'womens-a': [
      { teamName: "Panthers", score: 11 },
      { teamName: "Queens", score: 9 },
      { teamName: "Rockets", score: 8 },
      { teamName: "Stars", score: 7 },
      { teamName: "Tigers", score: 6 },
      { teamName: "Vipers", score: 5 },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Placeholder */}
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">League Scores</h1>

        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'mens-a' ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                id="mens-a-tab"
                data-tabs-target="#mens-a"
                type="button"
                role="tab"
                aria-controls="mens-a"
                aria-selected={activeTab === 'mens-a'}
                onClick={() => setActiveTab('mens-a')}
              >
                Men's A
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'mens-b' ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                id="mens-b-tab"
                data-tabs-target="#mens-b"
                type="button"
                role="tab"
                aria-controls="mens-b"
                aria-selected={activeTab === 'mens-b'}
                onClick={() => setActiveTab('mens-b')}
              >
                Men's B
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'womens-a' ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                id="womens-a-tab"
                data-tabs-target="#womens-a"
                type="button"
                role="tab"
                aria-controls="womens-a"
                aria-selected={activeTab === 'womens-a'}
                onClick={() => setActiveTab('womens-a')}
              >
                Women's A
              </button>
            </li>
          </ul>
        </div>

<div id="default-tab-content">
  {(['mens-a', 'mens-b', 'womens-a'] as const).map((division) => (
    <div
      key={division}
      className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === division ? '' : 'hidden'}`}
      id={division}
      role="tabpanel"
      aria-labelledby={`${division}-tab`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 border-b border-gray-300 dark:border-gray-600">
                Team Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 border-b border-gray-300 dark:border-gray-600">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {teamData[division].map((team, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {team.teamName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {team.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Placeholder */}
      <Footer />
    </div>
  );
};

export default Scores;