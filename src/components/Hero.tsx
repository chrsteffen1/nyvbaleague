import React from 'react';
import { Link } from './Link';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink = '/',
  backgroundImage = 'https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1920'
}) => {
  return (
    <div 
      className="relative min-h-[80vh] flex items-center text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 20, 60, 0.7), rgba(0, 20, 60, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-fadeIn">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl animate-fadeIn animation-delay-200">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="animate-fadeIn animation-delay-400">
              <Link 
                href={ctaLink} 
                className="inline-block bg-orange text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;