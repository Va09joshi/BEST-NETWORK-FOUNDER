import React from 'react';
import { User } from 'lucide-react';

const reports = [
  { name: 'Rahul S.', role: 'Resident', rating: 5, text: 'Airtel 5G is incredibly fast here. Consistently getting 200+ Mbps.', time: '2 days ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Priya K.', role: 'Remote Worker', rating: 4, text: 'Jio works well for meetings, but occasionally drops to 4G inside the house.', time: '1 week ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Amit V.', role: 'Student', rating: 2, text: 'Vi struggles with indoor coverage in this sector. Lots of call drops.', time: '2 weeks ago', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
];

export default function CommunityReports() {
  return (
    <section className="section bg-pure-white" style={{ padding: '140px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          


          {/* Right Side: Header and Reports */}
          <div style={{ flex: '1.2' }}>
            <div className="mb-10">
              <h2 className="text-heading mb-4" style={{ textAlign: 'left' }}>Community <span style={{ color: 'var(--color-cyan-signal)' }}>Reports</span></h2>
              <p className="text-warm text-subheading" style={{ textAlign: 'left', maxWidth: '500px' }}>Real, unfiltered feedback from users right in your area.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {reports.map((report, i) => (
                <div key={i} style={{ padding: '32px 0', borderBottom: i === reports.length - 1 ? 'none' : '1px solid var(--color-stone-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img 
                        src={report.avatar} 
                        alt={report.name} 
                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-stone-border)' }} 
                      />
                      <div style={{ lineHeight: '1.4' }}>
                        <div className="text-ink font-semibold" style={{ fontSize: '18px' }}>{report.name}</div>
                        <div className="text-warm" style={{ fontSize: '15px' }}>{report.role}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', lineHeight: '1.4' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end', marginBottom: '4px' }}>
                        {[...Array(5)].map((_, idx) => (
                          <span key={idx} style={{ color: idx < report.rating ? '#F59E0B' : 'var(--color-stone-border)', fontSize: '16px' }}>★</span>
                        ))}
                      </div>
                      <span className="text-warm" style={{ fontSize: '14px' }}>{report.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-ink" style={{ fontSize: '18px', lineHeight: '1.6' }}>{report.text}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
