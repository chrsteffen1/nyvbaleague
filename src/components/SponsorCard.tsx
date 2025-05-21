import React from 'react';

interface SponsorProps {
  name: string;
  logo: string;
  description: string;
  website?: string;
  level: 'gold' | 'silver' | 'bronze';
}

const SponsorCard: React.FC<SponsorProps> = ({ name, logo, description, website, level }) => {
  const levelStyles = {
    gold: 'border-yellow-400 shadow-yellow-400/20',
    silver: 'border-gray-300 shadow-gray-300/20',
    bronze: 'border-amber-700 shadow-amber-700/20',
  };

  const levelBadges = {
    gold: 'bg-yellow-400 text-black',
    silver: 'bg-gray-300 text-black',
    bronze: 'bg-amber-700 text-white',
  };

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative border-t-4 ${levelStyles[level]}`}>
      <div className="p-1 absolute right-2 top-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${levelBadges[level]}`}>
          {level.charAt(0).toUpperCase() + level.slice(1)} Sponsor
        </span>
      </div>
      <div className="p-6">
        <div className="w-full h-40 flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {website && (
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-navy text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
};

export default SponsorCard;