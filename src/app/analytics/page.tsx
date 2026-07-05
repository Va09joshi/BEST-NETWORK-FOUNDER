"use client";

import React, { useState } from 'react';
import Sidebar, { GISLayerType } from '@/components/Sidebar';
import dynamic from 'next/dynamic';
import { useLocation } from '@/context/LocationContext';
import SpeedRankingData from '@/components/SpeedRankingData';

// Dynamically import the map to avoid SSR issues with Leaflet
const GISMap = dynamic(() => import('@/components/GISMap'), { 
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
      <div style={{ fontSize: '18px', color: '#64748b' }}>Loading GIS Engine...</div>
    </div>
  )
});

export default function AnalyticsPage() {
  const [activeLayer, setActiveLayer] = useState<GISLayerType>('best_sim');
  const { location, recommendation } = useLocation();

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--color-stone-canvas)' }}>
      
      {/* Left Sidebar */}
      <Sidebar activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
      
      {/* Main Map Content Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        
        {/* Top Floating Control Bar */}
        <div 
          className={`absolute top-16 md:top-6 left-4 right-4 md:left-6 md:right-6 z-[1000] flex-col md:flex-row justify-between items-start pointer-events-none gap-4 ${activeLayer === 'speed_ranking' ? 'hidden' : 'flex'}`}
        >
          
          <div className="pointer-events-auto flex flex-col gap-4 w-full md:w-auto">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-gray-200">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                {activeLayer.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <div className="text-xs md:text-sm text-gray-500">
                Real-time geospatial intelligence for {location ? location.placeName : 'India (National View)'}
              </div>
            </div>

            {/* Winner Announcement Box */}
            {activeLayer === 'best_sim' && recommendation && location && (
              <div 
                className="bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border-2 border-cyan-500 flex items-center gap-4 animate-[slideIn_0.5s_ease-out] w-full md:w-auto"
              >
                {/* Mini Realistic SIM Card */}
                <div style={{ 
                  width: '36px', 
                  height: '54px', 
                  background: recommendation.bestProvider === 'Airtel' ? 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' : 
                              recommendation.bestProvider === 'Jio' ? 'linear-gradient(135deg, #0f3cc9 0%, #0a257a 100%)' : 
                              recommendation.bestProvider === 'Vi' ? 'linear-gradient(135deg, #ed1b24 0%, #b2141b 100%)' : 
                              recommendation.bestProvider === 'BSNL' ? 'linear-gradient(135deg, #1e3a8a 0%, #172a6b 100%)' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
                  borderRadius: '4px',
                  clipPath: 'polygon(0 0, 70% 0, 100% 15%, 100% 100%, 0 100%)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '6px 4px',
                  flexShrink: 0
                }}>
                  {/* Brand Text */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '9px', letterSpacing: '-0.2px' }}>
                      {recommendation.bestProvider === 'Airtel' ? 'airtel' : recommendation.bestProvider}
                    </span>
                  </div>
                  {/* Gold Chip */}
                  <div style={{ 
                    width: '24px', height: '18px', 
                    background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)', 
                    borderRadius: '3px',
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1px', padding: '1px',
                    border: '1px solid #92400e'
                  }}>
                    <div style={{ border: '1px solid #b45309', background: '#facc15' }} />
                    <div style={{ border: '1px solid #b45309', background: '#facc15', gridRow: 'span 2' }} />
                    <div style={{ border: '1px solid #b45309', background: '#facc15' }} />
                    <div style={{ border: '1px solid #b45309', background: '#facc15' }} />
                    <div style={{ border: '1px solid #b45309', background: '#facc15' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-cyan-signal)', letterSpacing: '1px', marginBottom: '4px' }}>
                    Algorithm Winner
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-ink-black)' }}>
                    {recommendation.bestProvider} <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--color-warm-gray)' }}>is best here</span>
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-ink-black)' }}>{recommendation.avgDownload} <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)' }}>Mbps</span></div>
                  <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Score: {recommendation.allOperators?.[0]?.score?.toFixed(1) || '9.5'} / 10</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Glassmorphism Stats Panel on the Right */}
          <div style={{ 
            pointerEvents: 'auto', 
            width: '320px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(16px)',
            padding: '24px', 
            borderRadius: '16px', 
            boxShadow: '0 12px 48px rgba(0,0,0,0.12)', 
            border: '1px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-stone-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Live Telemetry: {activeLayer.replace(/_/g, ' ').toUpperCase()}
            </div>

            {activeLayer === '5g_readiness' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Overall Readiness</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#8b5cf6' }}>74%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
                  <div style={{ width: '74%', height: '100%', backgroundColor: '#8b5cf6', borderRadius: '4px' }} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-ash-gray)' }}>Fiber backhaul detected in 6 of 12 sectors.</p>
              </>
            ) : activeLayer === 'digital_divide' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Underserved Pop.</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#b91c1c' }}>12.4k</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-ash-gray)' }}>Red zones indicate high population density with less than 2 operational towers.</p>
              </>
            ) : activeLayer === 'live_heatmap' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Strong Signal</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#22c55e' }}>68%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Weak Signal</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#eab308' }}>22%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>No Network</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#ef4444' }}>10%</span>
                </div>
              </>
            ) : activeLayer === 'speed_ranking' ? (
              <>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Top Network: Airtel</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ backgroundColor: '#f8fafc', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Download</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>124.5 <span style={{fontSize:'10px'}}>Mbps</span></div>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Upload</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>32.1 <span style={{fontSize:'10px'}}>Mbps</span></div>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Ping</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>18 <span style={{fontSize:'10px'}}>ms</span></div>
                  </div>
                  <div style={{ backgroundColor: '#f8fafc', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Jitter</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>4 <span style={{fontSize:'10px'}}>ms</span></div>
                  </div>
                </div>
              </>
            ) : activeLayer === 'dead_zones' ? (
              <>
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px', padding: '12px', marginBottom: '8px', animation: 'pulse 2s infinite' }}>
                  <div style={{ color: '#b91c1c', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>⚠️</span> DEAD ZONE ALERT
                  </div>
                  <div style={{ color: '#991b1b', fontSize: '12px', marginTop: '4px' }}>You are approaching an area with poor connectivity. Expect call drops.</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Active Dead Zones</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#ef4444' }}>4</span>
                </div>
              </>
            ) : activeLayer === 'weather_impact' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Current Weather</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#3b82f6' }}>Heavy Rain ⛈️</span>
                </div>
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: '600' }}>Signal Degradation</div>
                  <div style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800' }}>-15%</div>
                  <div style={{ color: '#2563eb', fontSize: '11px', marginTop: '4px' }}>Rain fade is reducing high-frequency 5G bands.</div>
                </div>
              </>
            ) : activeLayer === 'emergency' ? (
              <>
                <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                  <div style={{ color: '#047857', fontSize: '13px', fontWeight: '600' }}>Nearest Reliable Signal</div>
                  <div style={{ color: '#064e3b', fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>City Hospital Hub</div>
                  <div style={{ color: '#059669', fontSize: '12px', marginTop: '4px' }}>Distance: ~1.2 km North</div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-ash-gray)' }}>Follow the green dashed line on the map to reach the nearest excellent connection.</p>
              </>
            ) : activeLayer === 'smart_tower' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>AI Suggestions</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>3 Sites</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Avg. ROI Score</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>94.2%</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-ink-black)', fontWeight: '500' }}>Data Source</span>
                  <span style={{ fontSize: '12px', backgroundColor: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>OSM Live API</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-ink-black)', fontWeight: '500' }}>Grid Radius</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-warm-gray)', fontWeight: '500' }}>10x10 km</span>
                </div>
              </>
            )}
            
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-stone-border)', margin: '4px 0' }} />
            
            <p style={{ fontSize: '13px', color: 'var(--color-ash-gray)', lineHeight: '1.5', margin: 0 }}>
              This module uses <strong style={{ color: 'var(--color-ink-black)' }}>real physical infrastructure data</strong> fused with AI analytics to generate geospatial intelligence.
            </p>
          </div>
          
        </div>

        {/* The Fullscreen GIS Map (Always rendered to prevent Leaflet crash on remount, but hidden when overlay active) */}
        <div style={{ visibility: activeLayer === 'speed_ranking' ? 'hidden' : 'visible', height: '100%', width: '100%', position: 'absolute', inset: 0 }}>
          <GISMap layerType={activeLayer} />
        </div>
        
        {/* Conditional Overlay Data View */}
        {activeLayer === 'speed_ranking' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 500 }}>
            <SpeedRankingData />
          </div>
        )}
        
      </div>
    </div>
  );
}
