"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { RegisterInput } from "@/lib/validations/auth";

interface RegisterViewProps {
    onRegisterIntent: (values: RegisterInput) => void;
    onVerifyOtp: (otp: string) => void;
    onGoBack: () => void;
    isLoading: boolean;
    showOtp: boolean;
}

export function RegisterView({
    onRegisterIntent,
    onVerifyOtp,
    onGoBack,
    isLoading,
    showOtp
}: RegisterViewProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/30 via-background to-background relative overflow-hidden">
            {/* Visual Enhancements */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Animated Floating Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <div className="absolute bottom-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-xl z-10 py-12"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <Link href={FRONTEND_ROUTES.HOME} className="group flex items-center gap-2 mb-4">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl shadow-lg ring-1 ring-white/20">
                            <div className="w-8 h-8 flex items-center justify-center text-white font-black text-xl italic select-none">H</div>
                        </div>
                        <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 tracking-tight">
                            HyperStrike
                        </span>
                    </Link>

                    <Link
                        href={FRONTEND_ROUTES.HOME}
                        className="flex items-center text-sm font-semibold text-zinc-500 hover:text-blue-400 transition-all group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <RegisterForm
                    onSubmit={onRegisterIntent}
                    isLoading={isLoading}
                    showOtp={showOtp}
                    onVerifyOtp={onVerifyOtp}
                    onGoBack={onGoBack}
                />

                <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
                    Registration is free and takes less than a minute. <br />
                    Start building your referral network and win big!
                </p>
            </motion.div>
        </div>
    );
}
