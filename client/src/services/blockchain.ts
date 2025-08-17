export interface BlockchainLiquidity {
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

export const fetchLiveLiquidity = async (): Promise<BlockchainLiquidity> => {
  const response = await fetch('/api/blockchain/liquidity');
  if (!response.ok) throw new Error('Failed to fetch blockchain data');
  return response.json();
};

export const fetchWalletBalance = async (address: string): Promise<{ address: string; balance: string; balanceWei: string }> => {
  const response = await fetch(`/api/blockchain/balance/${address}`);
  if (!response.ok) throw new Error('Failed to fetch wallet balance');
  return response.json();
};