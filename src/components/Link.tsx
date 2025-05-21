import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '', target, rel, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    
    // If it's an internal link and not opening in a new tab
    if (href.startsWith('/') && !target) {
      e.preventDefault();
      // We'd typically use a router here, but for this demo we'll just change the URL
      window.history.pushState({}, '', href);
      // Dispatch a custom event that our router can listen to
      window.dispatchEvent(new CustomEvent('routechange', { detail: { path: href } }));
    }
  };

  return (
    <a 
      href={href} 
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};