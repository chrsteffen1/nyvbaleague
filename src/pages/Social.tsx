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
      platform: "youtube" as const,
      preview: "https://img.youtube.com/vi/uj1YEk9kSxs/maxresdefault.jpg",
      link: "https://www.youtube.com/shorts/uj1YEk9kSxs",
      title: "Season 6 Champion!",
    },
    {
      platform: "youtube" as const,
      preview: "https://img.youtube.com/vi/Jg9ygYzDdhM/maxresdefault.jpg",
      link: "https://www.youtube.com/shorts/Jg9ygYzDdhM",
      title: "Season 16 Mens Final",
    },
    {
      platform: "youtube" as const,
      preview: "https://img.youtube.com/vi/PLzL-u2D690/maxresdefault.jpg",
      link: "https://www.youtube.com/shorts/PLzL-u2D690",
      title: "Season 2 Womens Final",
    },
    {
      platform: "youtube" as const,
      preview: "https://img.youtube.com/vi/lkK8YkFiPUo/maxresdefault.jpg",
      link: "https://www.youtube.com/shorts/lkK8YkFiPUo",
      title: "Season 6 Final Tonight",
    },
    
  ];

  return (
    <div>
      <Hero 
        title="Social & Live Streams" 
        subtitle="Whether you're a player, a fan, or just love volleyball, subscribe and never miss a serve, spike, or rally!"
        backgroundImage="https://images.pexels.com/photos/15741340/pexels-photo-15741340/free-photo-of-volleyball-players-hugging-each-other.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
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
                href="https://www.instagram.com/nyvbaleague/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white px-5 py-2 rounded-full hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all"
              >
                <Instagram size={20} className="mr-2" />
                Follow on Instagram
              </a>
              <a 
                href="https://www.youtube.com/@nyvbaleague/shorts" 
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

      {/* Live Streams */}
      <section className="py-16 bg-orange text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Watch Live</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Catch all the action with our live streams of matches and events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 inline-flex items-center text-orange hover:text-orange-300 font-semibold justify-items-center">
            <div style={{ width: '80%' }}>
              <LiveStream 
                title="Men's A Championship Match"
                thumbnail="https://img.youtube.com/vi/lkK8YkFiPUo/maxresdefault.jpg"
                streamUrl="https://www.youtube.com/@nyvbaleague/shorts"
                isLive={true}
              />
            </div>            
          </div>

          <div className="text-center mt-10">
            <a 
              href="insert(YouTube channel URL)here"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center text-white hover:text-orange-300 font-semibold"
            >
              View all of our past streams on YouTube <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Social;