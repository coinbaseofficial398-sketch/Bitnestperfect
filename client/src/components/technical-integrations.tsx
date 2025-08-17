import { Wallet, ExternalLink, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const integrations = [
  { 
    name: "METAMASK", 
    icon: "🦊",
    url: "https://metamask.io/",
    downloadUrl: "https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn",
    color: "orange-500"
  },
  { 
    name: "TokenPocket", 
    icon: "TP",
    url: "https://tokenpocket.pro/",
    downloadUrl: "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
    color: "blue-600"
  },
  { 
    name: "CoinBase", 
    icon: "○",
    url: "https://wallet.coinbase.com/",
    downloadUrl: "https://apps.apple.com/app/coinbase-wallet/id1278383455",
    color: "blue-600"
  },
];

export default function TechnicalIntegrations() {
  const { toast } = useToast();
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);

  const handleWalletClick = async (integration: typeof integrations[0]) => {
    if (connectedWallets.includes(integration.name)) {
      toast({
        title: `${integration.name} Connected`,
        description: "This wallet is already connected to your BitNest account",
      });
      return;
    }

    toast({
      title: `Connecting ${integration.name}...`,
      description: "Please approve the connection in your wallet",
    });

    try {
      // Create WalletConnect connector
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });

      // Check if connection is already established
      if (!connector.connected) {
        // Create new session
        await connector.createSession();
      }

      // Subscribe to connection events
      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }

        // Get provided accounts and chain
        const { accounts, chainId } = payload.params[0];
        
        setConnectedWallets(prev => [...prev, integration.name]);
        toast({
          title: "Connection Successful!",
          description: `${integration.name} wallet connected to BitNest`,
        });
      });

      connector.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }

        // Get updated accounts and chain
        const { accounts, chainId } = payload.params[0];
      });

      connector.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }

        setConnectedWallets(prev => prev.filter(wallet => wallet !== integration.name));
        toast({
          title: "Wallet Disconnected",
          description: `${integration.name} wallet has been disconnected`,
        });
      });

    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Failed to connect ${integration.name}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleDownload = (integration: typeof integrations[0], e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(integration.downloadUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: `Download ${integration.name}`,
      description: "Redirecting to official download page...",
    });
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-bitnest-gradient mb-4" data-testid="technical-integrations-title">
        Technical Integrations
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {integrations.map((integration, index) => (
          <div 
            key={index}
            onClick={() => handleWalletClick(integration)}
            className="relative flex flex-col items-center p-4 bg-bitnest-gray rounded-xl border border-bitnest-green hover:bg-bitnest-gradient hover:text-bitnest-dark transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            data-testid={`integration-${integration.name.toLowerCase().replace(' ', '-')}`}
          >
            {/* Connected Status Indicator */}
            {connectedWallets.includes(integration.name) && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="text-white" size={12} />
              </div>
            )}
            
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2">
              {integration.name === "METAMASK" ? (
                <Wallet className="text-orange-500" size={24} />
              ) : integration.name === "TokenPocket" ? (
                <span className="text-blue-600 font-bold text-lg">TP</span>
              ) : (
                <div className="w-6 h-6 border-2 border-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs font-medium mb-1">{integration.name}</span>
            
            {/* Download Link */}
            <button
              onClick={(e) => handleDownload(integration, e)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-bitnest-light-gray hover:text-bitnest-green flex items-center space-x-1"
            >
              <ExternalLink size={10} />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
      
      {/* Connection Status */}
      {connectedWallets.length > 0 && (
        <div className="mt-4 p-3 bg-bitnest-dark rounded-xl border border-bitnest-green">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="text-bitnest-green" size={16} />
            <span className="text-sm font-semibold text-bitnest-green">Connected Wallets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {connectedWallets.map((wallet) => (
              <span 
                key={wallet} 
                className="text-xs bg-bitnest-gray px-2 py-1 rounded-lg text-bitnest-light-gray"
              >
                {wallet}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
