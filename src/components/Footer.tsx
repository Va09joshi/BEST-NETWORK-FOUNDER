"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname === '/analytics') {
    return null;
  }

  return (
    <footer style={{ borderTop: '1px solid var(--color-stone-border)', padding: '64px 0 32px', backgroundColor: 'var(--color-stone-canvas)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Top section with Logo and Links */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
          
          {/* Logo & Description */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
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
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-ash-gray)', lineHeight: '1.6' }}>
              Empowering users with real-time telecommunications data. Find the fastest, most reliable mobile networks anywhere in India.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '64px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-ink-black)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Platform</h4>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ash-gray)', textDecoration: 'none' }}>Best SIM Finder</a>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ash-gray)', textDecoration: 'none' }}>GIS Dashboard</a>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ash-gray)', textDecoration: 'none' }}>Coverage Maps</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-ink-black)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Company</h4>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ash-gray)', textDecoration: 'none' }}>About Us</a>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ash-gray)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ash-gray)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="text-warm" style={{ fontSize: '13px' }}>
            &copy; {new Date().getFullYear()} Best-NET Intelligence. All rights reserved.
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-ash-gray)' }}>
            Built for reliable connectivity.
          </div>
        </div>

      </div>
    </footer>
  );
}
