import { z } from "zod";

export const withdrawalRequestSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1").max(1000000, "Amount too large"),
  crypto_currency: z.string().min(1, "Crypto currency is required"),
  wallet_address: z.string().min(10, "Invalid wallet address").max(100, "Wallet address too long"),
});

export type WithdrawalRequestInput = z.infer<typeof withdrawalRequestSchema>;
