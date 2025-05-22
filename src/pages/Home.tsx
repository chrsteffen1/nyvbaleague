import React from 'react';
import Hero from '../components/Hero';
import SponsorCard from '../components/SponsorCard';
import MediaCard from '../components/MediaCard';
import LiveStream from '../components/LiveStream';
import { Link } from '../components/Link';
import { Trophy, Calendar, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  // Featured sponsors (sample data)
  const featuredSponsors = [
    {
      name: "SportsCo Athletic Gear",
      logo: "https://images.pexels.com/photos/57043/pexels-photo-57043.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Premium volleyball equipment and athletic wear.",
      website: "insert(sponsor website)here",
      level: "gold" as const,
    },
    {
      name: "Hydrate Energy Drinks",
      logo: "https://images.pexels.com/photos/1484135/pexels-photo-1484135.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Refreshing energy drinks for peak performance.",
      website: "insert(sponsor website)here",
      level: "silver" as const,
    },
    {
      name: "Local Sports Bar & Grill",
      logo: "https://images.pexels.com/photos/274349/pexels-photo-274349.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "The best place to unwind after your matches.",
      website: "insert(sponsor website)here",
      level: "bronze" as const,
    },
  ];

  // Featured media (sample data)
  const featuredMedia = [
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/7045557/pexels-photo-7045557.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Men's A Division Finals Highlights",
      date: "June 15, 2025",
      description: "Watch the best plays from our championship match"
    },
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/6551126/pexels-photo-6551126.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Women's A Tournament Action",
      date: "May 28, 2025",
      description: "Photo gallery from our latest tournament"
    }
  ];

  return (
    <div>
      <Hero 
        title="Volleyball League Excellence" 
        backgroundImage="https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* League Divisions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Divisions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer competitive play across three exciting divisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-blue-900 text-white flex items-center justify-center">
                <Trophy size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Men's A Division</h3>
                <p className="text-gray-600 mb-4">
                  Our highest level of men's competition. These players showcase advanced skills, strategy, and athleticism.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Monday Nights</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-blue-700 text-white flex items-center justify-center">
                <Trophy size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Men's B Division</h3>
                <p className="text-gray-600 mb-4">
                  Competitive play with a focus on development. Perfect for intermediate players looking to improve.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Wednesday Nights</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-pink-600 text-white flex items-center justify-center">
                <Trophy size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Women's A Division</h3>
                <p className="text-gray-600 mb-4">
                  High-level women's volleyball featuring skilled players with exceptional teamwork and competition.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Friday Nights</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/about" 
              className="inline-flex items-center text-orange hover:text-orange-600 font-semibold"
            >
              Learn more about our leagues <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Now / Upcoming Streams */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Watch Live</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Catch all the action with our live streams and recorded matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LiveStream 
              title="Men's A Championship Match"
              thumbnail="https://images.pexels.com/photos/6551099/pexels-photo-6551099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
              streamUrl="insert(YouTube live stream URL)here"
              isLive={true}
            />
            <LiveStream 
              title="Women's A Division - Semifinals"
              thumbnail="https://images.pexels.com/photos/6551175/pexels-photo-6551175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
              streamUrl="insert(YouTube stream URL)here"
              isLive={false}
              scheduledDate="June 28, 2025"
              scheduledTime="7:00 PM"
            />
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/social" 
              className="inline-flex items-center text-orange hover:text-orange-300 font-semibold"
            >
              View all live streams and recordings <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Sponsors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Sponsors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These amazing partners help make our league possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSponsors.map((sponsor, index) => (
              <SponsorCard key={index} {...sponsor} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/sponsors" 
              className="inline-flex items-center text-orange hover:text-orange-600 font-semibold"
            >
              View all our sponsors <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Media Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Media Highlights</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out the latest photos and videos from our matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredMedia.map((media, index) => (
              <MediaCard key={index} {...media} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/media" 
              className="inline-flex items-center text-orange hover:text-orange-600 font-semibold"
            >
              Explore our media gallery <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;