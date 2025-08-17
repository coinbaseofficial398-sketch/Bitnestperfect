import { Wallet } from "lucide-react";

const integrations = [
  { name: "METAMASK", icon: "🦊" },
  { name: "TokenPocket", icon: "TP" },
  { name: "CoinBase", icon: "○" },
];

export default function TechnicalIntegrations() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-bitnest-gradient mb-4" data-testid="technical-integrations-title">
        Technical Integrations
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {integrations.map((integration, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-4 bg-bitnest-gray rounded-xl border border-bitnest-green hover:bg-bitnest-gradient hover:text-bitnest-dark transition-all duration-300 transform hover:scale-105 cursor-pointer"
            data-testid={`integration-${integration.name.toLowerCase().replace(' ', '-')}`}
          >
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2">
              {integration.name === "METAMASK" ? (
                <Wallet className="text-orange-500" size={24} />
              ) : integration.name === "TokenPocket" ? (
                <span className="text-blue-600 font-bold text-lg">TP</span>
              ) : (
                <div className="w-6 h-6 border-2 border-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs font-medium">{integration.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
