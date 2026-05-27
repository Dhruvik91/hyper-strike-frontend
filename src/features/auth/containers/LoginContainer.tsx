"use client";

import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES, API_CONFIG } from "@/constants/constants";
import { useLoginMutation } from "@/hooks/queries/use-auth";
import { LoginInput } from "@/lib/validations/auth";
import { LoginView } from "../components/LoginView";
import httpService from "@/lib/http-service";
import { UserProfile, UserRole } from "@/constants/interface";

export function LoginContainer() {
    const router = useRouter();
    const loginMutation = useLoginMutation();

    const isLoading = loginMutation.isPending;

    async function handleLogin(values: LoginInput) {
        loginMutation.mutate(values, {
            onSuccess: async () => {
                try {
                    const response = await httpService.get<UserProfile>(API_CONFIG.ENDPOINTS.AUTH.ME);
                    const user = response.data;
                    
                    if (user.role_id === UserRole.SUPER_ADMIN) {
                        router.push(FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD);
                    } else if (user.role_id === UserRole.ADMIN) {
                        router.push(FRONTEND_ROUTES.ADMIN.DASHBOARD);
                    } else {
                        router.push(FRONTEND_ROUTES.USER.DASHBOARD);
                    }
                } catch (error) {
                    router.push(FRONTEND_ROUTES.USER.DASHBOARD);
                }
            }
        });
    }

    return (
        <LoginView
            onSubmit={handleLogin}
            isLoading={isLoading}
        />
    );
}
