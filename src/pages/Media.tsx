import React, { useState } from 'react';
import Hero from '../components/Hero';
import MediaCard from '../components/MediaCard';
import { Filter } from 'lucide-react';

const Media: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | 'videos'>('all');

  // Sample media data
  const mediaItems = [
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/6551095/pexels-photo-6551095.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Championship Point - Men's A Division",
      date: "June 15, 2025",
      description: "The winning point of the Men's A Division Championship match"
    },
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/6551164/pexels-photo-6551164.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Tournament Highlights - All Divisions",
      date: "May 30, 2025",
      description: "Best plays from our recent tournament featuring all divisions"
    },
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/6551087/pexels-photo-6551087.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Women's A Division Semi-Finals",
      date: "May 28, 2025",
      description: "Action shots from the intense semi-final match"
    },
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/6551175/pexels-photo-6551175.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Men's B Division Finals",
      date: "May 25, 2025",
      description: "Full match recording of the exciting Men's B finals"
    },
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/6551094/pexels-photo-6551094.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Season Opening Night",
      date: "April 10, 2025",
      description: "Photos from our exciting season opening matches"
    },
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/6551084/pexels-photo-6551084.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Player Interviews - Season Preview",
      date: "April 5, 2025",
      description: "Meet the captains from each division as they preview the new season"
    },
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/6551126/pexels-photo-6551126.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Women's A Division Action Shots",
      date: "April 12, 2025",
      description: "Intense moments from recent Women's A Division matches"
    },
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/6551104/pexels-photo-6551104.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Setting Tutorial with Pro Players",
      date: "March 30, 2025",
      description: "Learn setting techniques from our league's top setters"
    },
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/7045557/pexels-photo-7045557.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Sponsor Appreciation Night",
      date: "May 1, 2025",
      description: "Photos from our special event honoring our sponsors"
    },
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/6551099/pexels-photo-6551099.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Play of the Week Highlights",
      date: "Ongoing",
      description: "A compilation of the best plays voted by fans each week"
    },
    {
      type: "image" as const,
      src: "https://images.pexels.com/photos/6551113/pexels-photo-6551113.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Team Photos - All Divisions",
      date: "April 8, 2025",
      description: "Official team photos from all divisions for the current season"
    },
    {
      type: "video" as const,
      src: "https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Defensive Masterclass",
      date: "May 10, 2025",
      description: "Watch our best defensive plays and techniques from recent matches"
    },
  ];

  const filteredMedia = activeFilter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.type === activeFilter.slice(0, -1)); // Convert 'photos' to 'image', 'videos' to 'video'

  return (
    <div>
      <Hero 
        title="Media Gallery" 
        subtitle="Explore photos and videos from our volleyball leagues"
        backgroundImage="https://images.pexels.com/photos/6551126/pexels-photo-6551126.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Media Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-2">Our Gallery</h2>
              <p className="text-gray-600">
                Check out the latest photos and videos from our matches and events
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex bg-white shadow rounded-lg">
                <button 
                  className={`px-4 py-2 rounded-l-lg text-sm font-medium ${
                    activeFilter === 'all' 
                      ? 'bg-orange text-white' 
                      : 'text-gray-700 hover:text-orange'
                  }`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === 'photos' 
                      ? 'bg-orange text-white' 
                      : 'text-gray-700 hover:text-orange'
                  }`}
                  onClick={() => setActiveFilter('photos')}
                >
                  Photos
                </button>
                <button 
                  className={`px-4 py-2 rounded-r-lg text-sm font-medium ${
                    activeFilter === 'videos' 
                      ? 'bg-orange text-white' 
                      : 'text-gray-700 hover:text-orange'
                  }`}
                  onClick={() => setActiveFilter('videos')}
                >
                  Videos
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item, index) => (
              <MediaCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Submit Your Photos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">Share Your Moments</h2>
            <p className="text-lg text-gray-600 mb-8">
              Captured some great photos or videos during our matches? We'd love to feature them in our gallery!
            </p>
            <a 
              href="mailto:insert(media submission email)here" 
              className="inline-block bg-orange text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Submit Your Media
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;