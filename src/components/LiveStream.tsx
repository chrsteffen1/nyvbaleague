import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';

interface LiveStreamProps {
  title: string;
  thumbnail: string;
  streamUrl: string;
  isLive: boolean;
  scheduledTime?: string;
  scheduledDate?: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ 
  title, 
  thumbnail, 
  streamUrl, 
  isLive,
  scheduledTime,
  scheduledDate
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg group">
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <a 
            href={streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 bg-orange rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
          >
            <Play size={32} fill="white" stroke="white" />
          </a>
        </div>
        {isLive && (
          <div className="absolute top-2 left-2">
            <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              LIVE NOW
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
        
        {!isLive && scheduledDate && scheduledTime && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <div className="flex items-center mr-4">
              <Calendar size={14} className="mr-1 text-orange" />
              <span>{scheduledDate}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-orange" />
              <span>{scheduledTime}</span>
            </div>
          </div>
        )}
        
        <a 
          href={streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-4 py-2 rounded text-white ${
            isLive 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-navy hover:bg-blue-900'
          } transition-colors`}
        >
          {isLive ? 'Watch Now' : 'Set Reminder'}
        </a>
      </div>
    </div>
  );
};

export default LiveStream;