'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function TowerMap({ location, towers }: { location: any; towers: any[] }) {
  // Center map on location or fallback to Dewas, India if mock
  const center: [number, number] = location && location.latitude && location.longitude
    ? [location.latitude, location.longitude]
    : [22.9676, 76.0534]; // Dewas

  // Mock towers if none exist
  const displayTowers = towers && towers.length > 0 ? towers : [
    { id: 1, operator: { name: 'Jio', color: '#0f3cc9' }, latitude: 22.9696, longitude: 76.0554, has_5g: true },
    { id: 2, operator: { name: 'Airtel', color: '#E40000' }, latitude: 22.9656, longitude: 76.0514, has_5g: true },
    { id: 3, operator: { name: 'Vi', color: '#e20000' }, latitude: 22.9706, longitude: 76.0504, has_5g: false },
  ];

  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-stone-border)' }}>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {displayTowers.map((tower, idx) => (
          <Marker key={tower.id || idx} position={[tower.latitude, tower.longitude]}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ color: tower.operator?.color }}>{tower.operator?.name || 'Unknown'} Tower</strong>
                <br />
                {tower.has_5g ? '✅ 5G Active' : '📶 4G Only'}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
