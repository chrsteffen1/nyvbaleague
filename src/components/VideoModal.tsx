import React, { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';

interface SocialPostProps {
  platform: 'instagram' | 'youtube';
  preview: string;
  link: string;
  title: string;
}

const SocialPost: React.FC<SocialPostProps> = ({ platform, preview, link, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleCloseModal = () => {
    setIsPlaying(false);
  };

  // Determine the embedded URL based on platform
  const embeddedUrl = platform === 'youtube'
    ? link.replace("watch?v=", "embed/") // Basic YouTube embed conversion
    : link; // Instagram embedding might require a different approach or library

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
      {isPlaying ? (
        <div className="relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 z-10"
          >
            X
          </button>
          {platform === 'youtube' ? (
            <iframe
              width="100%"
              height="315"
              src={embeddedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            // Placeholder for Instagram embedding - might need a library or different approach
            <div className="w-full h-64 flex items-center justify-center bg-gray-700">
              <p>Instagram embedding requires a different method.</p>
            </div>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-2 text-blue-400 hover:underline"
          >
            Watch on {platform === 'instagram' ? 'Instagram' : 'YouTube'}
          </a>
        </div>
      ) : (
        <div className="relative cursor-pointer" onClick={handlePlayClick}>
          <img className="w-full" src={preview} alt={title} />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300">
            {platform === 'instagram' ? (
              <Instagram size={48} className="text-white" />
            ) : (
              <Youtube size={48} className="text-white" />
            )}
          </div>
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};

export default SocialPost;