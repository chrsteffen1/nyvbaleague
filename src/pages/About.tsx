import React from 'react';
import Hero from '../components/Hero';
import { Check, Calendar, MapPin, Trophy, Award } from 'lucide-react';

const About: React.FC = () => {
  const teams = [
    { name: "Spikers", division: "Men's A" },
    { name: "Blockers", division: "Men's A" },
    { name: "Phoenix", division: "Men's A" },
    { name: "Thunder", division: "Men's A" },
    { name: "Setters", division: "Men's B" },
    { name: "Diggers", division: "Men's B" },
    { name: "Smashers", division: "Men's B" },
    { name: "Lightning", division: "Men's B" },
    { name: "Aces", division: "Women's A" },
    { name: "Fire", division: "Women's A" },
    { name: "Storm", division: "Women's A" },
    { name: "Strikers", division: "Women's A" },
  ];

  return (
    <div>
      <Hero 
        title="About Our League" 
        subtitle="Building a community of volleyball enthusiasts since 2020"
        backgroundImage="https://images.pexels.com/photos/6551104/pexels-photo-6551104.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* League History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Our volleyball league started in 2020 with just a handful of teams playing in a local gym. 
                What began as a casual meetup among friends quickly grew into something much bigger.
              </p>
              <p className="text-gray-700 mb-4">
                As word spread about our competitive yet friendly atmosphere, more players and teams 
                wanted to join. By 2022, we had expanded to multiple divisions to accommodate 
                different skill levels and to create more opportunities for everyone to play.
              </p>
              <p className="text-gray-700 mb-4">
                Today, we're proud to offer three divisions playing three nights a week. Our community 
                continues to grow as we work to provide the best recreational volleyball experience 
                possible.
              </p>
              <p className="text-gray-700">
                We're passionate about growing the sport of volleyball in our community and creating 
                a space where players can improve their skills, compete at their level, and make 
                lasting friendships.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <img 
                  src="https://images.pexels.com/photos/6551175/pexels-photo-6551175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
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
              We offer three competitive divisions to match your skill level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-navy">Men's A Division</h3>
                <Trophy className="text-blue-900" size={24} />
              </div>
              <p className="text-gray-700 mb-4">
                Our highest level of men's competition featuring advanced skills and strategy.
              </p>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2 text-orange" />
                  <span className="text-gray-700 font-medium">Monday Nights</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2 text-orange" />
                  <span className="text-gray-700">insert(location)here</span>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Match officials for all games</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Season playoffs and championships</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Live streaming of select matches</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-navy">Men's B Division</h3>
                <Trophy className="text-blue-700" size={24} />
              </div>
              <p className="text-gray-700 mb-4">
                Competitive play with a focus on skill development and improvement.
              </p>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2 text-orange" />
                  <span className="text-gray-700 font-medium">Wednesday Nights</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2 text-orange" />
                  <span className="text-gray-700">insert(location)here</span>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Rotating officiating responsibilities</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Season playoffs and championships</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Skill development opportunities</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-navy">Women's A Division</h3>
                <Trophy className="text-pink-600" size={24} />
              </div>
              <p className="text-gray-700 mb-4">
                High-level women's volleyball featuring skilled players and competitive matches.
              </p>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2 text-orange" />
                  <span className="text-gray-700 font-medium">Friday Nights</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2 text-orange" />
                  <span className="text-gray-700">insert(location)here</span>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Match officials for all games</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Season playoffs and championships</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Live streaming of select matches</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Teams</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the competitive teams that make up our volleyball community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teams.map((team, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-bold text-navy mb-1">{team.name}</h3>
                <p className="text-sm text-gray-600">{team.division}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* League Values */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              What drives our league and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-orange mb-4">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sportsmanship</h3>
              <p className="opacity-90">
                We believe in fair play, respect for officials and opponents, and maintaining a positive atmosphere regardless of the score.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-orange mb-4">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="opacity-90">
                Our league is more than just volleyball—it's about building lasting relationships and supporting each other both on and off the court.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-orange mb-4">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Growth</h3>
              <p className="opacity-90">
                We're committed to helping players develop their skills, teams improve their tactics, and our league expand to welcome more volleyball enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;