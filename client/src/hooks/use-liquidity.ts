import { useQuery } from "@tanstack/react-query";
import type { LiquidityStats } from "@shared/schema";

export function useLiquidity() {
  return useQuery<LiquidityStats>({
    queryKey: ["/api/liquidity"],
    refetchInterval: 5000, // Update every 5 seconds
  });
}
