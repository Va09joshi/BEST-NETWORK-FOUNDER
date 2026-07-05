'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import QuickStats from '../../features/dashboard/components/QuickStats';
import NetworkLeaderboard from '../../features/dashboard/components/NetworkLeaderboard';
import AIScoreBreakdown from '../../features/dashboard/components/AIScoreBreakdown';
import ComparisonCards from '../../components/ComparisonCards';

const TowerMap = dynamic(() => import('../../features/dashboard/components/TowerMap'), {
  ssr: false,
  loading: () => <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-stone-canvas)', borderRadius: '16px' }}>Loading Map...</div>
});

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('location_id');

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationId) return;

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`/api/dashboard?location_id=${locationId}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [locationId]);

  return (
    <main style={{ minHeight: '100vh', padding: '100px 24px 60px 24px', backgroundColor: 'var(--color-stone-canvas)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', backgroundColor: 'var(--color-pure-white)', borderRadius: '24px', border: '1px solid var(--color-stone-border)', fontSize: '14px', fontWeight: '500', color: 'var(--color-ink-black)', marginBottom: '16px' }}>
              📍 {data?.location?.city || 'Dewas'}, {data?.location?.state || 'Madhya Pradesh'}
            </div>
            <h1 className="text-ink mb-4" style={{ 
              fontSize: '48px', 
              fontFamily: 'var(--font-roobert)', 
              fontWeight: '600',
              letterSpacing: '-1px'
            }}>
              Location <span style={{ color: 'var(--color-cyan-signal)' }}>Intelligence</span>
            </h1>
            <p className="text-warm" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive AI-driven analysis of mobile network performance, tower density, and community reports in your area.
            </p>
          </div>

          {!locationId && (
            <p className="text-warm mb-8 text-center">No location selected. Please go back and search for a location.</p>
          )}

          {loading && locationId ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-stone-muted)' }}>
              Loading aggregated network data...
            </div>
          ) : (
            <div>
              <QuickStats data={data} />
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: '24px',
                marginBottom: '48px'
              }}>
                <TowerMap location={data?.location} towers={data?.towers} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <NetworkLeaderboard scores={data?.scores} />
                  <AIScoreBreakdown />
                </div>
              </div>

              <div style={{ marginTop: '64px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <h2 className="text-ink" style={{ fontSize: '32px', fontFamily: 'var(--font-roobert)', fontWeight: '500', letterSpacing: '-0.5px' }}>
                    Deep Dive Comparison
                  </h2>
                  <p className="text-warm" style={{ fontSize: '16px', marginTop: '8px' }}>
                    A detailed side-by-side technical breakdown of each operator in this area.
                  </p>
                </div>
                <ComparisonCards />
              </div>
            </div>
          )}
        </div>
    </main>
  );
}
