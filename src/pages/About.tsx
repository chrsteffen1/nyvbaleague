import React, { useState } from 'react';
import Hero from '../components/Hero';
import { Check, Calendar, MapPin, Trophy, Award } from 'lucide-react';

const About: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const divisions = {
    'mens-a': {
      name: "Men's A Division",
      schedule: [
        { time: "7:00 PM", teams: "Spikers vs Blockers" },
        { time: "8:00 PM", teams: "Phoenix vs Thunder" },
      ],
      teams: ["Spikers", "Blockers", "Phoenix", "Thunder"]
    },
    'mens-b': {
      name: "Men's B Division",
      schedule: [
        { time: "7:00 PM", teams: "Setters vs Diggers" },
        { time: "8:00 PM", teams: "Smashers vs Lightning" },
      ],
      teams: ["Setters", "Diggers", "Smashers", "Lightning"]
    },
    'womens-a': {
      name: "Women's Division",
      schedule: [
        { time: "7:00 PM", teams: "Aces vs Fire" },
        { time: "8:00 PM", teams: "Storm vs Strikers" },
      ],
      teams: ["Aces", "Fire", "Storm", "Strikers"]
    }
  };

  return (
    <div>
      <Hero 
        title="About Our League" 
        subtitle="We're your live home for high-level amateur volleyball in Long Island, NY!"
        backgroundImage="https://images.pexels.com/photos/1277213/pexels-photo-1277213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* League History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
              9 Years of NYVBA - this league had a unique start and , like any other project, it has developed through its struggles, growth, exposure & recoginition. 
              </p>
              <p className="text-gray-700 mb-4">
              This league started with a lot of incomplete ideas but after 9 years we can proudly say, through immense hardwork by Sunny, Steve, Amar & ENTIRE NYVBA Team, we have reached new heights
              </p>
              <p className="text-gray-700 mb-4">
              This is all due to the trust & support given to us by all the Players & Sponsors. We just want to say Thank You! 
              </p>
              <p className="text-gray-700">
              Keep believing in us & we will continue to do good work that will make everyone associated with the league proud!
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <img 
                  src="https://images.pexels.com/photos/6203510/pexels-photo-6203510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=10" 
                  alt="Volleyball match in our league" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions & Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Divisions & Schedule</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(divisions).map(([key, division]) => (
              <div 
                key={key}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedDivision(selectedDivision === key ? null : key)}
              >
                <div className={`h-48 ${
                  key === 'mens-a' ? 'bg-blue-900' : 
                  key === 'mens-b' ? 'bg-blue-700' : 
                  'bg-pink-600'
                } text-white flex items-center justify-center`}>
                  <Trophy size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{division.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{key === 'mens-a' ? 'Wednesday' : key === 'mens-b' ? 'Tuesday' : 'Wednesday'} Nights</span>
                  </div>
                  
                  {selectedDivision === key && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Weekly Schedule:</h4>
                      {division.schedule.map((slot, index) => (
                        <div key={index} className="mb-2 text-gray-600">
                          <span className="font-medium">{slot.time}</span> - {slot.teams}
                        </div>
                      ))}
                      <h4 className="font-semibold mt-4 mb-2">Teams:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {division.teams.map((team, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-center text-sm">
                            {team}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;