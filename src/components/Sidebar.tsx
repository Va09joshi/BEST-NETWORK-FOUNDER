"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, Zap, MapPin, Radio, ShieldAlert, Route, 
  Home, Users, BarChart3, PieChart, Lightbulb, ArrowLeft
} from 'lucide-react';

export type GISLayerType = 
  | 'dead_zones'
  | 'best_sim'
  | 'speed_ranking'
  | 'emergency'
  | 'weather_impact'
  | 'villages'
  | 'live_heatmap'
  | '5g_readiness'
  | 'digital_divide'
  | 'smart_tower';

interface SidebarProps {
  activeLayer: GISLayerType;
  setActiveLayer: (layer: GISLayerType) => void;
}

export default function Sidebar({ activeLayer, setActiveLayer }: SidebarProps) {
  const menuItems: { id: GISLayerType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'best_sim', label: 'Best SIM Finder', icon: <MapPin size={18} />, desc: 'Rank operators by location' },
    { id: 'speed_ranking', label: 'Internet Speed Ranking', icon: <Activity size={18} />, desc: 'Download, Upload, Ping, Jitter' },
    { id: 'live_heatmap', label: 'Live Heatmap', icon: <Users size={18} />, desc: 'Strong, Weak, No Network' },
    { id: 'dead_zones', label: 'Dead Zone Alert', icon: <Radio size={18} />, desc: 'Notify on poor connectivity' },
    { id: 'weather_impact', label: 'Weather Impact', icon: <Zap size={18} />, desc: 'Rain/Storm signal degradation' },
    { id: 'emergency', label: 'Emergency Connectivity', icon: <ShieldAlert size={18} />, desc: 'Nearest reliable signal' },
    { id: 'villages', label: 'Village Connectivity', icon: <Home size={18} />, desc: 'Underserved rural areas' },
    { id: '5g_readiness', label: '5G Readiness Index', icon: <Activity size={18} />, desc: 'Score areas on 5G availability' },
    { id: 'digital_divide', label: 'Digital Divide Analyzer', icon: <PieChart size={18} />, desc: 'Compare connectivity vs population' },
    { id: 'smart_tower', label: 'Smart AI Towers', icon: <Lightbulb size={18} />, desc: 'Optimal locations for new towers' },
  ];

  return (
    <div style={{ width: '320px', height: '100vh', backgroundColor: 'var(--color-pure-white)', borderRight: '1px solid var(--color-stone-border)', display: 'flex', flexDirection: 'column', zIndex: 100, position: 'relative' }}>
      
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--color-warm-gray)', textDecoration: 'none', marginBottom: '16px', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'var(--color-stone-canvas)', border: '1px solid var(--color-stone-border)' }}>
          <ArrowLeft size={14} /> Back to Search
        </Link>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-ink-black)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity className="text-cyan" />
          Telecom GIS Pro
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-ash-gray)', marginTop: '4px' }}>
          Advanced geospatial network analytics.
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-stone-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '12px' }}>
          Analytics Modules
        </div>
        
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => {
            const isActive = activeLayer === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveLayer(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: isActive ? 'var(--color-sky-wash)' : 'transparent',
                    border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-stone-canvas)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ color: isActive ? 'var(--color-cyan-signal)' : 'var(--color-warm-gray)', marginTop: '2px' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: isActive ? '600' : '500', color: isActive ? 'var(--color-ink-black)' : 'var(--color-ink-black)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-warm-gray)', marginTop: '4px', lineHeight: '1.4' }}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}
