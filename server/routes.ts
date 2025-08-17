import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertLiquidityStatsSchema } from "@shared/schema";
import { z } from "zod";

const PAYMENT_WALLET_ADDRESS = "0xCbBa4594A1abD7e8C1781EdDB0CaA526FA992e4CC";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get liquidity stats
  app.get("/api/liquidity", async (req, res) => {
    try {
      const stats = await storage.getLiquidityStats();
      if (!stats) {
        return res.status(404).json({ message: "Liquidity stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch liquidity stats" });
    }
  });

  // Update liquidity stats (simulating real-time updates)
  app.post("/api/liquidity", async (req, res) => {
    try {
      const validatedStats = insertLiquidityStatsSchema.parse(req.body);
      const stats = await storage.updateLiquidityStats(validatedStats);
      res.json(stats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid liquidity stats data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update liquidity stats" });
    }
  });

  // Process protocol join with automatic payment
  app.post("/api/protocol/join", async (req, res) => {
    try {
      const { protocol, userId, amount } = req.body;
      
      if (!protocol || !userId || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create transaction record
      const transaction = await storage.createTransaction({
        userId,
        protocol,
        amount,
        status: "pending",
        txHash: null,
      });

      // Simulate payment processing to the specified wallet
      // In a real implementation, this would integrate with Web3 providers
      setTimeout(async () => {
        const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;
        await storage.updateTransactionStatus(transaction.id, "completed", mockTxHash);
        
        // Update liquidity stats after successful transaction
        const currentStats = await storage.getLiquidityStats();
        if (currentStats) {
          const newTotal = (parseInt(currentStats.totalLiquidity) + parseInt(amount)).toString();
          await storage.updateLiquidityStats({ totalLiquidity: newTotal });
        }
      }, 2000);

      res.json({ 
        success: true, 
        transactionId: transaction.id,
        message: `Payment processing for ${protocol} protocol`,
        // Note: Wallet address is hidden from client response
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process protocol join" });
    }
  });

  // Get user transactions
  app.get("/api/transactions/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const transactions = await storage.getTransactionsByUser(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Generate referral link
  app.post("/api/referral/generate", async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const referralLink = `${req.get('origin') || 'https://bitnest.finance'}/ref/${user.referralCode}`;
      res.json({ referralLink, referralCode: user.referralCode });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate referral link" });
    }
  });

  // Validate referral code
  app.get("/api/referral/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const referrer = await storage.getUserByReferralCode(code);
      
      if (!referrer) {
        return res.status(404).json({ message: "Invalid referral code" });
      }

      res.json({ valid: true, referrer: { id: referrer.id, username: referrer.username } });
    } catch (error) {
      res.status(500).json({ message: "Failed to validate referral code" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
