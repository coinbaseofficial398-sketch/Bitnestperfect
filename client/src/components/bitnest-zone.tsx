import { Users, MessageCircle, Coins, Handshake, ChevronDown, ExternalLink, Award, TrendingUp, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const navigationItems = [
  { 
    icon: Users, 
    label: "My Team", 
    href: "/team",
    description: "View your referral network and team performance",
    external: false
  },
  { 
    icon: MessageCircle, 
    label: "Community", 
    href: "https://discord.gg/bitnest",
    description: "Join our Discord community",
    external: true
  },
  { 
    icon: Coins, 
    label: "Earn Daily", 
    href: "/earn",
    description: "Daily rewards and staking opportunities",
    external: false
  },
  { 
    icon: Handshake, 
    label: "Partner", 
    href: "/partnership",
    description: "Become a BitNest business partner",
    external: false
  },
];

const moreOptions = [
  { icon: Award, label: "Achievements", href: "/achievements" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Gift, label: "Rewards", href: "/rewards" },
  { icon: ExternalLink, label: "Social Media", href: "https://twitter.com/bitnest" },
];

export default function BitNestZone() {
  const { toast } = useToast();
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleNavigate = (item: typeof navigationItems[0]) => {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      toast({
        title: `Opening ${item.label}`,
        description: item.description,
      });
    } else {
      toast({
        title: item.label,
        description: item.description,
      });
      // In a real app, this would navigate to the respective page
      console.log(`Navigating to ${item.label}: ${item.href}`);
    }
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
    if (!showMoreOptions) {
      toast({
        title: "More Options",
        description: "Additional BitNest features and tools",
      });
    }
  };

  const handleMoreOptionClick = (option: typeof moreOptions[0]) => {
    if (option.href.startsWith('http')) {
      window.open(option.href, '_blank', 'noopener,noreferrer');
      toast({
        title: `Opening ${option.label}`,
        description: "Redirecting to external page...",
      });
    } else {
      toast({
        title: option.label,
        description: "Feature coming soon!",
      });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-bitnest-gradient" data-testid="bitnest-zone-title">
          BitNest Zone
        </h2>
        <button 
          onClick={handleMoreOptions}
          className={`bg-bitnest-green text-bitnest-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-1 ${showMoreOptions ? 'bg-bitnest-lime' : ''}`}
          data-testid="more-button"
        >
          <span>More</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${showMoreOptions ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Hexagonal Navigation Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {navigationItems.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center space-y-2 cursor-pointer group"
            onClick={() => handleNavigate(item)}
            data-testid={`nav-item-${item.label.toLowerCase().replace(' ', '-')}`}
          >
            <div className="w-14 h-14 border-2 border-bitnest-green rounded-lg flex items-center justify-center bg-bitnest-gray hover:bg-bitnest-gradient hover:text-bitnest-dark transition-all duration-300 transform hover:scale-105 relative">
              <item.icon size={20} />
              {item.external && (
                <ExternalLink size={8} className="absolute -top-1 -right-1 text-bitnest-green group-hover:text-bitnest-dark" />
              )}
            </div>
            <span className="text-xs text-center group-hover:text-bitnest-green transition-colors">{item.label}</span>
          </div>
        ))}
      </div>

      {/* More Options Expanded */}
      {showMoreOptions && (
        <div className="bg-bitnest-gray rounded-xl p-4 border border-bitnest-green mb-6 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-2 gap-3">
            {moreOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMoreOptionClick(option)}
                className="flex items-center space-x-3 p-3 bg-bitnest-dark rounded-lg hover:bg-bitnest-green hover:text-bitnest-dark transition-all duration-300 group"
                data-testid={`more-option-${option.label.toLowerCase().replace(' ', '-')}`}
              >
                <option.icon size={16} />
                <span className="text-sm font-medium">{option.label}</span>
                {option.href.startsWith('http') && (
                  <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
