import React, { useState } from 'react';
import leagueData from '../data/league-data.json';

const Admin = () => {
  const [data, setData] = useState(leagueData);
  const [activeDivision, setActiveDivision] = useState(Object.keys(leagueData.divisionStats)[0]);

  const handleTeamChange = (division: string, teamIndex: number, field: string, value: string) => {
    const newData = { ...data };
    (newData.divisionStats as any)[division][teamIndex][field] = value;
    setData(newData);
  };

  const handleAddTeam = (division: string) => {
    const newData = { ...data };
    (newData.divisionStats as any)[division].push({ name: 'New Team', wins: 0, losses: 0 });
    setData(newData);
  };

  const handleRemoveTeam = (division: string, teamIndex: number) => {
    const newData = { ...data };
    const removedTeam = (newData.divisionStats as any)[division][teamIndex];
    (newData.divisionStats as any)[division].splice(teamIndex, 1);

    // Unassign players from the removed team
    newData.awardData.forEach((player) => {
      if (player.team === removedTeam.name) {
        player.team = '';
      }
    });

    setData(newData);
  };

  const handleAwardChange = (awardIndex: number, field: string, value: any) => {
    const newData = { ...data };
    const award = (newData.awardData as any).find((a: any) => a.playerName === (data.awardData as any)[awardIndex].playerName);
    if (award) {
      award[field] = value;
      if (field === 'team') {
        const division = Object.keys(data.divisionStats).find(d => (data.divisionStats as any)[d].some((t: any) => t.name === value));
        if (division) {
          award.division = division;
        }
      }
    }
    setData(newData);
  };

  const handleAddPlayer = (division: string) => {
    const newData = { ...data };
    newData.awardData.push({ playerName: '', team: '', division: division, awards: 0, isCaptain: false, position: 'OH' });
    setData(newData);
  };

  const handleRemovePlayer = (awardIndex: number) => {
    const newData = { ...data };
    newData.awardData.splice(awardIndex, 1);
    setData(newData);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/api/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data.');
    }
  };

  const teams = (data.divisionStats as any)[activeDivision]?.map((t: any) => t.name) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <h2 className="text-xl font-bold mb-2">Team Standings</h2>
      {Object.entries(data.divisionStats).map(([division, teams]) => (
        <div key={division} className="mb-4">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold">{division}</h3>
            <button onClick={() => handleAddTeam(division)} className="bg-green-500 text-white px-2 py-1 rounded ml-4">
              Add Team
            </button>
          </div>
          {(teams as any).map((team: any, teamIndex: number) => (
            <div key={teamIndex} className="flex items-center mb-2">
              <input
                type="text"
                value={team.name}
                onChange={(e) => handleTeamChange(division, teamIndex, 'name', e.target.value)}
                className="border p-1 mr-2"
              />
              <input
                type="number"
                value={team.wins}
                onChange={(e) => handleTeamChange(division, teamIndex, 'wins', e.target.value)}
                className="border p-1 mr-2 w-20"
              />
              <input
                type="number"
                value={team.losses}
                onChange={(e) => handleTeamChange(division, teamIndex, 'losses', e.target.value)}
                className="border p-1 mr-2 w-20"
              />
              <button onClick={() => handleRemoveTeam(division, teamIndex)} className="bg-red-500 text-white px-2 py-1 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>
      ))}

      <h2 className="text-xl font-bold mb-2">Player Roster</h2>
      <div className="mb-4">
        <select
          value={activeDivision}
          onChange={(e) => setActiveDivision(e.target.value)}
          className="border p-1 mr-2"
        >
          {Object.keys(data.divisionStats).map((division) => (
            <option key={division} value={division}>{division}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awards</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Captain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.awardData.filter(award => award.division === activeDivision).map((award, awardIndex) => (
              <tr key={awardIndex}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={award.playerName}
                    onChange={(e) => handleAwardChange(awardIndex, 'playerName', e.target.value)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={teams.includes(award.team) ? award.team : ''}
                    onChange={(e) => handleAwardChange(awardIndex, 'team', e.target.value)}
                    className="border p-1 w-full"
                  >
                    <option value="">Select Team</option>
                    {teams.map((team: string) => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={award.awards}
                    onChange={(e) => handleAwardChange(awardIndex, 'awards', e.target.value)}
                    className="border p-1 w-20"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={award.isCaptain}
                    onChange={(e) => handleAwardChange(awardIndex, 'isCaptain', e.target.checked)}
                    className="border p-1"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={award.position}
                    onChange={(e) => handleAwardChange(awardIndex, 'position', e.target.value)}
                    className="border p-1 w-full"
                  >
                    <option value="OH">OH</option>
                    <option value="MB">MB</option>
                    <option value="S">S</option>
                    <option value="RS">RS</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleRemovePlayer(awardIndex)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => handleAddPlayer(activeDivision)} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Add Player
      </button>

      <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2">
        Save Changes
      </button>
    </div>
  );
};

export default Admin;
