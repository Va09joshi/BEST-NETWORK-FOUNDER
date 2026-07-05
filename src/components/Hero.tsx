"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './Hero.css';
import { Search, MapPin } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';

export default function Hero() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { setLocation, recommendation, setRecommendation, isCalculating, setIsCalculating } = useLocation();

  // Debounce the search query to prevent API rate limiting and lag
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Removed auto-clear search behavior so users don't lose their search history when closing modal

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    
    setIsLoading(true);
    setShowDropdown(true); // Show immediately for the 'Searching...' state
    
    try {
      // Use Nominatim for forward geocoding (limiting to India for relevance)
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in&limit=5`);
      const data = await res.json();
      
      setResults(data.map((item: any) => {
        // Extract a clean city/town name from the display name
        const parts = item.display_name.split(',');
        return {
          id: item.place_id,
          name: parts[0].trim(),
          fullName: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        };
      }));
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = async (loc: any) => {
    if (isCalculating) return; // Prevent duplicate background fetches that cause modal popups
    
    setShowDropdown(false);
    setQuery(loc.name);
    
    // Set location in global context
    const locData = {
      latitude: loc.lat,
      longitude: loc.lon,
      accuracy: 50, // mock accuracy for search
      placeName: loc.name
    };
    setLocation(locData);

    // Trigger the 3D SIM Loader
    setIsCalculating(true);

    // Fetch recommendations for this new location
    try {
      const recRes = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: loc.lat, longitude: loc.lon })
      });
      if (recRes.ok) {
        const recData = await recRes.json();
        setRecommendation(recData);
      }
    } catch (e) {
      console.error("Failed to fetch recommendation", e);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSearchSubmit = () => {
    if (results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let placeName = "Your Exact Location";
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            const addr = geoData.address || {};
            // Prioritize highly local address details like road, neighborhood, or suburb
            const localArea = addr.road || addr.neighbourhood || addr.suburb || addr.village || addr.city || addr.town;
            const region = addr.city || addr.state || addr.country;
            if (localArea && localArea !== region) {
              placeName = `${localArea}, ${region}`.replace(/,\s*$/, '');
            } else if (localArea) {
              placeName = localArea;
            }
          }
        } catch (e) {
          console.error("Reverse geocoding failed", e);
        }

        const locData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          placeName
        };
        
        setLocation(locData);
        setQuery(placeName);
        setIsLocating(false);
        setIsCalculating(true);

        try {
          const recRes = await fetch("/api/recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: locData.latitude, longitude: locData.longitude })
          });
          if (recRes.ok) {
            const recData = await recRes.json();
            setRecommendation(recData);
          }
        } catch (e) {
          console.error("Failed to fetch recommendation", e);
        } finally {
          setIsCalculating(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Unable to retrieve your location. Please check your browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // The typing animation has been removed to keep the layout constant

  return (
    <section className="hero text-center" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'visible', zIndex: 50 }}>
      
      {/* Background Mesh Gradients */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.35), transparent 65%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.35), transparent 65%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(var(--color-stone-border) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.5,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--color-pure-white) 100%)',
        zIndex: 1
      }} />

      <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <h1 className="mb-4" style={{ fontSize: '72px', lineHeight: '1.1', letterSpacing: '-2px', fontWeight: '500', color: 'var(--color-ink-black)', fontFamily: 'var(--font-roobert)', textAlign: 'center' }}>
          Find the <br />
          <span style={{ color: 'var(--color-cyan-signal)' }}>Best Mobile Network</span><br /> 
          for your area
        </h1>
        <p className="text-warm mb-8" style={{ fontSize: '22px', maxWidth: '750px', margin: '24px auto 48px auto', lineHeight: '1.6', textAlign: 'center' }}>
          Compare Jio, Airtel, Vi and BSNL using real performance data, nearby tower locations, and authentic community reports.
        </p>

        <div className="hero-search-wrapper" style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'var(--color-pure-white)',
          padding: '12px 12px 12px 32px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
          border: '1px solid var(--color-stone-border)'
        }}>
          <Search size={32} className="text-cyan" />
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by city, village, or pincode..."
              className="hero-search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              style={{
                fontSize: '22px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                padding: '0 24px',
                color: 'var(--color-ink-black)',
                width: '100%'
              }}
            />

            {/* Search Results Dropdown */}
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 24px)',
                left: '-32px',
                right: '120px', // account for search button width
                backgroundColor: 'var(--color-pure-white)',
                borderRadius: '12px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                border: '1px solid var(--color-stone-border)',
                overflow: 'hidden',
                zIndex: 50,
                textAlign: 'left'
              }}>
                {isLoading ? (
                  <div style={{ padding: '24px', color: 'var(--color-stone-muted)' }}>Searching...</div>
                ) : results.length > 0 ? (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {results.map((loc) => (
                      <li key={loc.id} style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid var(--color-stone-border)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                      }} 
                         onMouseDown={(e) => {
                           e.preventDefault();
                           handleResultClick(loc);
                         }}
                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-stone-canvas)'}
                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <div className="text-ink font-bold" style={{ fontSize: '18px' }}>{loc.name}</div>
                        <div className="text-warm" style={{ fontSize: '14px' }}>{loc.fullName}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ padding: '24px', color: 'var(--color-stone-muted)' }}>No locations found for "{query}"</div>
                )}
              </div>
            )}
          </div>
          
          <button className="btn-primary" style={{ padding: '20px 36px', fontSize: '20px', borderRadius: '8px', fontWeight: '600' }} onClick={handleSearchSubmit}>Search</button>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button 
            onClick={handleUseCurrentLocation}
            className="btn-ghost" 
            disabled={isLocating}
            style={{ backgroundColor: 'var(--color-pure-white)', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '16px', borderRadius: '8px', cursor: isLocating ? 'not-allowed' : 'pointer', opacity: isLocating ? 0.7 : 1 }}
          >
            {isLocating ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                Locating...
              </>
            ) : (
              <>
                <MapPin size={18} className="text-cyan" />
                Use current location
              </>
            )}
          </button>
          
          <button onClick={() => router.push('/analytics')} className="btn-ghost" style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '16px', borderRadius: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            Launch GIS Pro Dashboard
          </button>
        </div>

      </div>
    </section>
  );
}
