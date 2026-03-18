export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",
  ENDPOINTS: {
    AUTH: {
      SEND_OTP: "/auth/send-otp",
      VERIFY_OTP: "/auth/verify-otp",
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
      REFRESH: "/auth/refresh",
      LOGOUT: "/auth/logout",
      ME: "/users/me",
    },
    USERS: {
      PROFILE: "/users/me",
      UPDATE_PROFILE: "/users/me",
      REFERRALS: "/users/me/referrals",
      WALLET: "/users/me/wallet",
    },
    REFERRALS: {
      MY_LINK: "/referral/my-link",
      VALIDATE: (code: string) => `/referral/validate/${code}`,
    },
    TICKETS: {
      PRICE: "/tickets/price",
      PURCHASE: "/tickets/purchase",
      MY_TICKETS: "/tickets/me",
      BY_ID: (id: string) => `/tickets/${id}`,
    },
    DRAWS: {
      LIST: "/draws",
      UPCOMING: "/draws/upcoming",
      BY_ID: (id: string) => `/draws/${id}`,
      WINNERS: (id: string) => `/draws/${id}/winners`,
    },
    WITHDRAWALS: {
      REQUEST: "/withdrawals/request",
      MY_HISTORY: "/withdrawals/my",
    },
    ADMIN: {
      DASHBOARD: "/admin/dashboard",
      REFERRALS: "/admin/referrals",
      COMMISSIONS: "/admin/commissions",
    },
    SUPER_ADMIN: {
      USERS: "/super-admin/users",
      TOGGLE_USER: (id: string) => `/super-admin/users/${id}/toggle-active`,
      CREATE_ADMIN: "/super-admin/admins",
      FUND_USER: (id: string) => `/super-admin/users/${id}/fund`,
      DRAWS: "/super-admin/draws",
      SELECT_WINNERS: (id: string) => `/super-admin/draws/${id}/select-winners`,
      SET_WINNERS: (id: string) => `/super-admin/draws/${id}/set-winners`,
      PENDING_WITHDRAWALS: "/super-admin/withdrawals/pending",
      REVIEW_WITHDRAWAL: (id: string) => `/super-admin/withdrawals/${id}/review`,
      CONFIG: "/super-admin/config",
    },
  },
};

export const FRONTEND_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    DASHBOARD: "/dashboard",
    TICKETS: "/tickets",
    REFERRALS: "/referrals",
    WALLET: "/wallet",
    PROFILE: "/profile",
    DRAWS: "/dashboard/draws",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    REFERRALS: "/admin/referrals",
    COMMISSIONS: "/admin/commissions",
    WITHDRAWALS: "/admin/withdrawals",
  },
  SUPER_ADMIN: {
    DASHBOARD: "/super-admin/dashboard",
    USERS: "/super-admin/users",
    DRAWS: "/super-admin/draws",
    WITHDRAWALS: "/super-admin/withdrawals",
    CONFIG: "/super-admin/config",
  },
};