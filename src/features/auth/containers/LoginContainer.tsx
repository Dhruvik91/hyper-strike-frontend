"use client";

import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { useLoginMutation } from "@/hooks/queries/use-auth";
import { LoginInput } from "@/lib/validations/auth";
import { LoginView } from "../components/LoginView";

export function LoginContainer() {
    const router = useRouter();
    const loginMutation = useLoginMutation();

    const isLoading = loginMutation.isPending;

    async function handleLogin(values: LoginInput) {
        loginMutation.mutate(values, {
            onSuccess: () => {
                router.push(FRONTEND_ROUTES.USER.DASHBOARD);
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
