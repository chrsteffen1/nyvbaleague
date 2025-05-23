import React from 'react';
import { Instagram, Youtube, Facebook, Mail, Phone } from 'lucide-react';
import { Link } from './Link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
            <span className="text-orange mr-1">NYVBA</span><span className="text-white">League</span>
            </h3>
            <p className="mb-4">
              Three levels of competitive volleyball across Men's A, B, and Women's divisions.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.instagram.com/nyvbaleague/" 
                className="hover:text-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={24} />
              </Link>
              <Link 
                href="https://www.youtube.com/@nyvbaleague" 
                className="hover:text-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={24} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">About</Link>
              </li>
              <li>
                <Link href="/sponsors" className="hover:text-orange transition-colors">Sponsors</Link>
              </li>
              <li>
                <Link href="/social" className="hover:text-orange transition-colors">Social & Live Streams</Link>
              </li>
              <li>
                <Link 
                  href="/scores" className="hover:text-orange transition-colors"
                >
                  Stats & Scores
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-orange" />
                <a href="mailto:insert(email)here" className="hover:text-orange transition-colors">
                  insert(email)here
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-orange" />
                <a href="tel:insert(phone)here" className="hover:text-orange transition-colors">
                  insert(phone)here
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NYVBALeague. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;