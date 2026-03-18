import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    UserProfile,
    WalletBalance,
} from "@/constants/interface";

export const useWalletBalanceQuery = () => {
    return useQuery({
        queryKey: ["wallet-balance"],
        queryFn: async () => {
            const response = await httpService.get<{
                wallet_balance_inr: string;
                wallet_balance_crypto: string;
                crypto_currency: string;
            }>(
                API_CONFIG.ENDPOINTS.USERS.WALLET
            );

            const inr = Number(response.data.wallet_balance_inr);
            const crypto = Number(response.data.wallet_balance_crypto);

            const wallet: WalletBalance = {
                total_balance: Number.isFinite(inr) ? inr : 0,
                balance: Number.isFinite(inr) ? inr : 0,
                commission_earned: 0,
                withdrawn: 0,
                crypto_balance: Number.isFinite(crypto) ? crypto : 0,
                crypto_currency: response.data.crypto_currency,
            };

            return wallet;
        },
    });
};

export const useUserProfileQuery = () => {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const response = await httpService.get<UserProfile>(
                API_CONFIG.ENDPOINTS.USERS.PROFILE
            );
            return response.data;
        },
    });
};
