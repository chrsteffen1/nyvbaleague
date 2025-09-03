import React from 'react';
import Hero from '../components/Hero';
import SponsorCard from '../components/SponsorCard';

const Sponsors: React.FC = () => {
  const sponsors = [
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
      name: "Sportime",
      logo: "https://cdn.sportimeny.com/assets/Brands6.png",
      description: "SPORTIME Clubs — From Health to High Performance",
      website: "https://www.sportimeny.com/",
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