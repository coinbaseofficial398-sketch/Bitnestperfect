import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  referralCode: text("referral_code").unique(),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").references(() => users.id),
  protocol: text("protocol").notNull(), // 'loop', 'saving-box', 'savings', 'dao'
  amount: text("amount").notNull(),
  txHash: text("tx_hash"),
  status: text("status").notNull(), // 'pending', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const liquidityStats = pgTable("liquidity_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalLiquidity: text("total_liquidity").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertLiquidityStatsSchema = createInsertSchema(liquidityStats).omit({
  id: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertLiquidityStats = z.infer<typeof insertLiquidityStatsSchema>;
export type LiquidityStats = typeof liquidityStats.$inferSelect;
