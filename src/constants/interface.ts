export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string | string[];
  data?: T;
  error?: string;
  errorCode?: string;
  timestamp: string;
  path: string;
}

export enum UserRole {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
}

export interface UserProfile {
  id: string;
  email: string;
  whatsapp_number: string;
  first_name?: string;
  last_name?: string;
  role_id: UserRole;
  referral_code: string;
  is_verified: boolean;
  is_active: boolean;
  wallet_balance: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: UserProfile;
}

export interface WalletBalance {
  wallet_balance_inr: string;
  wallet_balance_crypto: string;
  crypto_currency: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  created_at: string;
  referred_user?: UserProfile;
}

export interface Ticket {
  id: string;
  user_id: string;
  draw_id: string;
  ticket_number: string;
  purchase_price_inr?: string;
  purchase_price_crypto?: string;
  is_winner: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentStatus {
  status: "PENDING" | "SUCCESS" | "FAILED";
  order_id: string;
  tickets?: Ticket[];
  message?: string;
}

export interface Draw {
  id: string;
  draw_date: string;
  status: 'upcoming' | 'completed';
  total_tickets: number;
  winners_selected?: boolean;
  type?: 'WEEKLY' | 'MEGA' | 'DAILY';
  scheduled_at?: string;
  completed_at?: string;
  created_at: string;
  created_by?: string;
  creator?: UserProfile;
}

export interface DrawWinner {
  ticket_id: string;
  ticket_number: string;
  user_id: string;
  prize_rank: number;
  prize_amount_crypto: string;
  id?: string;
  draw_id?: string;
  win_type?: 'RANDOM_TICKET' | 'TOP_REFERRER';
  prize_amount_inr?: string;
  created_at?: string;
  user?: UserProfile;
  ticket?: Ticket;
  draw?: Draw;
}

export interface Withdrawal {
  id: string;
  requester_id: string;
  amount_requested?: string;
  amount?: number;
  crypto_currency: string;
  wallet_address: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  requester?: UserProfile;
}

export interface Payment {
  id: string;
  user_id: string;
  onramp_order_id: string;
  onramp_txn_id?: string;
  amount_inr: string;
  crypto_received?: string;
  crypto_currency: string;
  ticket_quantity: number;
  status: 'INITIATED' | 'PENDING' | 'COMPLETED' | 'FAILED';
  webhook_payload?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Commission {
  id: string;
  beneficiary_id?: string;
  source_user_id?: string;
  ticket_id: string;
  rate_applied?: string;
  amount_inr?: string;
  amount_crypto: string;
  status?: 'PENDING' | 'PAID' | 'CANCELLED';
  created_at: string;
  beneficiary?: UserProfile;
  source_user?: UserProfile;
}

export interface PlatformConfig {
  id?: string;
  user_commission_rate: number;
  admin_commission_rate: number;
  ticket_price_inr: number;
  weekly_draw_day: string;
  crypto_currency: string;
  referral_commission_user_pct?: string;
  referral_commission_admin_pct?: string;
  updated_at?: string;
}

// ── PAGINATION ───────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

// ── AUTH & OTP ───────────────────────────────────────────

export interface SendOtpRequest {
  whatsapp_number: string;
}

export interface VerifyOtpRequest {
  whatsapp_number: string;
  otp: string;
}

export interface VerifyOtpResponse {
  verified: boolean;
}

export interface RegisterRequest {
  email: string;
  whatsapp_number: string;
  password: string;
  referral_code?: string;
}

export interface LoginRequest {
  whatsapp_number: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

// ── TICKETS ───────────────────────────────────────────────

export interface TicketPriceResponse {
  price_inr: string;
  currency: string;
}

export interface PurchaseTicketsRequest {
  quantity: number;
}

export interface PurchaseTicketsResponse {
  onramp_order_id: string;
  payment_url: string;
}

export interface PaymentStatusResponse {
  status: string;
  message?: string;
}

// ── REFERRALS ───────────────────────────────────────────────

export interface ReferralLinkResponse {
  referral_link: string;
  referral_code: string;
}

export interface ValidateReferralResponse {
  valid: boolean;
  referrer?: UserProfile;
}

// ── WITHDRAWALS ───────────────────────────────────────────

export interface WithdrawalRequest {
  amount: number;
  crypto_currency: string;
  wallet_address: string;
}

// ── ADMIN ───────────────────────────────────────────────

export interface AdminDashboardResponse {
  total_referrals: number;
  commissions: Commission[];
  total_commissions: number;
}

// ── SUPER ADMIN ───────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  whatsapp_number: string;
  referral_code: string;
  total_referrals: number;
  total_commissions_earned: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateAdminAutoRequest {
  email: string;
}

export interface CreateAdminAutoResponse {
  email: string;
  plainTextPassword: string;
  referralCode: string;
  referralLink: string;
}

export interface CreateAdminManualRequest {
  email: string;
  whatsapp_number: string;
  password: string;
}

export interface FundUserWalletRequest {
  amount_inr: number;
}

export interface FundUserWalletResponse {
  message: string;
  funded_amount_inr: number;
  new_balance_inr: string;
  new_balance_crypto: string;
  currency: string;
}

export interface CreateDrawRequest {
  draw_date: string;
}

export interface SetWinnersRequest {
  winner_ticket_ids: string[];
}

export interface ReviewWithdrawalRequest {
  action: 'approve' | 'reject';
  rejection_reason?: string;
}

export interface UpdateConfigRequest {
  user_commission_rate?: number;
  admin_commission_rate?: number;
  ticket_price_inr?: number;
  weekly_draw_day?: string;
  crypto_currency?: string;
}

