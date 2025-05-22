import React from 'react';
import Hero from '../components/Hero';
import SponsorCard from '../components/SponsorCard';
import { Mail, Phone } from 'lucide-react';

const Sponsors: React.FC = () => {
  // Sample sponsor data
  const goldSponsors = [
    {
      name: "SportsCo Athletic Gear",
      logo: "https://images.pexels.com/photos/57043/pexels-photo-57043.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Premium volleyball equipment and athletic wear for all levels of play. Official supplier of our league's match balls.",
      website: "insert(sponsor website)here",
      level: "gold" as const,
    },
    {
      name: "Elite Fitness Center",
      logo: "https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "State-of-the-art fitness facility offering specialized training programs for volleyball players.",
      website: "insert(sponsor website)here",
      level: "gold" as const,
    },
  ];

  const silverSponsors = [
    {
      name: "Hydrate Energy Drinks",
      logo: "https://images.pexels.com/photos/1484135/pexels-photo-1484135.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Refreshing energy drinks designed for athletes, providing essential hydration during intensive matches.",
      website: "insert(sponsor website)here",
      level: "silver" as const,
    },
    {
      name: "Physical Therapy Plus",
      logo: "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Specialized sports medicine and physical therapy services for volleyball-related injuries and prevention.",
      website: "insert(sponsor website)here",
      level: "silver" as const,
    },
    {
      name: "Digital Scoreboard Solutions",
      logo: "https://images.pexels.com/photos/7925804/pexels-photo-7925804.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Providing digital scoreboard technology for our league, enhancing the game experience for players and spectators.",
      website: "insert(sponsor website)here",
      level: "silver" as const,
    },
  ];

  const bronzeSponsors = [
    {
      name: "Local Sports Bar & Grill",
      logo: "https://images.pexels.com/photos/274349/pexels-photo-274349.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "The best place to unwind after your matches with special discounts for league members.",
      website: "insert(sponsor website)here",
      level: "bronze" as const,
    },
    {
      name: "Community Print Shop",
      logo: "https://images.pexels.com/photos/7414277/pexels-photo-7414277.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Providing high-quality printing services for all our league's marketing materials and team jerseys.",
      website: "insert(sponsor website)here",
      level: "bronze" as const,
    },
    {
      name: "Recovery Massage Therapy",
      logo: "https://images.pexels.com/photos/6663353/pexels-photo-6663353.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Specialized sports massage therapy to help players recover faster between matches.",
      website: "insert(sponsor website)here",
      level: "bronze" as const,
    },
    {
      name: "Sunrise Coffee Co.",
      logo: "https://images.pexels.com/photos/302898/pexels-photo-302898.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Fueling our morning matches with premium coffee and healthy breakfast options.",
      website: "insert(sponsor website)here",
      level: "bronze" as const,
    },
  ];

  return (
    <div>
      <Hero 
        title="Our Sponsors" 
        subtitle="The amazing partners who make our volleyball league possible"
        backgroundImage="https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Sponsorship Levels Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Valued Sponsors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These organizations support our volleyball community and help make our league a success.
              We're grateful for their continued partnership.
            </p>
          </div>

          {/* Gold Sponsors */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 w-12 bg-gray-200 rounded mr-4"></div>
              <h3 className="text-2xl font-bold text-yellow-500">Gold Sponsors</h3>
              <div className="h-1 w-12 bg-gray-200 rounded ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goldSponsors.map((sponsor, index) => (
                <SponsorCard key={index} {...sponsor} />
              ))}
            </div>
          </div>

          {/* Silver Sponsors */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 w-12 bg-gray-200 rounded mr-4"></div>
              <h3 className="text-2xl font-bold text-gray-400">Silver Sponsors</h3>
              <div className="h-1 w-12 bg-gray-200 rounded ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {silverSponsors.map((sponsor, index) => (
                <SponsorCard key={index} {...sponsor} />
              ))}
            </div>
          </div>

          {/* Bronze Sponsors */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 w-12 bg-gray-200 rounded mr-4"></div>
              <h3 className="text-2xl font-bold text-amber-700">Bronze Sponsors</h3>
              <div className="h-1 w-12 bg-gray-200 rounded ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {bronzeSponsors.map((sponsor, index) => (
                <SponsorCard key={index} {...sponsor} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Become a Sponsor */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Become a Sponsor</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Partner with our growing volleyball league and connect with our passionate community
              </p>
            </div>

            <div className="bg-white text-navy rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Sponsorship Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Logo placement on our website and social media</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Banner display during matches and tournaments</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Announcements during live streams and events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Direct marketing to our player and fan base</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange rounded-full p-1 mr-3 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Special event participation opportunities</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-8">
                  <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                  <p className="text-gray-600 mb-6">
                    Interested in becoming a sponsor? Contact our sponsorship coordinator to discuss partnership opportunities that align with your organization's goals.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="text-orange mr-3" size={20} />
                      <a href="mailto:insert(sponsorship email)here" className="text-navy hover:text-orange transition-colors">
                        insert(sponsorship email)here
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-orange mr-3" size={20} />
                      <a href="tel:insert(sponsorship phone)here" className="text-navy hover:text-orange transition-colors">
                        insert(sponsorship phone)here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;