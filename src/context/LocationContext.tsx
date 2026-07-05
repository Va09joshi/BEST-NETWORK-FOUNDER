"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  placeName?: string;
}

interface Tower {
  id: string;
  provider: string;
  lat: number;
  lng: number;
  type: string; // "5G" or "4G"
  range: number; // in meters
  strength: number; // signal strength index 1-100
}

interface RecommendationData {
  bestProvider: string;
  avgDownload: number;
  avgUpload: number;
  latency: number;
  towers: Tower[];
}

interface LocationContextType {
  location: LocationData | null;
  setLocation: (loc: LocationData | null) => void;
  recommendation: RecommendationData | null;
  setRecommendation: (rec: RecommendationData | null) => void;
  isCalculating: boolean;
  setIsCalculating: (val: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  return (
    <LocationContext.Provider value={{ location, setLocation, recommendation, setRecommendation, isCalculating, setIsCalculating }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
