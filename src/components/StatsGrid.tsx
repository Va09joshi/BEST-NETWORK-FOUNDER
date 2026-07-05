import React from 'react';
import { Map, Users, RadioTower, Zap } from 'lucide-react';

const stats = [
  { label: 'Locations covered', value: '45,200+', icon: <Map size={24} className="text-cyan" /> },
  { label: 'Community reports', value: '1.2M', icon: <Users size={24} className="text-cyan" /> },
  { label: 'Nearby towers', value: '85,400', icon: <RadioTower size={24} className="text-cyan" /> },
  { label: 'Avg. speed tests', value: '250K/day', icon: <Zap size={24} className="text-cyan" /> },
];

export default function StatsGrid() {
  return (
    <section className="section bg-pure-white" style={{ padding: '120px 0' }}>
      <div className="container">
        <div className="grid grid-cols-4" style={{ gap: '0' }}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center" style={{ 
              padding: '24px 16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              borderRight: i !== stats.length - 1 ? '1px solid var(--color-stone-border)' : 'none'
            }}>
              <div style={{ marginBottom: '16px' }}>
                {React.cloneElement(stat.icon, { size: 36, strokeWidth: 1.5 })}
              </div>
              <div className="text-ink" style={{ fontSize: '48px', fontWeight: '300', letterSpacing: '-2px', lineHeight: '1', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div className="text-warm font-medium" style={{ fontSize: '15px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
