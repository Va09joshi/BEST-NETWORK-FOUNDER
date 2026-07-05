"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map component with SSR disabled
// Leaflet uses the window object, which isn't available during server-side rendering
const RealMap = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>
});

export default function InteractiveMap() {
  return (
    <section className="section" id="coverage" style={{ backgroundColor: 'var(--color-stone-canvas)', padding: '140px 0' }}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-heading mb-4">Interactive <span style={{ color: 'var(--color-cyan-signal)' }}>Coverage Map</span></h2>
          <p className="text-warm text-subheading">Explore signal strength and tower locations across the country.</p>
        </div>
        
        <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '600px', backgroundColor: '#e5e3df', border: '2px solid #0c0a09' }}>
          
          <RealMap />
          
          {/* Custom Overlay Legend matching Neo-Brutalist theme */}
          <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 1000, backgroundColor: 'var(--color-pure-white)', padding: '16px', border: '2px solid #0c0a09', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h4 className="text-ink font-medium mb-4" style={{ fontSize: '14px' }}>Coverage Types</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                <span className="text-warm" style={{ fontSize: '13px', fontWeight: 500 }}>Excellent 5G</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                <span className="text-warm" style={{ fontSize: '13px', fontWeight: 500 }}>Good 4G/5G</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                <span className="text-warm" style={{ fontSize: '13px', fontWeight: 500 }}>Variable Signal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
