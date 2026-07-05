"use client";

import React, { useState } from 'react';

const faqData = [
  {
    question: "How accurate is the network recommendation?",
    answer: "Our recommendations are highly accurate. We combine live cell tower data from OpenCelliD with real-world, crowdsourced speed tests and signal propagation algorithms to determine the objectively best network for your exact coordinates."
  },
  {
    question: "Why is my suggested network different from my current one?",
    answer: "Your current network might have great marketing, but poor tower placement in your specific neighborhood. Our algorithm analyzes the exact distance, frequency bands (4G/5G), and physical interference between your location and the nearest cell towers to find the true winner."
  },
  {
    question: "How frequently is the coverage data updated?",
    answer: "The GIS Dashboard and telemetry data are updated in real-time. We continuously ingest new cell tower deployments, 5G rollouts, and crowdsourced performance reports to ensure you have the most up-to-date intelligence."
  },
  {
    question: "Is this service completely free to use?",
    answer: "Yes! Best-NET is built on the philosophy that reliable connectivity is a fundamental right. Our consumer search tools and basic GIS dashboards are completely free to use without any hidden fees."
  },
  {
    question: "Does the network finder work in rural areas or villages?",
    answer: "Absolutely. We have a dedicated 'Village Connectivity' module in our GIS Dashboard specifically designed to track underserved areas and identify which providers are actually delivering on their rural coverage promises."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="section" style={{ padding: '64px 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--color-ink-black)', letterSpacing: '-1px', marginBottom: '16px', fontFamily: 'var(--font-roobert)' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--color-ash-gray)', lineHeight: '1.6' }}>
            Everything you need to know about how Best-NET finds your perfect network.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: '#ffffff',
                  border: isOpen ? '1px solid #d1d5db' : '1px solid #e5e7eb',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? '0 12px 32px rgba(0, 0, 0, 0.06)' : '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  style={{ 
                    width: '100%', 
                    padding: '24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: isOpen ? '700' : '600', color: isOpen ? '#111827' : '#374151', paddingRight: '24px' }}>
                    {faq.question}
                  </span>
                  
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '16px', 
                    backgroundColor: isOpen ? '#f3f4f6' : '#f9fafb', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#111827' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </button>
                
                <div style={{ 
                  maxHeight: isOpen ? '300px' : '0px', 
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: isOpen ? '0 24px 24px 24px' : '0 24px',
                }}>
                  <p style={{ margin: 0, fontSize: '16px', color: '#4b5563', lineHeight: '1.7' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
