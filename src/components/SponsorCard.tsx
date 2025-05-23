import React from 'react';

interface SponsorProps {
  name: string;
  logo: string;
  description: string;
  website?: string;
}

const SponsorCard: React.FC<SponsorProps> = ({ name, logo, description, website }) => {
  return (
    <div className="bg-orange rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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