import { Globe, Bell } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="flex justify-between items-center p-4 bg-bitnest-dark relative" data-testid="mobile-header">
      <div className="flex items-center space-x-2">
        {/* BitNest Logo with hexagonal design */}
        <div className="w-10 h-10 bg-bitnest-gradient rounded-lg flex items-center justify-center" data-testid="bitnest-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="text-bitnest-dark"/>
          </svg>
        </div>
        <span className="text-xl font-bold text-bitnest-gradient" data-testid="bitnest-title">BITNEST</span>
      </div>
      <div className="flex items-center space-x-3">
        <Globe className="text-bitnest-green text-lg" data-testid="globe-icon" />
        <Bell className="text-bitnest-green text-lg" data-testid="bell-icon" />
        <button 
          className="bg-bitnest-gradient px-4 py-2 rounded-full text-sm font-semibold text-bitnest-dark hover:shadow-lg transition-all duration-300"
          data-testid="connect-button"
        >
          Connect
        </button>
      </div>
    </header>
  );
}
