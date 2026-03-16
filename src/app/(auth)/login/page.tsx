"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { LoginForm } from "@/features/auth/components/LoginForm";

import { toast } from "sonner";

import { useLoginMutation } from "@/hooks/queries/use-auth";
import { LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-background relative overflow-hidden">
      {/* Visual Enhancements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Animated Floating Particles (CSS only for perf) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <Link href={FRONTEND_ROUTES.HOME} className="group flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-xl shadow-lg ring-1 ring-white/20">
              <div className="w-8 h-8 flex items-center justify-center text-white font-black text-xl italic select-none">H</div>
            </div>
            <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 tracking-tight">
              HyperStrike
            </span>
          </Link>

          <Link
            href={FRONTEND_ROUTES.HOME}
            className="flex items-center text-sm font-semibold text-zinc-500 hover:text-emerald-400 transition-all group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Return to platform
          </Link>
        </div>

        <LoginForm
          onSubmit={handleLogin}
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
