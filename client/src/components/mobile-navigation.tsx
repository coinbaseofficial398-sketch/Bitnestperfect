import { ChevronLeft, ChevronRight, Share, Bookmark, Copy, Info, Lock, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MobileNavigation() {
  const { toast } = useToast();

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      toast({
        title: "Navigation",
        description: "No previous page in history",
      });
    }
  };

  const handleForward = () => {
    window.history.forward();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BitNest Finance - Web 3.0 DeFi Platform',
          text: 'Join BitNest to create a new Web 3.0 economy financial system',
          url: window.location.href,
        });
      } catch (error) {
        await handleCopyUrl();
      }
    } else {
      await handleCopyUrl();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "URL Copied!",
        description: "BitNest Finance URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy URL to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmark Added",
      description: "BitNest Finance added to your browser bookmarks",
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bitnest-darker border-t border-bitnest-green z-50">
      <div className="flex justify-center items-center py-2">
        <div className="bg-bitnest-gray px-6 py-2 rounded-full flex items-center space-x-2" data-testid="address-bar">
          <span className="text-xs text-bitnest-green">AA</span>
          <Info className="text-blue-500" size={16} />
          <Lock className="text-bitnest-green" size={16} />
          <span className="text-xs">bitnest.finance</span>
          <button 
            onClick={handleRefresh}
            className="hover:text-bitnest-lime transition-colors"
          >
            <RefreshCw className="text-bitnest-green" size={16} />
          </button>
        </div>
      </div>
      <div className="flex justify-around py-2">
        <button 
          onClick={handleBack}
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-back"
        >
          <ChevronLeft className="text-bitnest-green" size={20} />
        </button>
        <button 
          onClick={handleForward}
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-forward"
        >
          <ChevronRight className="text-bitnest-green" size={20} />
        </button>
        <button 
          onClick={handleShare}
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-share"
        >
          <Share className="text-blue-500" size={20} />
        </button>
        <button 
          onClick={handleBookmark}
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-bookmark"
        >
          <Bookmark className="text-blue-500" size={20} />
        </button>
        <button 
          onClick={handleCopyUrl}
          className="flex flex-col items-center p-2 hover:bg-bitnest-gray rounded-lg transition-all duration-300"
          data-testid="nav-copy"
        >
          <Copy className="text-blue-500" size={20} />
        </button>
      </div>
    </div>
  );
}
