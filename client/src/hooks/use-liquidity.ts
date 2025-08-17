import { useQuery } from "@tanstack/react-query";
import type { LiquidityStats } from "@shared/schema";

interface BlockchainLiquidity {
  walletAddress: string;
  ethBalance: string;
  totalValue: string;
  lastUpdated: string;
  tokenBalances: Array<{
    symbol: string;
    balance: string;
    value: string;
  }>;
}

export function useLiquidity() {
  // Try to fetch live blockchain data first
  const blockchainQuery = useQuery<BlockchainLiquidity>({
    queryKey: ["/api/blockchain/liquidity"],
    refetchInterval: 15000, // Update every 15 seconds for live data
    retry: 2,
  });

  // Fallback to local data if blockchain fails
  const localQuery = useQuery<LiquidityStats>({
    queryKey: ["/api/liquidity"],
    refetchInterval: 5000,
    enabled: !!blockchainQuery.error,
  });

  // Return live data if available, otherwise fallback
  const data = blockchainQuery.data 
    ? {
        id: 'live-blockchain-data',
        totalLiquidity: blockchainQuery.data.totalValue,
        lastUpdated: new Date(blockchainQuery.data.lastUpdated),
        isLive: true,
        walletAddress: blockchainQuery.data.walletAddress,
        ethBalance: blockchainQuery.data.ethBalance,
      }
    : localQuery.data;

  return {
    data,
    isLoading: blockchainQuery.isLoading || localQuery.isLoading,
    error: blockchainQuery.error || localQuery.error,
    isLive: !!blockchainQuery.data,
  };
}
