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

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: UserProfile;
}

// Add more data models and API response interfaces here
