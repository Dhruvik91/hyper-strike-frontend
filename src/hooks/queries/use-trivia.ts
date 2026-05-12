import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TRIVIA_API_CONFIG } from "@/constants/constants";
import {
  TriviaResponse,
  TriviaTokenResponse,
  TriviaCategoriesResponse,
  TriviaCategoryCountResponse,
  TriviaGlobalCountResponse,
  FetchTriviaParams,
} from "@/constants/interface";
import { toast } from "sonner";

const TRIVIA_TOKEN_KEY = "trivia_session_token";

/**
 * Retrieve the current Open Trivia DB session token from localStorage
 */
export const getTriviaSessionToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TRIVIA_TOKEN_KEY);
};

/**
 * Save the Open Trivia DB session token to localStorage
 */
export const setTriviaSessionToken = (token: string): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRIVIA_TOKEN_KEY, token);
};

/**
 * Remove the Open Trivia DB session token from localStorage
 */
export const clearTriviaSessionToken = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TRIVIA_TOKEN_KEY);
};

// Create a dedicated axios instance for Trivia API to prevent sending app auth headers
const triviaAxios = axios.create({
  baseURL: TRIVIA_API_CONFIG.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Helper to request a new session token from Open Trivia DB
 */
export const requestTriviaToken = async (): Promise<string> => {
  const response = await triviaAxios.get<TriviaTokenResponse>(
    TRIVIA_API_CONFIG.ENDPOINTS.TOKEN,
    { params: { command: "request" } }
  );
  if (response.data.response_code === 0 && response.data.token) {
    setTriviaSessionToken(response.data.token);
    return response.data.token;
  }
  throw new Error("Failed to retrieve trivia session token");
};

/**
 * Helper to reset an existing session token
 */
export const resetTriviaToken = async (token: string): Promise<string> => {
  const response = await triviaAxios.get<TriviaTokenResponse>(
    TRIVIA_API_CONFIG.ENDPOINTS.TOKEN,
    { params: { command: "reset", token } }
  );
  if (response.data.response_code === 0 && response.data.token) {
    setTriviaSessionToken(response.data.token);
    return response.data.token;
  }
  throw new Error("Failed to reset trivia session token");
};

/**
 * Core function to fetch trivia questions with automatic token handling and retries
 */
export const fetchTriviaQuestions = async (params: FetchTriviaParams): Promise<TriviaResponse> => {
  // Ensure we have a session token stored to avoid duplicate questions
  let token = getTriviaSessionToken();
  if (!token) {
    try {
      token = await requestTriviaToken();
    } catch (error) {
      // Proceed without token if requesting fails, API functions without token as well
    }
  }

  const queryParams: Record<string, unknown> = { ...params };
  if (token) {
    queryParams.token = token;
  }

  let response = await triviaAxios.get<TriviaResponse>(
    TRIVIA_API_CONFIG.ENDPOINTS.QUESTIONS,
    { params: queryParams }
  );

  // Handle Response Codes for Token expiration or exhaustion
  // Code 3: Token Not Found (Session Token does not exist / expired after 6 hours)
  if (response.data.response_code === 3) {
    try {
      token = await requestTriviaToken();
      queryParams.token = token;
      response = await triviaAxios.get<TriviaResponse>(
        TRIVIA_API_CONFIG.ENDPOINTS.QUESTIONS,
        { params: queryParams }
      );
    } catch (e) {
      // Keep original response if retry fails
    }
  }
  // Code 4: Token Empty (Session Token has returned all possible questions for the specified query)
  else if (response.data.response_code === 4 && token) {
    try {
      token = await resetTriviaToken(token);
      queryParams.token = token;
      response = await triviaAxios.get<TriviaResponse>(
        TRIVIA_API_CONFIG.ENDPOINTS.QUESTIONS,
        { params: queryParams }
      );
    } catch (e) {
      // Keep original response if retry fails
    }
  }

  // Handle remaining API response codes
  if (response.data.response_code !== 0) {
    switch (response.data.response_code) {
      case 1:
        throw new Error("No Results: The API doesn't have enough questions for your query.");
      case 2:
        throw new Error("Invalid Parameter: Arguments passed in aren't valid.");
      case 3:
        throw new Error("Token Not Found: Session Token does not exist.");
      case 4:
        throw new Error("Token Empty: Session Token has returned all possible questions for the specified query.");
      case 5:
        throw new Error("Rate Limit: Too many requests have occurred. Each IP can only access the API once every 5 seconds.");
      default:
        throw new Error(`Trivia API Error: Response Code ${response.data.response_code}`);
    }
  }

  return response.data;
};

/**
 * Hook to fetch Trivia questions from Open Trivia Database.
 * Automatically utilizes localStorage session tokens to avoid repeated questions.
 * Configured with staleTime and refetchOnWindowFocus to respect the strict 5-second rate limit.
 */
export const useTriviaQuestionsQuery = (
  params: FetchTriviaParams = { amount: 10 },
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["trivia-questions", params],
    queryFn: () => fetchTriviaQuestions({ amount: 10, ...params }),
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes to prevent hitting rate limits
    refetchOnWindowFocus: false, // Prevent Code 5 Rate Limit errors on tab switching
    enabled: options?.enabled ?? true,
  });
};

/**
 * Hook to fetch all available Trivia categories.
 */
export const useTriviaCategoriesQuery = () => {
  return useQuery({
    queryKey: ["trivia-categories"],
    queryFn: async () => {
      const response = await triviaAxios.get<TriviaCategoriesResponse>(
        TRIVIA_API_CONFIG.ENDPOINTS.CATEGORIES
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache categories for 24 hours
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to fetch the total question count for a specific category.
 */
export const useTriviaCategoryCountQuery = (categoryId?: number) => {
  return useQuery({
    queryKey: ["trivia-category-count", categoryId],
    queryFn: async () => {
      const response = await triviaAxios.get<TriviaCategoryCountResponse>(
        TRIVIA_API_CONFIG.ENDPOINTS.CATEGORY_COUNT,
        { params: { category: categoryId } }
      );
      return response.data;
    },
    enabled: categoryId !== undefined && categoryId !== null,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to fetch the global question count across the entire database.
 */
export const useTriviaGlobalCountQuery = () => {
  return useQuery({
    queryKey: ["trivia-global-count"],
    queryFn: async () => {
      const response = await triviaAxios.get<TriviaGlobalCountResponse>(
        TRIVIA_API_CONFIG.ENDPOINTS.GLOBAL_COUNT
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });
};

/**
 * Mutation hook to manually request or reset the session token.
 */
export const useTriviaTokenMutation = () => {
  return useMutation({
    mutationFn: async (action: "request" | "reset") => {
      if (action === "request") {
        return await requestTriviaToken();
      } else {
        const currentToken = getTriviaSessionToken();
        if (!currentToken) {
          throw new Error("No active session token found to reset.");
        }
        return await resetTriviaToken(currentToken);
      }
    },
    onSuccess: (token, action) => {
      toast.success(`Trivia session token ${action}ed successfully.`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to manage trivia session token.");
    },
  });
};
