"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from '@/context/LocationContext';
import { GISLayerType } from './Sidebar';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

interface GISMapProps {
  layerType: GISLayerType;
}

export default function GISMap({ layerType }: GISMapProps) {
  const { location, recommendation } = useLocation();
  const [geoData, setGeoData] = useState<any>(null);
  
  // We will fetch simulated realistic data whenever the layer changes
  useEffect(() => {
    async function fetchLayerData() {
      try {
        const lat = location?.latitude || 20.5937;
        const lng = location?.longitude || 78.9629;
        
        // This hits our new simulation API
        const res = await fetch(`/api/gis?layer=${layerType}&lat=${lat}&lng=${lng}`);
        const data = await res.json();
        setGeoData(data);
      } catch (err) {
        console.error("Failed to fetch GIS data", err);
      }
    }
    fetchLayerData();
  }, [layerType, location]);

  const defaultCenter: [number, number] = location ? [location.latitude, location.longitude] : [20.5937, 78.9629];

  // Helper renderers for different modes
  const renderDeadZones = () => {
    if (!geoData?.zones) return null;
    return geoData.zones.map((zone: any, i: number) => (
      <Circle key={i} center={[zone.lat, zone.lng]} radius={zone.radius} pathOptions={{ fillColor: '#ef4444', color: '#ef4444', fillOpacity: 0.4, weight: 0 }}>
        <Popup><b>Dead Zone</b><br/>Signal Strength: &lt; 10%<br/>Users Affected: {zone.affected}</Popup>
      </Circle>
    ));
  };

  const renderSmartTowers = () => {
    if (!geoData?.suggestions) return null;
    return geoData.suggestions.map((pt: any, i: number) => (
      <Circle key={i} center={[pt.lat, pt.lng]} radius={300} pathOptions={{ fillColor: '#10b981', color: '#059669', weight: 2, dashArray: '5, 5' }}>
        <Popup><b>AI Recommended Tower Location</b><br/>Est. ROI: High<br/>Population Covered: {pt.population}</Popup>
      </Circle>
    ));
  };

  const renderRoads = () => {
    if (!geoData?.routes) return null;
    return geoData.routes.map((route: any, i: number) => (
      <Polyline key={i} positions={route.path} pathOptions={{ color: route.quality === 'good' ? '#22c55e' : '#ef4444', weight: 4 }}>
        <Popup><b>Route Quality:</b> {route.quality.toUpperCase()}<br/>Highway Section</Popup>
      </Polyline>
    ));
  };

  const renderEmergency = () => {
    if (!geoData?.criticalSites || !geoData?.userLat) return null;
    return geoData.criticalSites.map((site: any, i: number) => {
      const isNearest = site.signalStatus === 'Excellent'; // Based on our mock data logic
      
      return (
        <React.Fragment key={i}>
          <Marker position={[site.lat, site.lng]} icon={L.divIcon({ className: 'custom-operator-marker', html: `<div style="background-color: ${isNearest ? '#10b981' : '#dc2626'}; width: 24px; height: 24px; border-radius: 4px; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">${isNearest ? '✓' : '+'}</div>`, iconSize: [24, 24] })}>
            <Popup><b>{site.name}</b><br/>Emergency Signal: {site.signalStatus}</Popup>
          </Marker>
          {isNearest && (
            <Polyline positions={[[geoData.userLat, geoData.userLng], [site.lat, site.lng]]} pathOptions={{ color: '#10b981', weight: 4, dashArray: '8, 8' }} />
          )}
        </React.Fragment>
      );
    });
  };

  const renderVillages = () => {
    if (!geoData?.villages) return null;
    return geoData.villages.map((vil: any, i: number) => (
      <Circle key={i} center={[vil.lat, vil.lng]} radius={600} pathOptions={{ fillColor: vil.connectivity === 'Disconnected' ? '#991b1b' : '#ca8a04', color: '#fcd34d', fillOpacity: 0.6, weight: 2 }}>
        <Popup><b>Rural Village</b><br/>Pop: {vil.population}<br/>Status: {vil.connectivity}</Popup>
      </Circle>
    ));
  };

  const renderLiveHeatmap = () => {
    if (!geoData?.heatmapPoints) return null;
    return geoData.heatmapPoints.map((pt: any, i: number) => (
      <Circle key={i} center={[pt.lat, pt.lng]} radius={150} pathOptions={{ fillColor: pt.status === 'Strong' ? '#22c55e' : pt.status === 'Weak' ? '#eab308' : '#ef4444', color: 'transparent', fillOpacity: 0.5 }}>
        <Popup>Signal: {pt.status}</Popup>
      </Circle>
    ));
  };

  const renderWeatherImpact = () => {
    return (
      <>
        <style>{`
          .weather-icon-marker {
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 2px solid #3b82f6;
          }
        `}</style>
        {geoData.weatherZones.map((zone: any, i: number) => {
          const isHeavy = zone.type === 'Heavy Rain';
          return (
            <React.Fragment key={i}>
              <Marker 
                position={[zone.lat, zone.lng]} 
                icon={L.divIcon({ 
                  className: 'weather-icon-marker', 
                  html: isHeavy ? '🌧️' : '⛈️',
                  iconSize: [40, 40],
                  iconAnchor: [20, 20]
                })}
              >
                <Popup><b>{zone.type}</b><br/>Est. Signal Drop: {zone.degradation}</Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const renderSpeedRanking = () => {
    // For speed ranking, we don't necessarily need a specific map layer since it's dashboard data,
    // but we can render some generic "speed test server" hubs for flavor.
    if (!geoData?.rankings) return null;
    return (
      <Marker position={defaultCenter} icon={L.divIcon({ className: 'custom-operator-marker', html: `<div style="background-color: #8b5cf6; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>`, iconSize: [40, 40] })}>
        <Popup><b>Speed Test Hub</b><br/>Aggregating local data...</Popup>
      </Marker>
    );
  };

  const render5GReadiness = () => {
    if (!geoData?.hexGrid) return null;
    return geoData.hexGrid.map((hex: any, i: number) => {
      // Simulate an octagon/hexagon shape with a polygon
      const lat = hex.lat;
      const lng = hex.lng;
      const d = 0.005;
      const path = [
        [lat + d, lng], [lat + d/2, lng + d], [lat - d/2, lng + d],
        [lat - d, lng], [lat - d/2, lng - d], [lat + d/2, lng - d]
      ] as [number, number][];
      
      return (
        <Polygon key={i} positions={path} pathOptions={{ fillColor: hex.readinessScore > 0.7 ? '#8b5cf6' : '#a78bfa', color: '#6d28d9', weight: 1, fillOpacity: 0.4 }}>
          <Popup><b>5G Readiness Score:</b> {(hex.readinessScore * 100).toFixed(0)}%</Popup>
        </Polygon>
      );
    });
  };

  const renderDigitalDivide = () => {
    if (!geoData?.zones) return null;
    return geoData.zones.map((zone: any, i: number) => (
      <Circle key={i} center={[zone.lat, zone.lng]} radius={zone.radius} pathOptions={{ fillColor: zone.density > 0.6 && zone.towers < 2 ? '#b91c1c' : '#0369a1', color: 'transparent', fillOpacity: 0.5 }}>
        <Popup><b>Demographic Zone</b><br/>Population Density: {(zone.density * 100).toFixed(0)}%<br/>Towers: {zone.towers}</Popup>
      </Circle>
    ));
  };

  const renderTowerGaps = () => {
    if (!geoData?.suggestions) return null; // using suggestions logic for gaps
    return geoData.suggestions.map((pt: any, i: number) => (
      <Circle key={i} center={[pt.lat, pt.lng]} radius={800} pathOptions={{ fillColor: '#f97316', color: '#ea580c', weight: 2, fillOpacity: 0.3, dashArray: '4,4' }}>
        <Popup><b>Coverage Gap Detected</b><br/>Pop without service: {pt.population}</Popup>
      </Circle>
    ));
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }}>
      <MapContainer 
        center={defaultCenter}
        zoom={location ? 13 : 5} 
        scrollWheelZoom={true} 
        zoomControl={true}
        attributionControl={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={layerType === 'dead_zones' || (layerType as string) === 'crowdsourced' 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode for heatmaps
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"}
        />
        
        {location && <MapUpdater center={[location.latitude, location.longitude]} />}
        
        {/* Render specific overlay layers based on active tab */}
        {(layerType as string) === 'dead_zones' && renderDeadZones()}
        {(layerType as string) === 'smart_tower' && renderSmartTowers()}
        {(layerType as string) === 'roads' && renderRoads()}
        {(layerType as string) === 'emergency' && renderEmergency()}
        {(layerType as string) === 'villages' && renderVillages()}
        {(layerType as string) === 'live_heatmap' && renderLiveHeatmap()}
        {(layerType as string) === 'weather_impact' && renderWeatherImpact()}
        {(layerType as string) === 'speed_ranking' && renderSpeedRanking()}
        {(layerType as string) === '5g_readiness' && render5GReadiness()}
        {(layerType as string) === 'digital_divide' && renderDigitalDivide()}
        {(layerType as string) === 'tower_gaps' && renderTowerGaps()}
        
        {/* Render base towers if in Best SIM mode */}
        {(layerType as string) === 'best_sim' && geoData?.realTowers && (
          geoData.realTowers.map((tower: any, idx: number) => {
            const getProviderColor = (p: string) => {
              if (p.includes('Airtel')) return '#ef4444';
              if (p.includes('Jio')) return '#3b82f6';
              if (p.includes('Vi') || p.includes('Vodafone')) return '#eab308';
              if (p.includes('BSNL')) return '#0ea5e9';
              return '#22c55e'; // default
            };
            
            const getProviderGradient = (p: string) => {
              if (p.includes('Airtel')) return 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)';
              if (p.includes('Jio')) return 'linear-gradient(135deg, #0f3cc9 0%, #0a257a 100%)';
              if (p.includes('Vi') || p.includes('Vodafone')) return 'linear-gradient(135deg, #ed1b24 0%, #b2141b 100%)';
              if (p.includes('BSNL')) return 'linear-gradient(135deg, #1e3a8a 0%, #172a6b 100%)';
              return 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            };
            
            const opColor = getProviderColor(tower.operator || 'Unknown');
            const opGradient = getProviderGradient(tower.operator || 'Unknown');
            
            const customIcon = L.divIcon({
              className: 'custom-operator-marker',
              html: `<div style="width: 24px; height: 36px; background: ${opGradient}; border-radius: 3px; clip-path: polygon(0 0, 70% 0, 100% 15%, 100% 100%, 0 100%); display: flex; flex-direction: column; align-items: center; padding: 4px 2px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
                       <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                         <span style="color: white; font-weight: 800; font-size: 6px; letter-spacing: -0.2px; transform: rotate(-90deg); display: block;">
                           ${tower.operator.substring(0, 3).toUpperCase()}
                         </span>
                       </div>
                       <div style="width: 16px; height: 12px; background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%); border-radius: 2px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 1px; padding: 1px; border: 1px solid #92400e; box-sizing: border-box;">
                         <div style="border: 1px solid #b45309; background: #facc15;"></div>
                         <div style="border: 1px solid #b45309; background: #facc15; grid-row: span 2;"></div>
                         <div style="border: 1px solid #b45309; background: #facc15;"></div>
                         <div style="border: 1px solid #b45309; background: #facc15;"></div>
                         <div style="border: 1px solid #b45309; background: #facc15;"></div>
                       </div>
                     </div>`,
              iconSize: [24, 36],
              iconAnchor: [12, 18],
            });

            return (
              <React.Fragment key={idx}>
                <Marker position={[tower.lat, tower.lng]} icon={customIcon}>
                  <Popup><b>{tower.operator} Tower</b><br/>Tech: {tower.technology}<br/>OSM ID: {tower.id}</Popup>
                </Marker>
                <Circle
                  center={[tower.lat, tower.lng]}
                  radius={400}
                  pathOptions={{ 
                    fillColor: opColor, 
                    color: opColor,
                    weight: 1, opacity: 0.5, fillOpacity: 0.1 
                  }}
                />
              </React.Fragment>
            );
          })
        )}

      </MapContainer>
      
      {/* Dynamic Map Legend Overlay */}
      {layerType === 'best_sim' && (
        <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stone-muted)', marginBottom: '12px', letterSpacing: '0.5px' }}>Provider Legend</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}/> <span style={{ fontSize: '13px', fontWeight: '600' }}>Airtel</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}/> <span style={{ fontSize: '13px', fontWeight: '600' }}>Jio</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}/> <span style={{ fontSize: '13px', fontWeight: '600' }}>Vi</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0ea5e9' }}/> <span style={{ fontSize: '13px', fontWeight: '600' }}>BSNL</span></div>
          </div>
        </div>
      )}

    </div>
  );
}
