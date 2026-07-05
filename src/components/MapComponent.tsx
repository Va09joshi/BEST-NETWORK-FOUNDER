"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from '@/context/LocationContext';

// Fix Leaflet marker icons issue in React/Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map flying to the user location
function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

// Component to trigger recalculations when dragging/zooming the map
function MapEventHandler({ setRecommendation }: { setRecommendation: any }) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();

      // Debounce the API call by 1 second to prevent rate limiting
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        try {
          const recRes = await fetch("/api/recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: center.lat, longitude: center.lng })
          });
          if (recRes.ok) {
            const recData = await recRes.json();
            setRecommendation(recData); // Triggers UI update everywhere
          }
        } catch (error) {
          console.warn("Dynamic map recommendation failed", error);
        }
      }, 1000);
    }
  });

  return null;
}

export default function MapComponent({
  interactive = true,
  showMarkers = true,
  showControls = true
}: {
  interactive?: boolean;
  showMarkers?: boolean;
  showControls?: boolean;
} = {}) {
  const { location, recommendation, setRecommendation } = useLocation();

  const getProviderColor = (provider: string) => {
    if (provider === 'Airtel') return '#ef4444'; // Red
    if (provider === 'Jio') return '#3b82f6'; // Blue
    if (provider === 'Vi') return '#eab308'; // Yellow
    if (provider === 'BSNL') return '#0ea5e9'; // Cyan
    return '#22c55e'; // Green default
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }} className={showControls ? '' : 'hide-map-controls'}>
      {!showControls && (
        <style>{`
          .hide-map-controls .leaflet-control-container {
            display: none !important;
          }
        `}</style>
      )}
      <MapContainer
        key={showControls ? 'interactive-map-v2' : 'background-map-v2'}
        center={[20.5937, 78.9629]} // Center of India
        zoom={6}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={true} // MUST be true for TileLayer not to crash
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        boxZoom={interactive}
        keyboard={interactive}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {location && <MapUpdater center={[location.latitude, location.longitude]} />}

        {/* Listen to map dragging to dynamically update the network recommendation */}
        {interactive && <MapEventHandler setRecommendation={setRecommendation} />}

        {/* Draw the user location if available */}
        {location && showMarkers && (
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Draw dynamic towers if available, otherwise show defaults */}
        {recommendation && recommendation.towers ? (
          recommendation.towers.map((tower: any, idx: number) => {
            const opColor = getProviderColor(tower.operator || tower.provider); // fallback for older structure

            const customIcon = L.divIcon({
              className: 'custom-operator-marker',
              html: `<div style="background-color: ${opColor}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.4);"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });

            return (
              <React.Fragment key={idx}>
                {showMarkers && (
                  <Marker position={[tower.lat, tower.lng]} icon={customIcon}>
                    <Popup><b>{tower.operator || tower.provider}</b> Tower<br />{tower.technology || tower.type || '4G/5G'}</Popup>
                  </Marker>
                )}
                <Circle
                  center={[tower.lat, tower.lng]}
                  radius={tower.range || 1000}
                  pathOptions={{
                    fillColor: opColor,
                    color: opColor,
                    weight: 1,
                    opacity: 0.3,
                    fillOpacity: 0.1
                  }}
                />
              </React.Fragment>
            );
          })
        ) : (
          showMarkers && (
            <>
              <Marker position={[19.0760, 72.8777]}>
                <Popup>Mumbai<br />Excellent 5G Coverage</Popup>
              </Marker>
              <Marker position={[28.7041, 77.1025]}>
                <Popup>Delhi<br />Good 5G Coverage</Popup>
              </Marker>
              <Marker position={[12.9716, 77.5946]}>
                <Popup>Bangalore<br />Excellent 5G Coverage</Popup>
              </Marker>
            </>
          )
        )}

      </MapContainer>
    </div>
  );
}
