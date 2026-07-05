import React from 'react';
import { Sparkles, Signal, Zap, Activity, Radio, Users } from 'lucide-react';

export default function AIScoreBreakdown() {
  const metrics = [
    { label: 'Signal Strength', weight: '40%', icon: <Signal size={18} />, color: 'var(--color-cyan-signal)', fill: 40 },
    { label: 'Download Speed', weight: '30%', icon: <Zap size={18} />, color: '#3b82f6', fill: 30 },
    { label: 'Latency (Ping)', weight: '15%', icon: <Activity size={18} />, color: '#8b5cf6', fill: 15 },
    { label: 'Nearby Towers', weight: '10%', icon: <Radio size={18} />, color: '#f59e0b', fill: 10 },
    { label: 'Community Rating', weight: '5%', icon: <Users size={18} />, color: '#ec4899', fill: 5 },
  ];

  return (
    <div style={{
      backgroundColor: 'var(--color-pure-white)',
      borderRadius: '16px',
      border: '1px solid var(--color-stone-border)',
      padding: '24px',
      height: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Sparkles size={24} className="text-cyan" />
        <h3 className="text-ink font-bold" style={{ fontSize: '20px' }}>AI Network Score</h3>
      </div>
      <p className="text-warm" style={{ fontSize: '14px', marginBottom: '24px' }}>
        How our algorithm calculates the ultimate winner for your location.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {metrics.map((metric, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-ink-black)', fontSize: '14px', fontWeight: '500' }}>
                <span style={{ color: metric.color }}>{metric.icon}</span>
                {metric.label}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-ink-black)' }}>
                {metric.weight}
              </div>
            </div>
            
            {/* Progress bar representing weight */}
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-stone-canvas)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${(metric.fill / 40) * 100}%`, // Normalize so 40% is full width for visual balance
                height: '100%', 
                backgroundColor: metric.color,
                borderRadius: '4px'
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '32px', 
        paddingTop: '24px', 
        borderTop: '1px solid var(--color-stone-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-ink-black)' }}>Total AI Score</div>
        <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--color-cyan-signal)' }}>100%</div>
      </div>
    </div>
  );
}
