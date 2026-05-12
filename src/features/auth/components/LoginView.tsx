"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginInput } from "@/lib/validations/auth";

interface LoginViewProps {
    onSubmit: (values: LoginInput) => void;
    isLoading: boolean;
}

export function LoginView({ onSubmit, isLoading }: LoginViewProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050505] text-white selection:bg-primary/30 relative overflow-hidden">
            {/* Visual Enhancements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Animated Floating Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse shadow-[0_0_10px_rgba(161,0,255,1)]" />
                <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping shadow-[0_0_5px_rgba(255,255,255,1)]" />
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse delay-700 shadow-[0_0_15px_rgba(161,0,255,0.8)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 px-4 sm:px-0"
            >
                <div className="flex flex-col items-center mb-8 text-center">
                    <Link href={FRONTEND_ROUTES.HOME} className="flex flex-col items-center group mb-4">
                        <div className="relative w-12 h-12 glow-primary rounded-full border border-primary/50 p-1 bg-black group-hover:scale-105 transition-transform duration-300 mb-2">
                           <img src="/images/home-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">HYPER<span className="text-gradient-gold">STRIKEX</span></span>
                            <span className="text-[9px] tracking-[0.3em] text-muted-foreground font-black uppercase mt-1">Tech • Trivia • Community</span>
                        </div>
                    </Link>

                    <Link
                        href={FRONTEND_ROUTES.HOME}
                        className="flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Return to platform
                    </Link>
                </div>

                <LoginForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                />

                <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
                    Protected by enterprise-grade security. <br />
                    By signing in, you agree to our Terms and Conditions.
                </p>
            </motion.div>
        </div>
    );
}
