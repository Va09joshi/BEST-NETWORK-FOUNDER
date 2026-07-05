"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Wifi, Activity, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import dynamic from "next/dynamic";

const RealMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%', backgroundColor: '#e5e3df', position: 'absolute', inset: 0 }}></div>
});

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface NetworkData {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export default function NetworkLocationDisplay() {
  const { location, setLocation, setRecommendation } = useLocation();
  const [network, setNetwork] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Attempt to get network info if supported
    const navConnection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (navConnection) {
      setNetwork({
        type: navConnection.type,
        effectiveType: navConnection.effectiveType,
        downlink: navConnection.downlink,
        rtt: navConnection.rtt,
      });

      const updateConnection = () => {
        setNetwork({
          type: navConnection.type,
          effectiveType: navConnection.effectiveType,
          downlink: navConnection.downlink,
          rtt: navConnection.rtt,
        });
      };
      navConnection.addEventListener('change', updateConnection);
      return () => navConnection.removeEventListener('change', updateConnection);
    }
  }, []);

  const fetchLocationAndSend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let placeName = "Unknown Location";
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            const addr = geoData.address || {};

            // Check for various regional identifiers (useful for places like Dewas which might map to state_district)
            const city = addr.city || addr.town || addr.village || addr.municipality || addr.city_district || addr.state_district || addr.county || addr.suburb || addr.state;

            if (city) {
              placeName = `${city}, ${addr.country || ''}`.replace(/,\s*$/, '');
            }
          }
        } catch (e) {
          // ignore fetch error
        }

        const locData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          placeName,
        };
        setLocation(locData);

        try {
          // Send telemetry
          await fetch("/api/telemetry", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location: locData,
              network,
            }),
          });

          // Fetch Recommendations based on location
          const recRes = await fetch("/api/recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: locData.latitude, longitude: locData.longitude })
          });

          if (!recRes.ok) throw new Error("Failed to get recommendations");

          const recData = await recRes.json();
          setRecommendation(recData);

          setSuccess(true);
        } catch (err: any) {
          setError(err.message || "An error occurred while saving data");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message || "Unable to retrieve your location. Please ensure location permissions are granted.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <section id="diagnostics" className="section" style={{ position: 'relative', minHeight: '90vh', width: '100%', overflow: 'hidden', padding: '64px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Map - Clearly Visible */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <RealMap interactive={false} showMarkers={false} showControls={false} />
      </div>

      <div className="container" style={{ maxWidth: '600px', position: 'relative', zIndex: 10 }}>

        <div style={{ textAlign: 'center', backgroundColor: 'var(--color-pure-white)', padding: '64px 24px', borderRadius: '24px', border: '1px solid var(--color-stone-border)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

          <div style={{ position: 'relative' }}>
            {/* Profile Avatar */}
            <div style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#f0f9ff', border: '6px solid white', boxShadow: '0 12px 24px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>

            {/* Funny SIM Card popping out */}
            <div style={{ position: 'absolute', bottom: '-15px', right: '-30px', width: '70px', height: '95px', backgroundColor: '#fef08a', border: '2px solid #eab308', borderRadius: '10px', borderTopRightRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', boxShadow: '0 12px 24px rgba(0,0,0,0.2)', transform: 'rotate(15deg)', animation: 'funnyBounce 3s infinite ease-in-out' }}>
              {/* Eyes */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', marginTop: '4px' }}>
                <div style={{ width: '8px', height: '12px', backgroundColor: '#854d0e', borderRadius: '100%' }}></div>
                <div style={{ width: '8px', height: '12px', backgroundColor: '#854d0e', borderRadius: '100%' }}></div>
              </div>
              {/* Smile */}
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ marginBottom: '8px' }}>
                <path d="M3 3 Q12 12 21 3" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
              </svg>
              {/* SIM Chip */}
              <div style={{ width: '40px', height: '25px', backgroundColor: '#fbbf24', borderRadius: '4px', border: '1px solid #d97706', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '2px' }}>
                <div style={{ border: '1px solid #d97706' }}></div><div style={{ border: '1px solid #d97706' }}></div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-heading mb-4" style={{ fontSize: '32px' }}>Hi, User!</h2>
            <p className="text-subheading text-warm" style={{ fontSize: '18px' }}>
              Your friendly neighborhood SIM card is ready to find the absolute best network for you!
            </p>
          </div>

          <style>{`
            @keyframes funnyBounce {
              0%, 100% { transform: translateY(0) rotate(15deg) scale(1); }
              50% { transform: translateY(-20px) rotate(25deg) scale(1.1); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
