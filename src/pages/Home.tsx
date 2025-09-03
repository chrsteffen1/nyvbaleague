import React from 'react';
import Hero from '../components/Hero';
import SponsorCard from '../components/SponsorCard';
import LiveStream from '../components/LiveStream';
import { Link } from '../components/Link';
import { Trophy, Calendar, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  // Featured sponsors (sample data)
  const featuredSponsors = [
    {
      name: "Team Logic IT",
      logo: "https://www.teamlogicit.ca/TeamlogicIT/media/TLIT-Images/Global/TL20_email_Xlarge_loop.gif",
      description: "Delivering a High Level of Availability and Security Anytime, Anywher.",
      website: "https://www.teamlogicit.ca/jerichony214/About-Us",
    },
    {
      name: "Forge Fitness",
      logo: "https://cdn.solo.to/user/a/68174345ea4da8_07618806.jpg",
      description: "We simply help you get to your goals and make them last.",
      website: "https://www.forgefitnessny.com",
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
      src: "https://img.youtube.com/vi/Jg9ygYzDdhM/maxresdefault.jpg",
      title: "Men's A Division Finals Highlights",
      date: "June 15, 2025",
      description: "Watch the best plays from our championship match"
    },
    {
      type: "image" as const,
      src: "https://img.youtube.com/vi/PLzL-u2D690/maxresdefault.jpg",
      title: "Women's A Tournament Action",
      date: "May 28, 2025",
      description: "Photo gallery from our latest tournament"
    }
  ];

  return (
    <div>
      <Hero 
        title="Volleyball League Excellence" 
        backgroundImage="https://images.pexels.com/photos/1552620/pexels-photo-1552620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* League Divisions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Divisions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            🏐 NYVBA (New York Volleyball Association) hosts three competitive indoor leagues:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-blue-900 text-white flex items-center justify-center">
                <Trophy size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Men's A League</h3>
                <p className="text-gray-600 mb-4">
                Premier level play, now in its 17th season.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Wednesday Nights</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-blue-700 text-white flex items-center justify-center">
                <Trophy size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Men's B League</h3>
                <p className="text-gray-600 mb-4">
                Competitive yet accessible, running strong for 7 season.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Tuesday Nights</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-pink-600 text-white flex items-center justify-center">
                <Trophy size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Women's League</h3>
                <p className="text-gray-600 mb-4">
                A fast-growing league currently in its 3rd season.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Wednesday Nights</span>
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
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Watch Live</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
             Catch all the live action, including weekly matches, tournaments, and championship games — streamed straight from the court
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
            <Link 
              href="/social" 
              className="inline-flex items-center text-white hover:text-orange-300 font-semibold"
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
            <h2 className="text-3xl font-bold text-black mb-4">Our Sponsors</h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
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
              className="text-black inline-flex items-center font-semibold"
            >
              View all our sponsors <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;