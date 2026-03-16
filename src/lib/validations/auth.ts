import { z } from "zod";

export const sendOtpSchema = z.object({
    whatsapp_number: z
        .string()
        .min(10, "WhatsApp number must be at least 10 digits")
        .max(15, "WhatsApp number must be at most 15 digits")
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid WhatsApp number format"),
});

export const verifyOtpSchema = z.object({
    whatsapp_number: z.string(),
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    whatsapp_number: z.string(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    referral_code: z.string().optional(),
    first_name: z.string().min(2, "First name must be at least 2 characters").optional(),
    last_name: z.string().min(2, "Last name must be at least 2 characters").optional(),
});

export const loginSchema = z.object({
    whatsapp_number: z.string(),
    password: z.string().min(1, "Password is required"),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
