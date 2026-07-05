import React from 'react';
import { Search, ListFilter, Activity } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={48} className="text-cyan" />,
      title: "Search Your Location",
      description: "Enter your exact address, village, or pincode. Our system pinpoints your area instantly.",
    },
    {
      icon: <ListFilter size={48} className="text-cyan" />,
      title: "Compare Providers",
      description: "We show you side-by-side data for Airtel, Jio, Vi, and BSNL in your specific grid.",
    },
    {
      icon: <Activity size={48} className="text-cyan" />,
      title: "See Real Speeds",
      description: "View verified community speed tests and tower distances before you make a decision.",
    }
  ];

  return (
    <section className="section bg-pure-white" style={{ display: 'flex', flexDirection: 'column', padding: '120px 24px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '100px', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Simple Process
          </div>
          <h2 className="text-ink" style={{ fontSize: '56px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '1.1' }}>
            How <span style={{ color: 'var(--color-cyan-signal)' }}>Best-NET</span> Works
          </h2>
        </div>
        
        <div className="grid grid-cols-3" style={{ gap: '0' }}>
          {steps.map((step, i) => (
            <div key={i} className="text-center" style={{ 
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRight: i !== steps.length - 1 ? '1px solid var(--color-stone-border)' : 'none'
            }}>
              <div style={{ marginBottom: '24px' }}>
                {step.icon}
              </div>
              
              <h3 style={{ color: 'var(--color-ink-black)', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px', marginBottom: '16px' }}>
                {step.title}
              </h3>
              
              <p className="text-warm" style={{ lineHeight: '1.6', fontSize: '16px', maxWidth: '300px' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
