import React from 'react';
import Link from 'next/link';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="navigation" style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link href="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '26px', 
            fontWeight: '800',
            letterSpacing: '-1px',
            fontFamily: '"Space Grotesk", sans-serif',
            background: 'linear-gradient(90deg, #0f172a 0%, #2563eb 50%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Best-NET</span>
        </Link>
      </div>
    </nav>
  );
}
