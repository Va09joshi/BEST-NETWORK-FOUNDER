import React from 'react';
import { CheckCircle2, XCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import './ComparisonCards.css';

const networks = [
  { name: 'Airtel', rating: 4.8, has5g: true, speed: '145 Mbps', color: '#E40000', reliability: '99.9%', ping: '24ms', startingPrice: '₹155 /mo', indoorCoverage: 'Excellent', freeOtt: 'Amazon Prime, Hotstar' },
  { name: 'Jio', rating: 4.6, has5g: true, speed: '120 Mbps', color: '#0f3cc9', reliability: '99.5%', ping: '32ms', startingPrice: '₹149 /mo', indoorCoverage: 'Strong', freeOtt: 'JioCinema, JioTV' },
  { name: 'Vi', rating: 4.1, has5g: false, speed: '65 Mbps', color: '#e20000', reliability: '95.0%', ping: '45ms', startingPrice: '₹155 /mo', indoorCoverage: 'Average', freeOtt: 'Hotstar (Select)' },
  { name: 'BSNL', rating: 3.5, has5g: false, speed: '15 Mbps', color: '#135c9e', reliability: '85.0%', ping: '85ms', startingPrice: '₹107 /mo', indoorCoverage: 'Poor', freeOtt: 'None' },
];

export default function ComparisonCards() {
  return (
    <section className="section" id="compare" style={{ backgroundColor: 'var(--color-pure-white)', padding: '140px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="text-center">
          <h2 className="text-heading mb-4">Detailed <span style={{ color: 'var(--color-cyan-signal)' }}>Comparison</span></h2>
          <p className="text-warm text-subheading">Side-by-side performance in your area.</p>
        </div>
        
        <div style={{ marginTop: '64px', backgroundColor: 'var(--color-pure-white)', borderRadius: '16px', border: '1px solid var(--color-stone-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', backgroundColor: 'var(--color-stone-canvas)', width: '28%' }}>
                  <span className="text-ink font-bold" style={{ fontSize: '18px' }}>Feature Comparison</span>
                </th>
                {networks.map((net, i) => {
                  const provider = net.name;
                  return (
                  <th key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)', backgroundColor: 'var(--color-stone-canvas)', width: '18%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      {/* Realistic Physical SIM Card */}
                      <div style={{ 
                        width: '54px', 
                        height: '81px', 
                        backgroundColor: provider === 'Airtel' ? '#ff0000' : 
                                         provider === 'Jio' ? '#0f3cc9' : 
                                         provider === 'Vi' ? '#ed1b24' : 
                                         provider === 'BSNL' ? '#1e3a8a' : '#22c55e', 
                        borderRadius: '6px', 
                        borderTopRightRadius: '20px', 
                        position: 'relative',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '8px 6px 6px 6px'
                      }}>
                        {/* Brand Logo Area */}
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '4px' }}>
                          {provider === 'Airtel' && (
                            <span style={{ color: 'white', fontWeight: 800, fontStyle: 'italic', fontSize: '12px', letterSpacing: '-0.5px' }}>airtel</span>
                          )}
                          {provider === 'Jio' && (
                            <div style={{ backgroundColor: 'white', color: '#0f3cc9', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', letterSpacing: '-0.5px' }}>
                              Jio
                            </div>
                          )}
                          {provider === 'Vi' && (
                            <div style={{ display: 'flex', alignItems: 'flex-end', fontWeight: 800, fontSize: '18px', color: 'white', lineHeight: 1 }}>
                              V<span style={{ color: 'white' }}>i</span><div style={{ width: '4px', height: '4px', backgroundColor: '#facc15', borderRadius: '50%', marginLeft: '1px', marginBottom: '2px' }}/>
                            </div>
                          )}
                          {provider === 'BSNL' && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                               <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2px', position: 'relative' }}>
                                  <div style={{ position: 'absolute', width: '8px', height: '2px', backgroundColor: '#dc2626', transform: 'rotate(-45deg)' }} />
                                  <div style={{ position: 'absolute', width: '8px', height: '2px', backgroundColor: '#2563eb', transform: 'rotate(45deg)' }} />
                               </div>
                               <span style={{ color: 'white', fontWeight: 800, fontSize: '8px' }}>BSNL</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Gold Chip */}
                        <div style={{ 
                          width: '34px', 
                          height: '26px', 
                          backgroundColor: '#fcd34d', 
                          borderRadius: '4px',
                          border: '1px solid #b45309',
                          position: 'relative',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1px',
                          padding: '1px',
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8)'
                        }}>
                          <div style={{ border: '1px solid #b45309', borderRadius: '2px', backgroundColor: '#fde047' }} />
                          <div style={{ border: '1px solid #b45309', borderRadius: '2px', backgroundColor: '#fde047' }} />
                          <div style={{ border: '1px solid #b45309', borderRadius: '2px', backgroundColor: '#fde047' }} />
                          <div style={{ border: '1px solid #b45309', borderRadius: '2px', backgroundColor: '#fde047' }} />
                        </div>
                      </div>
                      
                      <span className="text-ink font-bold" style={{ fontSize: '18px', marginTop: '4px' }}>{net.name}</span>
                    </div>
                  </th>
                )})}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>5G Network Available</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    {net.has5g ? <CheckCircle2 size={24} className="text-cyan" style={{ margin: '0 auto' }} /> : <XCircle size={24} color="var(--color-stone-muted)" style={{ margin: '0 auto' }} />}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Average Download Speed</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    <span className="text-ink font-bold" style={{ fontSize: '18px' }}>{net.speed}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Network Reliability (Uptime)</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    <span className="text-ink" style={{ fontSize: '18px' }}>{net.reliability}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Average Ping (Latency)</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    <span className="text-ink" style={{ fontSize: '18px' }}>{net.ping}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Indoor Coverage</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    <span className="text-ink" style={{ fontSize: '16px' }}>{net.indoorCoverage}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Starting Price</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    <span className="text-ink font-bold" style={{ fontSize: '18px' }}>{net.startingPrice}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', borderBottom: '1px solid var(--color-stone-border)', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Free OTT Apps</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
                    <span className="text-warm" style={{ fontSize: '15px' }}>{net.freeOtt}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '24px 32px', textAlign: 'left', fontWeight: '500', color: 'var(--color-ink-black)', fontSize: '16px' }}>Community Rating</td>
                {networks.map((net, i) => (
                  <td key={i} style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <span className="text-ink font-bold" style={{ fontSize: '18px' }}>{net.rating}</span>
                      <span className="text-warm" style={{ fontSize: '16px' }}>/5.0</span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
