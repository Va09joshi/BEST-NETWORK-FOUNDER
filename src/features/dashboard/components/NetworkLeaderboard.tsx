import React from 'react';

export default function NetworkLeaderboard({ scores }: { scores: any[] }) {
  // Mock leaderboard if scores are empty
  const displayScores = scores && scores.length > 0 ? scores : [
    { operator: { name: 'Airtel', color: '#E40000' }, avg_speed_mbps: 145, reliability_percentage: 99.9, community_rating: 4.8 },
    { operator: { name: 'Jio', color: '#0f3cc9' }, avg_speed_mbps: 120, reliability_percentage: 99.5, community_rating: 4.6 },
    { operator: { name: 'Vi', color: '#e20000' }, avg_speed_mbps: 65, reliability_percentage: 95.0, community_rating: 4.1 },
    { operator: { name: 'BSNL', color: '#135c9e' }, avg_speed_mbps: 15, reliability_percentage: 85.0, community_rating: 3.5 },
  ];

  // Sort by speed
  const sortedScores = [...displayScores].sort((a, b) => b.avg_speed_mbps - a.avg_speed_mbps);

  return (
    <div style={{
      backgroundColor: 'var(--color-pure-white)',
      borderRadius: '16px',
      border: '1px solid var(--color-stone-border)',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-stone-border)' }}>
        <h3 className="text-ink font-bold" style={{ fontSize: '20px' }}>Top Networks Here</h3>
        <p className="text-warm" style={{ fontSize: '14px', marginTop: '4px' }}>Ranked by aggregate performance</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
        {sortedScores.map((score, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: index === 0 ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
            borderRadius: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: score.operator?.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginRight: '16px'
            }}>
              {index + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-ink font-bold" style={{ fontSize: '18px' }}>{score.operator?.name}</div>
              <div className="text-warm" style={{ fontSize: '13px' }}>{score.reliability_percentage}% Reliable</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="text-ink font-bold" style={{ fontSize: '18px' }}>{score.avg_speed_mbps} <span style={{ fontSize: '12px' }}>Mbps</span></div>
              <div className="text-warm" style={{ fontSize: '13px' }}>★ {score.community_rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
