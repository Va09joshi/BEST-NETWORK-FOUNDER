"use client";

import React, { useState, useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import { Signal, Download, Upload, Clock, CheckCircle2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const LOADING_STEPS = [
  "Connecting to OpenCelliD database...",
  "Retrieving local topology data...",
  "Analyzing 4G/5G signal propagation...",
  "Testing for geographic interference...",
  "Aggregating community speed tests...",
  "Generating final recommendation..."
];

export default function NetworkRecommendation() {
  const { location, recommendation, isCalculating, setRecommendation, setIsCalculating } = useLocation();
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeSimIndex, setActiveSimIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isCalculating && recommendation) {
      setActiveSimIndex(0); // Reset swipe index only when calculation finishes (e.g., new search)
    }
    if (isCalculating) {
      setIsDismissed(false); // Re-open if a new search happens
    }
  }, [isCalculating, recommendation?.bestProvider]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalculating) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 500); // Change step every 500ms
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  if (isCalculating) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--color-pure-white)', borderRadius: '24px', boxShadow: '0 32px 64px rgba(0,0,0,0.2)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '24px' }}>
          {/* Massive Glowing Scanning SIM Card */}
          <div style={{ position: 'relative', width: '120px', height: '180px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Outer Glow */}
            <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.4) 0%, transparent 70%)', animation: 'pulseGlow 2s infinite ease-in-out', zIndex: 0 }} />
            
            {/* The SIM Card Base */}
            <div style={{ 
              position: 'relative', 
              width: '100px', 
              height: '150px', 
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
              borderRadius: '12px',
              clipPath: 'polygon(0 0, 75% 0, 100% 15%, 100% 100%, 0 100%)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
              border: '2px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              
              {/* Metallic Chip */}
              <div style={{ 
                width: '60px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)', 
                borderRadius: '6px',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr 1fr',
                gap: '1px',
                padding: '2px',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.4)'
              }}>
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', gridRow: 'span 2' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', gridRow: 'span 2' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', gridRow: 'span 2' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
              </div>

              {/* Holographic Scanning Laser */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#3b82f6', boxShadow: '0 0 20px 8px rgba(59, 130, 246, 0.6)', animation: 'scanLaser 1.5s infinite linear', zIndex: 10 }} />
              
              {/* Flowing Data Lines in the background of the SIM */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59,130,246,0.1) 25%, rgba(59,130,246,0.1) 26%, transparent 27%, transparent 74%, rgba(59,130,246,0.1) 75%, rgba(59,130,246,0.1) 76%, transparent 77%, transparent)', backgroundSize: '100% 20px', animation: 'dataFlow 4s infinite linear', zIndex: 0 }} />
            </div>
          </div>
          
          <h2 style={{ fontSize: '28px', color: 'var(--color-ink-black)', fontWeight: '800', marginBottom: '12px' }}>Processing Network Data...</h2>
          <p style={{ fontSize: '16px', color: 'var(--color-ash-gray)', marginBottom: '0', minHeight: '24px', fontWeight: '600', transition: 'all 0.3s' }}>
            {LOADING_STEPS[loadingStep]}
          </p>
        </div>
        <style>{`
          @keyframes scanLaser {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 150px; opacity: 0; }
          }
          @keyframes pulseGlow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
          @keyframes dataFlow {
            0% { background-position: 0 0; }
            100% { background-position: 0 100px; }
          }
        `}</style>
      </div>
    );
  }

  if (!recommendation) {
    return null;
  }

  if (isDismissed) {
    return (
      <button 
        onClick={() => setIsDismissed(false)}
        style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999, padding: '16px 28px', backgroundColor: '#ffffff', color: '#3b82f6', borderRadius: '12px', fontWeight: '800', boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #eff6ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', fontFamily: 'var(--font-outfit)' }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'; }}
      >
        <Signal size={20} />
        Show Recommendation
      </button>
    );
  }

  const comparisons = recommendation.allOperators || [
    { name: recommendation.bestProvider, speed: recommendation.avgDownload, ping: recommendation.latency, score: 10 },
  ];

  const activeData = comparisons[activeSimIndex] || comparisons[0];
  const provider = activeData.name;
  const download = activeData.speed || recommendation.avgDownload;
  const latency = activeData.ping || recommendation.latency;
  const type = provider === 'Jio' ? 'True 5G' : provider === 'Airtel' ? '5G Plus' : '4G LTE';
  const placeName = location?.placeName || 'your area';

  const getProviderColor = (p: string) => {
    if (p === 'Airtel') return '#ef4444'; // Red
    if (p === 'Jio') return '#3b82f6'; // Blue
    if (p === 'Vi') return '#eab308'; // Yellow
    if (p === 'BSNL') return '#0ea5e9'; // Light blue
    return '#22c55e'; // Green
  };
  
  const pColor = getProviderColor(provider);
  // Soft neutral background color for the winner card (removing the colored backgrounds)
  const pBgColor = '#f9fafb';

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '760px', 
        backgroundColor: '#ffffff', 
        borderRadius: '32px', 
        boxShadow: '0 32px 64px rgba(0,0,0,0.2)', 
        padding: '48px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        margin: 'auto'
      }}>
        
        {/* Restored Close Button */}
        <button 
          onClick={() => setIsDismissed(true)}
          style={{ position: 'absolute', top: '24px', right: '24px', width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f3f4f6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#374151', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#ecfdf5', color: '#10b981', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
          <CheckCircle2 size={16} /> Verified Best Network
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', letterSpacing: '-1px', lineHeight: '1.2' }}>
            The Best SIM for <span style={{ color: '#3b82f6' }}>{location?.placeName?.split(',')[0] || 'your area'}</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', marginTop: '12px', fontWeight: '500' }}>
            Based on {recommendation.allOperators ? recommendation.allOperators.reduce((acc: number, op: any) => acc + (op.towers || 0), 0) : 12} live cell towers and signal strength propagation data.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', width: '100%', alignItems: 'stretch' }}>
          
          {/* Left Side: Winner Card */}
          <div style={{ 
            flex: '1 1 300px',
            backgroundColor: pBgColor, 
            borderRadius: '24px', 
            padding: '40px 32px 32px 32px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            border: `1px solid ${pBgColor}`, // to keep sizing consistent
            position: 'relative'
          }}>
            {/* Swiper Controls */}
            {comparisons.length > 1 && (
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'absolute', top: '100px', left: 0, padding: '0 16px', zIndex: 10 }}>
                 <button 
                   onClick={() => setActiveSimIndex(Math.max(0, activeSimIndex - 1))}
                   style={{ opacity: activeSimIndex > 0 ? 1 : 0, pointerEvents: activeSimIndex > 0 ? 'auto' : 'none', width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                 </button>
                 <button 
                   onClick={() => setActiveSimIndex(Math.min(comparisons.length - 1, activeSimIndex + 1))}
                   style={{ opacity: activeSimIndex < comparisons.length - 1 ? 1 : 0, pointerEvents: activeSimIndex < comparisons.length - 1 ? 'auto' : 'none', width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                 </button>
               </div>
            )}

            {/* Highly Realistic Physical SIM Card */}
            <div style={{ 
              width: '90px', 
              height: '135px', 
              background: provider === 'Airtel' ? 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' : 
                          provider === 'Jio' ? 'linear-gradient(135deg, #0f3cc9 0%, #0a257a 100%)' : 
                          provider === 'Vi' ? 'linear-gradient(135deg, #ed1b24 0%, #b2141b 100%)' : 
                          provider === 'BSNL' ? 'linear-gradient(135deg, #1e3a8a 0%, #172a6b 100%)' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
              borderRadius: '6px',
              /* Proper 45-degree SIM cut corner on top-right */
              clipPath: 'polygon(0 0, 70% 0, 100% 15%, 100% 100%, 0 100%)',
              marginBottom: '24px', 
              position: 'relative',
              boxShadow: '0 12px 24px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 8px 12px 8px'
            }}>
              {/* Brand Logo Area */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '8px' }}>
                {provider === 'Airtel' && (
                  <span style={{ color: 'white', fontWeight: 800, fontStyle: 'italic', fontSize: '18px', letterSpacing: '-0.5px' }}>airtel</span>
                )}
                {provider === 'Jio' && (
                  <div style={{ backgroundColor: 'white', color: '#0f3cc9', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', letterSpacing: '-0.5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    Jio
                  </div>
                )}
                {provider === 'Vi' && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', fontWeight: 800, fontSize: '32px', color: 'white', lineHeight: 1 }}>
                    V<span style={{ color: 'white' }}>i</span><div style={{ width: '8px', height: '8px', backgroundColor: '#facc15', borderRadius: '50%', marginLeft: '2px', marginBottom: '4px' }}/>
                  </div>
                )}
                {provider === 'BSNL' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        <ArrowUpRight size={20} color="#dc2626" strokeWidth={4} style={{ position: 'absolute', top: '2px', left: '2px', transform: 'rotate(-5deg)' }} />
                        <ArrowDownLeft size={20} color="#2563eb" strokeWidth={4} style={{ position: 'absolute', bottom: '2px', right: '2px', transform: 'rotate(-5deg)' }} />
                     </div>
                     <span style={{ color: 'white', fontWeight: 800, fontSize: '12px' }}>BSNL</span>
                  </div>
                )}
              </div>
              
              {/* Highly Realistic Metallic Gold Chip */}
              <div style={{ 
                width: '56px', 
                height: '46px', 
                background: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)', 
                borderRadius: '6px',
                border: '1px solid #92400e',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr 1fr',
                gap: '1px',
                padding: '2px',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.2)'
              }}>
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', gridRow: 'span 2' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
                
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', gridRow: 'span 2' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', gridRow: 'span 2' }} />
                
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
                <div style={{ border: '1px solid #b45309', borderRadius: '2px', background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)' }} />
              </div>
            </div>
            
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              {activeSimIndex === 0 ? 'Top Provider' : activeSimIndex === 1 ? '2nd Best Alternative' : activeSimIndex === 2 ? '3rd Option' : '4th Option'}
            </div>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#111827', lineHeight: '1', marginBottom: '8px', fontFamily: 'var(--font-roobert)' }}>{provider}</div>
            <div style={{ fontSize: '16px', color: pColor, fontWeight: '600', marginBottom: 'auto', paddingBottom: '32px' }}>{type}</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <div style={{ borderRight: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827' }}>{download}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px', marginTop: '4px' }}>Mbps DL</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827' }}>{latency}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px', marginTop: '4px' }}>ms Ping</div>
              </div>
            </div>
            
            {/* Pagination Dots */}
            {comparisons.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                {comparisons.map((_: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveSimIndex(idx)}
                    style={{ 
                      width: activeSimIndex === idx ? '24px' : '8px', 
                      height: '8px', 
                      borderRadius: '4px', 
                      backgroundColor: activeSimIndex === idx ? pColor : '#d1d5db',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Right Side: Score Breakdown */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Algorithm Scores</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {comparisons.map((comp: any, idx: number) => {
                const isWinner = comp.name === provider; // provider is activeData.name
                const maxScore = Math.max(...comparisons.map((c: any) => c.score));
                const compColor = getProviderColor(comp.name);
                const rowBgColor = isWinner ? '#f3f4f6' : '#f9fafb'; 
                const borderColor = isWinner ? compColor : '#e5e7eb';
                
                return (
                  <div 
                    key={comp.name} 
                    onClick={() => setActiveSimIndex(idx)}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', backgroundColor: rowBgColor, borderRadius: '12px', border: `1px solid ${borderColor}`, cursor: 'pointer', transition: 'all 0.2s', transform: isWinner ? 'scale(1.02)' : 'scale(1)', boxShadow: isWinner ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                  >
                    <div style={{ width: '50px', fontWeight: '700', color: '#111827', fontSize: '15px' }}>{comp.name}</div>
                    
                    {/* Progress Bar */}
                    <div style={{ flex: 1, backgroundColor: '#e5e7eb', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${(comp.score / maxScore) * 100}%`, 
                        height: '100%', 
                        backgroundColor: compColor,
                        borderRadius: '5px',
                        opacity: isWinner ? 1 : 0.6,
                        animation: `fillBar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                      }} />
                    </div>
                    
                    <div style={{ width: '60px', textAlign: 'right', fontWeight: isWinner ? '800' : '600', color: '#4b5563', fontSize: '14px' }}>
                      {comp.score.toFixed(1)} <span style={{ color: '#9ca3af', fontWeight: '500', fontSize: '12px' }}>/ 10</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <style>{`
              @keyframes fillBar {
                from { width: 0%; }
              }
            `}</style>
            
            <div style={{ marginTop: '24px' }}>
              <button 
                style={{ width: '100%', padding: '18px', fontSize: '15px', borderRadius: '12px', fontWeight: '700', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', color: '#111827', cursor: 'pointer', transition: 'all 0.2s' }} 
                onClick={() => window.location.href = '/analytics'}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                Open GIS Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
