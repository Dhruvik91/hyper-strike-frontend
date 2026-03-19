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
  total_balance: number;
  balance: number;
  commission_earned: number;
  withdrawn: number;
  crypto_balance?: number;
  crypto_currency?: string;
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
  ticket_number: string;
  purchase_price_inr: string;
  status: 'PENDING' | 'ACTIVE' | 'USED' | 'CANCELLED';
  created_at: string;
}

export interface Draw {
  id: string;
  type: 'WEEKLY' | 'MEGA' | 'DAILY';
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  scheduled_at: string;
  completed_at?: string;
  created_at: string;
  created_by: string;
  creator?: UserProfile;
}

export interface DrawWinner {
  id: string;
  draw_id: string;
  user_id: string;
  ticket_id?: string;
  win_type: 'RANDOM_TICKET' | 'TOP_REFERRER';
  prize_amount_inr: string;
  created_at: string;
  user?: UserProfile;
  ticket?: Ticket;
  draw?: Draw;
}

export interface Withdrawal {
  id: string;
  requester_id: string;
  amount_requested: string;
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
  beneficiary_id: string;
  source_user_id: string;
  ticket_id: string;
  rate_applied: string;
  amount_inr: string;
  amount_crypto: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  created_at: string;
  beneficiary?: UserProfile;
  source_user?: UserProfile;
}

export interface PlatformConfig {
  id: string;
  ticket_price_inr: string;
  referral_commission_user_pct: string;
  referral_commission_admin_pct: string;
  updated_at: string;
}

// ── PAGINATION ───────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

