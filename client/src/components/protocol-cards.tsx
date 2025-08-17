import TriangularPattern from "./triangular-pattern";
import { processProtocolPayment } from "@/services/payment";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Protocol {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  isActive: boolean;
}

const protocols: Protocol[] = [
  {
    id: "loop",
    title: "BitNest Loop",
    description: "A circulation yield protocol based on the Ethereum Virtual Machine (EVM) enables individuals to provide cryptocurrency liquidity risk-free and earn returns.",
    buttonText: "Join Now",
    isActive: true,
  },
  {
    id: "saving-box",
    title: "Saving Box", 
    description: "A PancakeSwap protocol based on blockchain technology, designed to provide users with safe and efficient savings services.",
    buttonText: "Join Now",
    isActive: true,
  },
  {
    id: "savings",
    title: "BitNest Savings",
    description: "A cryptocurrency savings protocol based on the Binance Smart Chain network, designed to provide users with a secure and efficient savings solution.",
    buttonText: "Coming Soon",
    isActive: false,
  },
  {
    id: "dao",
    title: "BitNest DAO",
    description: "Aimed at achieving a fair distribution of MellionCoin through a presale program, providing sustainable support for the development of BitNest's ecosystem.",
    buttonText: "Coming Soon",
    isActive: false,
  },
];

export default function ProtocolCards() {
  const { toast } = useToast();
  const [processingProtocol, setProcessingProtocol] = useState<string | null>(null);

  const handleJoinProtocol = async (protocol: Protocol) => {
    if (!protocol.isActive) return;
    
    setProcessingProtocol(protocol.id);
    
    try {
      const result = await processProtocolPayment(protocol.id, "demo-user", "100");
      
      if (result.success) {
        toast({
          title: "Success!",
          description: `Successfully joined ${protocol.title}`,
        });
      } else {
        throw new Error(result.message || "Payment processing failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingProtocol(null);
    }
  };

  return (
    <section className="space-y-4 mb-8">
      {/* Full Automation Card */}
      <div className="relative bg-bitnest-gray rounded-2xl p-6 border border-bitnest-green overflow-hidden">
        <TriangularPattern />
        <div className="relative z-10">
          <div className="flex items-center justify-center w-12 h-12 bg-bitnest-gradient rounded-lg mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="text-bitnest-dark"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3" data-testid="full-automation-title">Full Automation</h3>
          <p className="text-bitnest-light-gray mb-4 text-sm leading-relaxed" data-testid="full-automation-description">
            BitNest does not store your assets; all assets are fully stored on the blockchain, with assets automatically moving between participants and contracts.
          </p>
        </div>
      </div>

      {protocols.map((protocol) => (
        <div 
          key={protocol.id}
          className="relative bg-bitnest-gray rounded-2xl p-6 border border-bitnest-green overflow-hidden"
          data-testid={`protocol-card-${protocol.id}`}
        >
          <TriangularPattern />
          <div className="relative z-10">
            <div className="flex items-center justify-center w-12 h-12 bg-bitnest-gradient rounded-lg mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="text-bitnest-dark"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3" data-testid={`protocol-title-${protocol.id}`}>
              {protocol.title}
            </h3>
            <p className="text-bitnest-light-gray mb-6 text-sm leading-relaxed" data-testid={`protocol-description-${protocol.id}`}>
              {protocol.description}
            </p>
            <button 
              onClick={() => handleJoinProtocol(protocol)}
              disabled={!protocol.isActive || processingProtocol === protocol.id}
              className={`w-full font-bold py-3 rounded-xl transition-all duration-300 ${
                protocol.isActive
                  ? "bg-bitnest-gradient text-bitnest-dark hover:shadow-lg transform hover:scale-105"
                  : "bg-bitnest-green bg-opacity-50 text-white cursor-not-allowed"
              }`}
              data-testid={`protocol-button-${protocol.id}`}
            >
              {processingProtocol === protocol.id ? "Processing..." : protocol.buttonText}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
