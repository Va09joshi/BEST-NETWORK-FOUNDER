import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import StatsGrid from "@/components/StatsGrid";
import NetworkRecommendation from "@/components/NetworkRecommendation";
import ComparisonCards from "@/components/ComparisonCards";
import InteractiveMap from "@/components/InteractiveMap";
import CommunityReports from "@/components/CommunityReports";
import FAQ from "@/components/FAQ";
import FoundersLetter from "@/components/FoundersLetter";

import NetworkLocationDisplay from "@/components/NetworkLocationDisplay";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '160px' }}>
      
      <Hero />
      <NetworkLocationDisplay />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '160px', marginTop: '160px' }}>
        <HowItWorks />
        <StatsGrid />
        <ComparisonCards />
        <InteractiveMap />
        <CommunityReports />
        <FAQ />
        <FoundersLetter />
      </div>

      {/* Fixed Modal */}
      <NetworkRecommendation />
      
    </div>
  );
}
