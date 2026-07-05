import React from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

export default function CoverageAnalytics() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-pure-white)', borderTop: '1px solid var(--color-stone-border)' }}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-heading mb-4">Coverage <span style={{ color: 'var(--color-cyan-signal)' }}>Analytics</span></h2>
          <p className="text-warm text-subheading">Data-driven insights for your location.</p>
        </div>
        
        <div className="grid grid-cols-3" style={{ gap: '32px' }}>
          
          {/* Card 1: Signal Strength */}
          <div className="card" style={{ padding: '40px 32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '24px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(59, 166, 241, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BarChart3 size={24} className="text-cyan" />
              </div>
              <span style={{ backgroundColor: 'rgba(59, 166, 241, 0.1)', color: 'var(--color-cyan-signal)', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Live Data</span>
            </div>
            <h3 className="text-ink mb-1" style={{ fontSize: '18px', fontWeight: '600' }}>Avg. Signal Strength</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', color: 'var(--color-ink-black)', lineHeight: '1' }}>-85</span>
              <span className="text-warm" style={{ fontSize: '18px', fontWeight: '500' }}>dBm</span>
            </div>
            <p className="text-warm" style={{ fontSize: '14px', lineHeight: '1.6' }}>Measured across top 4 providers in this specific sector.</p>
          </div>

          {/* Card 2: Network Stability */}
          <div className="card" style={{ padding: '40px 32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '24px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(160, 132, 232, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Activity size={24} style={{ color: '#a084e8' }} />
              </div>
              <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Excellent</span>
            </div>
            <h3 className="text-ink mb-1" style={{ fontSize: '18px', fontWeight: '600' }}>Network Stability</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', color: 'var(--color-ink-black)', lineHeight: '1' }}>99.8</span>
              <span className="text-warm" style={{ fontSize: '18px', fontWeight: '500' }}>%</span>
            </div>
            <p className="text-warm" style={{ fontSize: '14px', lineHeight: '1.6' }}>Uptime recorded from community devices in the last 30 days.</p>
          </div>

          {/* Card 3: Speed Trends */}
          <div className="card" style={{ padding: '40px 32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '24px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TrendingUp size={24} style={{ color: '#F59E0B' }} />
              </div>
              <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#d97706', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Trending Up</span>
            </div>
            <h3 className="text-ink mb-1" style={{ fontSize: '18px', fontWeight: '600' }}>Speed Improvements</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', color: '#16a34a', lineHeight: '1' }}>+15</span>
              <span className="text-warm" style={{ fontSize: '18px', fontWeight: '500' }}>%</span>
            </div>
            <p className="text-warm" style={{ fontSize: '14px', lineHeight: '1.6' }}>Average download speeds have increased by 15% this quarter.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
