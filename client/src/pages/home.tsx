import { useEffect, Suspense, lazy } from "react";
import { useLocation } from "wouter";
import MobileHeader from "@/components/mobile-header";
import LiquiditySection from "@/components/liquidity-section";
import ProtocolCards from "@/components/protocol-cards";
import AboutSection from "@/components/about-section";
import TechnicalIntegrations from "@/components/technical-integrations";
import Footer from "@/components/footer";
import TriangularPattern from "@/components/triangular-pattern";
import BitNestZone from "@/components/bitnest-zone";
import MobileNavigation from "@/components/mobile-navigation";
import ROICalculator from "@/components/roi-calculator";
import { useMobile } from "@/hooks/use-mobile";

// Lazy load heavy components for better performance
const LazyBitNestZone = lazy(() => import("@/components/bitnest-zone"));
const LazyTechnicalIntegrations = lazy(() => import("@/components/technical-integrations"));

export default function Home() {
  return (
    <div className="bg-bitnest-dark text-white min-h-screen">
      <MobileHeader />

      <main className="px-4 pb-8">
        <LiquiditySection />
        <Suspense fallback={<div className="h-96 animate-pulse bg-bitnest-medium-gray/20 rounded-lg"></div>}>
          <LazyBitNestZone />
        </Suspense>
        <ProtocolCards />
        <ROICalculator />
        <Suspense fallback={<div className="h-64 animate-pulse bg-bitnest-medium-gray/20 rounded-lg"></div>}>
          <LazyTechnicalIntegrations />
        </Suspense>
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}