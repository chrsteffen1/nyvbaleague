import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from './Link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black shadow-md py-2' 
          : 'bg-black py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center">
              <span className="text-orange mr-1">V</span>olley<span className="text-orange">League</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-orange transition-colors">Home</Link>
            <Link href="/about" className="text-white hover:text-orange transition-colors">About</Link>
            <Link href="/sponsors" className="text-white hover:text-orange transition-colors">Sponsors</Link>
            <Link href="/media" className="text-white hover:text-orange transition-colors">Media</Link>
            <Link href="/social" className="text-white hover:text-orange transition-colors">Social</Link>
            <Link href="/scores" className="text-white hover:text-orange transition-colors">Scores</Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-black absolute left-0 right-0 top-full p-4 shadow-md animate-slideDown">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-orange transition-colors">Home</Link>
              <Link href="/about" className="text-white hover:text-orange transition-colors">About</Link>
              <Link href="/sponsors" className="text-white hover:text-orange transition-colors">Sponsors</Link>
              <Link href="/media" className="text-white hover:text-orange transition-colors">Media</Link>
              <Link href="/social" className="text-white hover:text-orange transition-colors">Social</Link>
              <Link href="/scores" className="text-white hover:text-orange transition-colors">Scores</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;