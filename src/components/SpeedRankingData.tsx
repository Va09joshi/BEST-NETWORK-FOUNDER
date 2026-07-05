"use client";

import React, { useEffect, useState } from 'react';
import { useLocation } from '@/context/LocationContext';

const SPEED_LOADING_STEPS = [
  "Connecting to local test servers...",
  "Pinging nearest network nodes...",
  "Running download throughput tests...",
  "Running upload throughput tests...",
  "Measuring network jitter and latency...",
  "Aggregating speed results..."
];

export default function SpeedRankingData() {
  const { location } = useLocation();
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < SPEED_LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 400); 
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    async function fetchData() {
      try {
        const lat = location?.latitude || 20.5937;
        const lng = location?.longitude || 78.9629;
        const res = await fetch(`/api/gis?layer=speed_ranking&lat=${lat}&lng=${lng}`);
        const data = await res.json();
        if (data.rankings) {
          setRankings(data.rankings);
        }
      } catch (err) {
        console.error("Failed to fetch speed rankings", err);
      } finally {
        // Add artificial delay to show off the beautiful loader
        setTimeout(() => setLoading(false), 2400);
      }
    }
    fetchData();
  }, [location]);

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f8fafc' }}>
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--color-pure-white)', borderRadius: '24px', boxShadow: '0 32px 64px rgba(0,0,0,0.05)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '24px' }}>
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
          
          <h2 style={{ fontSize: '24px', color: '#0f172a', fontWeight: '800', marginBottom: '12px' }}>Testing Local Networks...</h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '0', minHeight: '24px', fontWeight: '600', transition: 'all 0.3s' }}>
            {SPEED_LOADING_STEPS[loadingStep]}
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
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.6; }
          }
          @keyframes dataFlow {
            0% { background-position: 0 0; }
            100% { background-position: 0 100px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#f8fafc', height: '100%', overflowY: 'auto', padding: '120px 48px 48px 48px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Internet Speed Ranking Data</h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Comprehensive network performance metrics for {location ? location.placeName : 'your area'}.</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rank</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Download (Mbps)</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upload (Mbps)</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ping (ms)</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jitter (ms)</th>
              </tr>
            </thead>
            <tbody style={{ divideY: '1px solid #e2e8f0' }}>
              {rankings.map((row, index) => {
                const isWinner = index === 0;
                return (
                  <tr key={row.provider} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: isWinner ? '#f0fdf4' : 'transparent', transition: 'background-color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = isWinner ? '#dcfce7' : '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = isWinner ? '#f0fdf4' : 'transparent'}>
                    <td style={{ padding: '24px', fontSize: '16px', fontWeight: '700', color: isWinner ? '#16a34a' : '#64748b' }}>
                      #{index + 1}
                    </td>
                    <td style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px',
                          backgroundColor: row.provider === 'Airtel' ? '#ef4444' : row.provider === 'Jio' ? '#3b82f6' : row.provider === 'Vi' ? '#eab308' : '#0ea5e9'
                        }}>
                          {row.provider[0]}
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{row.provider}</span>
                        {isWinner && <span style={{ marginLeft: '8px', padding: '4px 8px', backgroundColor: '#bbf7d0', color: '#166534', borderRadius: '9999px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>Best Overall</span>}
                      </div>
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                      {row.download.toFixed(1)}
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#475569' }}>
                      {row.upload.toFixed(1)}
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#475569' }}>
                      {row.ping}
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#475569' }}>
                      {row.jitter}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
