import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertLiquidityStatsSchema } from "@shared/schema";
import { z } from "zod";

const PAYMENT_WALLET_ADDRESS = "0xCbBa4594A1abD7e8C1781EdDB0CaA526FA992e4CC";
const QUICKNODE_API_KEY = process.env.QUICKNODE_API_KEY;
const TARGET_WALLET = "0x92b7807bF19b7DDdf89b706143896d05228f3121";
const QUICKNODE_ENDPOINT = `https://ethereum-mainnet.core.chainstack.com/${QUICKNODE_API_KEY}`;

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

  // --- Authentication Routes ---
  // Login route
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      // Placeholder for actual authentication logic
      // In a real app, you'd verify credentials against a database and issue a token (e.g., JWT)
      const user = await storage.getUserByUsername(username); // Assuming getUserByUsername exists

      if (!user || user.password !== password) { // Simple password check, needs hashing in production
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // For simplicity, returning username and role. In production, return a JWT.
      res.json({
        token: "mock_token", // Replace with actual token generation
        user: {
          id: user.id,
          username: user.username,
  
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Register route
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, role = "user" } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      // Placeholder for actual user creation logic
      // In a real app, you'd hash the password before storing it.
      const newUser = await storage.createUser({ username, password, role }); // Assuming createUser exists

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // --- Protected Routes ---
  // Example protected route: Get current user info
  app.get("/api/auth/me", async (req, res) => {
    // Placeholder for authentication middleware
    // In a real app, you'd verify the token from the request header and attach user info to req.user
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    // Mock user validation based on token
    if (token === "mock_token") {
      // In a real app, you'd decode the JWT to get user details
      const user = await storage.getUserByUsername("mock_user"); // Assuming a mock user exists for this token
      if (user) {
        return res.json({ user });
      }
    }

    res.status(401).json({ error: "Unauthorized: Invalid token" });
  });

  // --- Admin Routes ---
  // Example admin route: Get admin stats
  app.get("/api/admin/stats", async (req, res) => {
    // Placeholder for authentication and authorization middleware
    // Middleware would check for valid token and admin role
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const user = await storage.getUserByUsername("mock_user"); // Mock user lookup

    if (token === "mock_token" && user && user.role === "admin") {
      res.json({
        message: "Admin dashboard data",
        timestamp: new Date().toISOString(),
        adminUser: user.username
      });
    } else {
      res.status(403).json({ error: "Forbidden: Admin access required" });
    }
  });

  const httpServer = createServer(app);
  // Blockchain API endpoints
  app.get("/api/blockchain/liquidity", async (req, res) => {
    try {
      const response = await fetch(QUICKNODE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [TARGET_WALLET, 'latest']
        })
      });

      const data = await response.json();
      const balanceWei = parseInt(data.result, 16);
      const balanceEth = balanceWei / Math.pow(10, 18);
      
      // Convert to USD (approximate)
      const ethToUsd = 3400; // Approximate ETH price
      const totalValue = (balanceEth * ethToUsd).toFixed(0);

      const blockchainData = {
        walletAddress: TARGET_WALLET,
        ethBalance: balanceEth.toFixed(6),
        totalValue: totalValue,
        lastUpdated: new Date(),
        tokenBalances: [
          {
            symbol: 'ETH',
            balance: balanceEth.toFixed(6),
            value: totalValue
          }
        ]
      };

      // Update local storage with real data
      await storage.updateLiquidityStats({ 
        totalLiquidity: totalValue 
      });

      res.json(blockchainData);
    } catch (error) {
      console.error('Blockchain API error:', error);
      res.status(500).json({ 
        message: "Failed to fetch live blockchain data",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/blockchain/balance/:address", async (req, res) => {
    try {
      const { address } = req.params;
      
      const response = await fetch(QUICKNODE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [address, 'latest']
        })
      });

      const data = await response.json();
      const balanceWei = parseInt(data.result, 16);
      const balanceEth = balanceWei / Math.pow(10, 18);

      res.json({ 
        address,
        balance: balanceEth.toFixed(6),
        balanceWei: data.result 
      });
    } catch (error) {
      console.error('Balance fetch error:', error);
      res.status(500).json({ 
        message: "Failed to fetch wallet balance",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return httpServer;
}