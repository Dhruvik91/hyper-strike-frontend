"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center p-2" href={FRONTEND_ROUTES.HOME}>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            HyperStrike
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href={FRONTEND_ROUTES.LOGIN}>
            <Button variant="ghost" className="text-sm font-medium hover:text-emerald-400 hover:bg-emerald-400/10 transition-colors">
              Log in
            </Button>
          </Link>
          <Link href={FRONTEND_ROUTES.REGISTER}>
            <Button className="text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center px-4">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center max-w-3xl border border-white/5 rounded-3xl p-8 bg-white/5 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm mb-6 relative z-10"
            >
              The Ultimate <br className="hidden sm:block"/>
              Lucky Draw Platform
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-[700px] text-zinc-400 md:text-xl leading-relaxed mb-8 relative z-10"
            >
              Buy tickets, join the weekly mega draws, and earn infinite passive income through our powerful referral system.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10"
            >
              <Link href={FRONTEND_ROUTES.REGISTER} className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full px-8 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all">
                  Start Winning
                </Button>
              </Link>
              <Link href={FRONTEND_ROUTES.LOGIN} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full rounded-full px-8 border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-all">
                  Check Tickets
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-xs text-zinc-500">
          © 2026 HyperStrike. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-zinc-500 hover:text-white transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-zinc-500 hover:text-white transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
