import React from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';

interface MediaCardProps {
  type: 'image' | 'video';
  src: string;
  title: string;
  date: string;
  description?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ type, src, title, date, description }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative aspect-video">
        {type === 'image' ? (
          <img 
            src={src} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <img 
              src={src} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center">
                <Play size={32} fill="white" stroke="white" />
              </div>
            </div>
          </>
        )}
        <div className="absolute top-2 right-2">
          <div className="bg-navy bg-opacity-80 text-white text-xs px-2 py-1 rounded-full flex items-center">
            {type === 'image' ? <ImageIcon size={12} className="mr-1" /> : <Play size={12} className="mr-1" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{date}</div>
        <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default MediaCard;