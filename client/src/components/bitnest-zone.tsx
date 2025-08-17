import { Users, MessageCircle, Coins, Handshake, ChevronDown } from "lucide-react";

const navigationItems = [
  { icon: Users, label: "My Team" },
  { icon: MessageCircle, label: "Community" },
  { icon: Coins, label: "Earn Daily" },
  { icon: Handshake, label: "Partner" },
];

export default function BitNestZone() {
  const handleNavigate = (label: string) => {
    // In a real app, this would navigate to the respective page
    console.log(`Navigating to ${label}`);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-bitnest-gradient" data-testid="bitnest-zone-title">
          BitNest Zone
        </h2>
        <button 
          className="bg-bitnest-green text-bitnest-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-1"
          data-testid="more-button"
        >
          <span>More</span>
          <ChevronDown size={16} />
        </button>
      </div>
      
      {/* Hexagonal Navigation Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {navigationItems.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => handleNavigate(item.label)}
            data-testid={`nav-item-${item.label.toLowerCase().replace(' ', '-')}`}
          >
            <div className="w-14 h-14 border-2 border-bitnest-green rounded-lg flex items-center justify-center bg-bitnest-gray hover:bg-bitnest-gradient hover:text-bitnest-dark transition-all duration-300 transform hover:scale-105">
              <item.icon size={20} />
            </div>
            <span className="text-xs text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
