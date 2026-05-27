"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES, API_CONFIG } from "@/constants/constants";
import { useSendOtpMutation, useVerifyOtpMutation, useRegisterMutation } from "@/hooks/queries/use-auth";
import { RegisterInput } from "@/lib/validations/auth";
import { RegisterView } from "../components/RegisterView";
import httpService from "@/lib/http-service";
import { UserProfile, UserRole } from "@/constants/interface";

export function RegisterContainer() {
    const router = useRouter();
    const [showOtp, setShowOtp] = useState(false);
    const [registrationData, setRegistrationData] = useState<RegisterInput | null>(null);

    const sendOtpMutation = useSendOtpMutation();
    const verifyOtpMutation = useVerifyOtpMutation();
    const registerMutation = useRegisterMutation();

    const isLoading = sendOtpMutation.isPending || verifyOtpMutation.isPending || registerMutation.isPending;

    async function handleRegisterIntent(values: RegisterInput) {
        setRegistrationData(values);
        sendOtpMutation.mutate({ whatsapp_number: values.whatsapp_number }, {
            onSuccess: () => {
                setShowOtp(true);
            }
        });
    }

    async function handleVerifyOtp(otp: string) {
        if (!registrationData) return;

        verifyOtpMutation.mutate({
            whatsapp_number: registrationData.whatsapp_number,
            otp
        }, {
            onSuccess: () => {
                registerMutation.mutate(registrationData, {
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
        });
    }

    return (
        <RegisterView
            onRegisterIntent={handleRegisterIntent}
            onVerifyOtp={handleVerifyOtp}
            onGoBack={() => setShowOtp(false)}
            isLoading={isLoading}
            showOtp={showOtp}
        />
    );
}
