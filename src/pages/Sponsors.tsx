import React from 'react';
import Hero from '../components/Hero';
import SponsorCard from '../components/SponsorCard';

const Sponsors: React.FC = () => {
  const sponsors = [
    {
      name: "SportsCo Athletic Gear",
      logo: "https://images.pexels.com/photos/57043/pexels-photo-57043.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Premium volleyball equipment and athletic wear for all levels of play. Official supplier of our league's match balls.",
      website: "https://example.com/sportsco",
    },
    {
      name: "Elite Fitness Center",
      logo: "https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "State-of-the-art fitness facility offering specialized training programs for volleyball players.",
      website: "https://example.com/elitefitness",
    },
    {
      name: "Hydrate Energy Drinks",
      logo: "https://images.pexels.com/photos/1484135/pexels-photo-1484135.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Refreshing energy drinks designed for athletes, providing essential hydration during intensive matches.",
      website: "https://example.com/hydrate",
    },
    {
      name: "Local Sports Bar & Grill",
      logo: "https://images.pexels.com/photos/274349/pexels-photo-274349.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "The best place to unwind after your matches with special discounts for league members.",
      website: "https://example.com/sportsbar",
    },
  ];

  return (
    <div>
      <Hero 
        title="Our Sponsors" 
        subtitle="The amazing partners who make our volleyball league possible"
        backgroundImage="https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Valued Sponsors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These organizations support our volleyball community and help make our league a success.
              We're grateful for their continued partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sponsors;