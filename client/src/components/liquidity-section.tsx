import { Copy } from "lucide-react";
import { useLiquidity } from "@/hooks/use-liquidity";
import { useToast } from "@/hooks/use-toast";

export default function LiquiditySection() {
  const { data: liquidity } = useLiquidity();
  const { toast } = useToast();

  const handleInviteFriends = async () => {
    try {
      const response = await fetch("/api/referral/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "demo-user" }), // In real app, get from auth
      });
      
      if (response.ok) {
        const { referralLink } = await response.json();
        await navigator.clipboard.writeText(referralLink);
        
        toast({
          title: "Success!",
          description: "Referral link copied to clipboard",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate referral link",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-6 text-center">
      {/* Clickable Liquidity Display */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bitnest-green to-transparent h-px animate-pulse"></div>
        <button 
          onClick={() => window.open('/liquidity-details', '_blank')}
          className="group transition-all duration-300 hover:scale-105"
          data-testid="liquidity-clickable"
        >
          <h2 className="text-4xl font-bold text-bitnest-green mb-2 group-hover:text-bitnest-lime transition-colors" data-testid="liquidity-amount">
            {liquidity ? parseInt(liquidity.totalLiquidity).toLocaleString() : "41,597,642"}
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-1">
            <p className="text-bitnest-green font-medium group-hover:text-bitnest-lime transition-colors" data-testid="liquidity-label">LIQUIDITY</p>
            {liquidity?.isLive && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">LIVE</span>
              </div>
            )}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-bitnest-light-gray mt-1">
            {liquidity?.isLive 
              ? `Live from wallet: ${liquidity.walletAddress?.slice(0, 6)}...${liquidity.walletAddress?.slice(-4)}`
              : "Click to view details"
            }
          </div>
        </button>
      </div>
      
      <div className="mb-6">
        <span className="text-bitnest-gradient text-2xl font-bold" data-testid="number-one">№1</span>
        <h1 className="text-xl font-semibold mt-2 leading-tight" data-testid="main-heading">
          Join BitNest to create a new<br />
          Web 3.0 economy financial system
        </h1>
      </div>

      {/* Invite Friends Button */}
      <button 
        onClick={handleInviteFriends}
        className="w-full bg-bitnest-gradient text-bitnest-dark font-bold py-4 rounded-2xl mb-6 flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        data-testid="invite-friends-button"
      >
        <span>Invite Friends</span>
        <Copy size={16} />
      </button>
    </section>
  );
}
