import React from 'react';
import Hero from '../components/Hero';
import LiveStream from '../components/LiveStream';
import SocialFeed from '../components/SocialFeed';
import { Instagram, Youtube, ArrowRight } from 'lucide-react';

const Social: React.FC = () => {
  // Sample live stream data
  const liveStreams = [
    {
      title: "Men's A Division Championship",
      thumbnail: "https://images.pexels.com/photos/6551099/pexels-photo-6551099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      streamUrl: "insert(YouTube live stream URL)here",
      isLive: true,
    },
    {
      title: "Women's A Division - Semifinals",
      thumbnail: "https://images.pexels.com/photos/6551175/pexels-photo-6551175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      streamUrl: "insert(YouTube stream URL)here",
      isLive: false,
      scheduledDate: "June 28, 2025",
      scheduledTime: "7:00 PM",
    },
    {
      title: "Men's B Division - Playoffs Round 1",
      thumbnail: "https://images.pexels.com/photos/6551104/pexels-photo-6551104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      streamUrl: "insert(YouTube stream URL)here",
      isLive: false,
      scheduledDate: "June 30, 2025",
      scheduledTime: "6:30 PM",
    },
  ];

  // Sample social posts data
  const socialPosts = [
    {
      platform: "instagram" as const,
      preview: "https://images.pexels.com/photos/6551095/pexels-photo-6551095.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(Instagram post URL)here",
      title: "Congratulations to our Men's A Division Champions!",
      date: "June 16, 2025",
    },
    {
      platform: "youtube" as const,
      preview: "https://images.pexels.com/photos/6551164/pexels-photo-6551164.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(YouTube video URL)here",
      title: "Top 10 Plays of the Week - Week 8",
      date: "June 14, 2025",
    },
    {
      platform: "instagram" as const,
      preview: "https://images.pexels.com/photos/6551126/pexels-photo-6551126.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(Instagram post URL)here",
      title: "Women's A Division action from last night's matches",
      date: "June 12, 2025",
    },
    {
      platform: "youtube" as const,
      preview: "https://images.pexels.com/photos/6551084/pexels-photo-6551084.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(YouTube video URL)here",
      title: "Player Interview: Meet the MVP of Men's B Division",
      date: "June 10, 2025",
    },
    {
      platform: "instagram" as const,
      preview: "https://images.pexels.com/photos/6551094/pexels-photo-6551094.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(Instagram post URL)here",
      title: "Thanks to all our sponsors who make our league possible!",
      date: "June 8, 2025",
    },
    {
      platform: "youtube" as const,
      preview: "https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(YouTube video URL)here",
      title: "Defensive Masterclass: Watch and Learn",
      date: "June 6, 2025",
    },
    {
      platform: "instagram" as const,
      preview: "https://images.pexels.com/photos/6551087/pexels-photo-6551087.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(Instagram post URL)here",
      title: "Registration now open for our summer tournament!",
      date: "June 4, 2025",
    },
    {
      platform: "youtube" as const,
      preview: "https://images.pexels.com/photos/6551175/pexels-photo-6551175.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "insert(YouTube video URL)here",
      title: "Full Match: Women's A Division Finals",
      date: "June 2, 2025",
    },
  ];

  return (
    <div>
      <Hero 
        title="Social & Live Streams" 
        subtitle="Connect with our volleyball community and watch matches live"
        backgroundImage="https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Live Streams */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Watch Live</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Catch all the action with our live streams of matches and events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {liveStreams.map((stream, index) => (
              <LiveStream key={index} {...stream} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a 
              href="insert(YouTube channel URL)here"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center text-orange hover:text-orange-300 font-semibold"
            >
              View all of our past streams on YouTube <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Social Feeds */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Follow Our Social Media</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected with the latest updates, highlights, and announcements
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <a 
                href="insert(Instagram URL)here" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white px-5 py-2 rounded-full hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all"
              >
                <Instagram size={20} className="mr-2" />
                Follow on Instagram
              </a>
              <a 
                href="insert(YouTube URL)here" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <Youtube size={20} className="mr-2" />
                Subscribe on YouTube
              </a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-navy mb-6">Recent Social Posts</h3>
            <SocialFeed posts={socialPosts} />
          </div>
        </div>
      </section>

      {/* Stats & Tracking App */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-4">Game Stats & Scores</h2>
            <p className="text-lg text-gray-600 mb-8">
              Track match results, player statistics, and "Play of the Game" voting through our dedicated tracking app.
            </p>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-6">
                <img 
                  src="https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Stats tracking app" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-navy mb-2">VolleyStats Tracker</h3>
                <p className="text-gray-600 mb-4">
                  Our official league statistics and scoring platform lets you:
                </p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>View real-time match scores and results</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Track individual and team statistics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Vote for "Play of the Game" after matches</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Check league standings and upcoming matches</span>
                  </li>
                </ul>
              </div>
              <a 
                href="insert(tracking app URL)here" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Open Stats Tracker
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Social;