import React from 'react';
import { Instagram, Youtube } from 'lucide-react';

interface SocialPostProps {
  platform: 'instagram' | 'youtube';
  preview: string;
  link: string;
  title: string;
  date: string;
}

const SocialPost: React.FC<SocialPostProps> = ({ platform, preview, link, title, date }) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="relative aspect-square">
        <img 
          src={preview} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            platform === 'instagram' ? 'bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500' : 'bg-red-600'
          }`}>
            {platform === 'instagram' ? <Instagram size={24} color="white" /> : <Youtube size={24} color="white" />}
          </div>
        </div>
        <div className="absolute top-2 right-2">
          {platform === 'instagram' ? (
            <div className="bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Instagram
            </div>
          ) : (
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              YouTube
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{date}</div>
        <h3 className="text-md font-semibold text-navy line-clamp-2">{title}</h3>
      </div>
    </a>
  );
};

interface SocialFeedProps {
  posts: SocialPostProps[];
}

const SocialFeed: React.FC<SocialFeedProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <SocialPost key={index} {...post} />
      ))}
    </div>
  );
};

export default SocialFeed;