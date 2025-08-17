import MobileHeader from "@/components/mobile-header";
import LiquiditySection from "@/components/liquidity-section";
import BitNestZone from "@/components/bitnest-zone";
import ProtocolCards from "@/components/protocol-cards";
import TechnicalIntegrations from "@/components/technical-integrations";
import AboutSection from "@/components/about-section";
import ROICalculator from "@/components/roi-calculator";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-bitnest-dark text-white min-h-screen">
      <MobileHeader />
      
      <main className="px-4 pb-8">
        <LiquiditySection />
        <BitNestZone />
        <ProtocolCards />
        <ROICalculator />
        <TechnicalIntegrations />
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
