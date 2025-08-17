import { Globe, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MobileHeader() {
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Connecting...",
      description: "Select your preferred wallet to connect to BitNest",
    });
    
    setTimeout(() => {
      toast({
        title: "Wallet Connected!",
        description: "Successfully connected to MetaMask wallet",
      });
    }, 1500);
  };

  const handleLanguage = () => {
    toast({
      title: "Language Settings",
      description: "English • 中文 • 日本語 • Español",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "3 new updates • Liquidity increased by 2.5%",
    });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-bitnest-dark relative" data-testid="mobile-header">
      <button 
        onClick={() => window.location.href = '/'}
        className="flex items-center space-x-2 group"
      >
        {/* BitNest Logo with hexagonal design */}
        <div className="w-10 h-10 bg-bitnest-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300" data-testid="bitnest-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="text-bitnest-dark"/>
          </svg>
        </div>
        <span className="text-xl font-bold text-bitnest-gradient group-hover:text-bitnest-lime transition-colors" data-testid="bitnest-title">BITNEST</span>
      </button>
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleLanguage}
          className="hover:bg-bitnest-gray p-2 rounded-lg transition-all duration-300"
          data-testid="globe-button"
        >
          <Globe className="text-bitnest-green text-lg" />
        </button>
        <button 
          onClick={handleNotifications}
          className="hover:bg-bitnest-gray p-2 rounded-lg transition-all duration-300 relative"
          data-testid="bell-button"
        >
          <Bell className="text-bitnest-green text-lg" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>
        <button 
          onClick={handleConnect}
          className="bg-bitnest-gradient px-4 py-2 rounded-full text-sm font-semibold text-bitnest-dark hover:shadow-lg hover:scale-105 transition-all duration-300"
          data-testid="connect-button"
        >
          Connect
        </button>
      </div>
    </header>
  );
}
