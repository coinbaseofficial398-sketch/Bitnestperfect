import { ChevronLeft, ChevronRight, Share, Bookmark, Copy, Info, Lock, RefreshCw } from "lucide-react";

export default function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bitnest-darker border-t border-bitnest-green">
      <div className="flex justify-center items-center py-2">
        <div className="bg-bitnest-gray px-6 py-2 rounded-full flex items-center space-x-2" data-testid="address-bar">
          <span className="text-xs text-bitnest-green">AA</span>
          <Info className="text-blue-500" size={16} />
          <Lock className="text-bitnest-green" size={16} />
          <span className="text-xs">bitnest.finance</span>
          <RefreshCw className="text-bitnest-green" size={16} />
        </div>
      </div>
      <div className="flex justify-around py-2">
        <button 
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-back"
        >
          <ChevronLeft className="text-bitnest-green" size={20} />
        </button>
        <button 
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-forward"
        >
          <ChevronRight className="text-bitnest-green" size={20} />
        </button>
        <button 
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-share"
        >
          <Share className="text-blue-500" size={20} />
        </button>
        <button 
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-bookmark"
        >
          <Bookmark className="text-blue-500" size={20} />
        </button>
        <button 
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-copy"
        >
          <Copy className="text-blue-500" size={20} />
        </button>
      </div>
    </div>
  );
}
