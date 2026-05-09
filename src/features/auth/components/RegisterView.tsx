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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050505] text-white selection:bg-primary/30 relative overflow-hidden">
            {/* Visual Enhancements */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Animated Floating Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary/80 rounded-full animate-pulse shadow-[0_0_10px_rgba(161,0,255,1)]" />
                <div className="absolute bottom-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping shadow-[0_0_5px_rgba(255,255,255,1)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-xl z-10 py-12"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <Link href={FRONTEND_ROUTES.HOME} className="flex flex-col items-center group mb-4">
                        <div className="relative w-16 h-16 glow-primary rounded-full border border-primary/50 p-1 bg-black group-hover:scale-105 transition-transform duration-300 mb-2">
                           <img src="/images/hero-h.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">HYPER<span className="text-gradient-gold">STRIKEX</span></span>
                            <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-black uppercase mt-1">Tech • Trivia • Community</span>
                        </div>
                    </Link>

                    <Link
                        href={FRONTEND_ROUTES.HOME}
                        className="flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
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
