import { z } from "zod";

export const fundUserSchema = z.object({
  amount_inr: z.number()
    .min(1, "Amount must be at least ₹1")
    .max(1000000, "Amount cannot exceed ₹10,00,000"),
});

export const createAdminSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  whatsapp_number: z.string()
    .regex(/^\+?[1-9]\d{9,14}$/, "Invalid WhatsApp number format")
    .min(10, "WhatsApp number must be at least 10 digits"),
});

export const createDrawSchema = z.object({
  type: z.enum(["DAILY", "WEEKLY", "MEGA"]),
  scheduled_at: z.string()
    .min(1, "Scheduled date is required"),
});

export const platformConfigSchema = z.object({
  ticket_price_inr: z.string()
    .optional()
    .refine((val) => !val || parseFloat(val) > 0, "Ticket price must be positive"),
  referral_commission_user_pct: z.string()
    .optional()
    .refine((val) => !val || (parseFloat(val) >= 0 && parseFloat(val) <= 1), "User commission must be between 0 and 1"),
  referral_commission_admin_pct: z.string()
    .optional()
    .refine((val) => !val || (parseFloat(val) >= 0 && parseFloat(val) <= 1), "Admin commission must be between 0 and 1"),
});

export type FundUserFormData = z.infer<typeof fundUserSchema>;
export type CreateAdminFormData = z.infer<typeof createAdminSchema>;
export type CreateDrawFormData = z.infer<typeof createDrawSchema>;
export type PlatformConfigFormData = z.infer<typeof platformConfigSchema>;
