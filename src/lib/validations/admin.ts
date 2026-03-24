import { z } from "zod";

export const createAdminAutoSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const createAdminManualSchema = z.object({
  email: z.string().email("Invalid email address"),
  whatsapp_number: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid WhatsApp number format (e.g., +919876543210)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const fundUserWalletSchema = z.object({
  amount_inr: z.number().min(1, "Amount must be at least ₹1").max(1000000, "Amount too large"),
});

export const createDrawSchema = z.object({
  draw_date: z.string().min(1, "Draw date is required"),
});

export const updateConfigSchema = z.object({
  user_commission_rate: z.number().min(0).max(1).optional(),
  admin_commission_rate: z.number().min(0).max(1).optional(),
  ticket_price_inr: z.number().min(1).optional(),
  weekly_draw_day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  crypto_currency: z.string().optional(),
});

export type CreateAdminAutoInput = z.infer<typeof createAdminAutoSchema>;
export type CreateAdminManualInput = z.infer<typeof createAdminManualSchema>;
export type FundUserWalletInput = z.infer<typeof fundUserWalletSchema>;
export type CreateDrawInput = z.infer<typeof createDrawSchema>;
export type UpdateConfigInput = z.infer<typeof updateConfigSchema>;
