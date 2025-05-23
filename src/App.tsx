import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Sponsors from './pages/Sponsors';
import Media from './pages/Media';
import Social from './pages/Social';
import Contact from './pages/Contact';
import Scores from './pages/Scores';
import Awards from './pages/Awards';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleRouteChange = (event: CustomEvent<{path: string}>) => {
      setCurrentPath(event.detail.path);
    };

    window.addEventListener('routechange', handleRouteChange as EventListener);

    return () => {
      window.removeEventListener('routechange', handleRouteChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const pathTitles: Record<string, string> = {
      '/': 'VolleyLeague - Home',
      '/about': 'About Our League',
      '/sponsors': 'Our Sponsors',
      '/media': 'Media Gallery',
      '/social': 'Social & Live Streams',
      '/contact': 'Contact Us',
      '/scores': 'Scores & Statistics',
      '/awards': 'Player Awards',
    };
    
    document.title = pathTitles[currentPath] || 'VolleyLeague';
  }, [currentPath]);

  const renderPage = () => {
    switch(currentPath) {
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      case '/sponsors':
        return <Sponsors />;
      case '/media':
        return <Media />;
      case '/social':
        return <Social />;
      case '/contact':
        return <Contact />;
      case '/scores':
        return <Scores />;
      case '/awards':
        return <Awards />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;