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
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[9999] p-2 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-700"
        style={{ pointerEvents: 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[999]" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:relative top-0 left-0 h-[100dvh] w-80 bg-white border-r border-gray-200 flex flex-col z-[1000] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-800 mb-4 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200 no-underline transition-colors">
              <ArrowLeft size={14} /> Back to Search
            </Link>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-blue-500" />
              Telecom GIS Pro
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Advanced geospatial network analytics.
            </p>
          </div>
          {/* Close button on mobile */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-gray-800 bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[1px] mb-3 pl-3">
            Analytics Modules
          </div>
          
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {menuItems.map(item => {
              const isActive = activeLayer === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveLayer(item.id);
                      setIsOpen(false); // Close on mobile after select
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${isActive ? 'bg-blue-50 border border-blue-100' : 'bg-transparent border border-transparent hover:bg-gray-50'}`}
                  >
                    <div className={`mt-0.5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${isActive ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 leading-relaxed">
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
    </>
  );
}
