import { type User, type InsertUser, type Transaction, type InsertTransaction, type LiquidityStats, type InsertLiquidityStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserWallet(id: string, walletAddress: string): Promise<User | undefined>;

  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByUser(userId: string): Promise<Transaction[]>;
  updateTransactionStatus(id: string, status: string, txHash?: string): Promise<Transaction | undefined>;

  // Liquidity operations
  getLiquidityStats(): Promise<LiquidityStats | undefined>;
  updateLiquidityStats(stats: InsertLiquidityStats): Promise<LiquidityStats>;

  // Referral operations
  getUserByReferralCode(code: string): Promise<User | undefined>;
  generateReferralCode(): string;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;
  private liquidityStats: Map<string, LiquidityStats>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.liquidityStats = new Map();

    // Initialize with default liquidity stats
    const defaultStats: LiquidityStats = {
      id: randomUUID(),
      totalLiquidity: "41597642",
      lastUpdated: new Date(),
    };
    this.liquidityStats.set(defaultStats.id, defaultStats);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const referralCode = this.generateReferralCode();
    const user: User = { 
      ...insertUser, 
      id, 
      referralCode,
      createdAt: new Date(),
      walletAddress: null,
      referredBy: insertUser.referredBy ?? null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserWallet(id: string, walletAddress: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, walletAddress };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date(),
      userId: insertTransaction.userId ?? null,
      txHash: insertTransaction.txHash ?? null,
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (tx) => tx.userId === userId,
    );
  }

  async updateTransactionStatus(id: string, status: string, txHash?: string): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (transaction) {
      const updatedTransaction = { ...transaction, status, txHash: txHash || transaction.txHash };
      this.transactions.set(id, updatedTransaction);
      return updatedTransaction;
    }
    return undefined;
  }

  async getLiquidityStats(): Promise<LiquidityStats | undefined> {
    const stats = Array.from(this.liquidityStats.values());
    return stats.length > 0 ? stats[0] : undefined;
  }

  async updateLiquidityStats(stats: InsertLiquidityStats): Promise<LiquidityStats> {
    const id = randomUUID();
    const liquidityStats: LiquidityStats = {
      ...stats,
      id,
      lastUpdated: new Date(),
    };
    
    // Clear existing stats and add new one
    this.liquidityStats.clear();
    this.liquidityStats.set(id, liquidityStats);
    return liquidityStats;
  }

  async getUserByReferralCode(code: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.referralCode === code,
    );
  }

  generateReferralCode(): string {
    return `REF_${randomUUID().substring(0, 8).toUpperCase()}`;
  }
}

export const storage = new MemStorage();
