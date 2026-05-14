import React from "react";
import Link from "next/link";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { Home, HelpCircle, Trophy, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      {/* Premium Particles & Atmosphere Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <LandingHeader />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        {/* Cinematic Glitch/Glow 404 Display */}
        <div className="relative mb-6">
          <span className="absolute -inset-1 block bg-gradient-primary blur-2xl opacity-30 rounded-full" />
          <h1 className="relative text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter select-none text-glow-primary">
            4<span className="text-gradient-gold">0</span>4
          </h1>
        </div>

        {/* High-Impact Headings */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase mb-4 text-gradient-primary max-w-3xl">
          Signal Lost in the Hyper-Strike Grid
        </h2>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
          <Link href={FRONTEND_ROUTES.HOME} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-primary glow-primary text-white font-black uppercase tracking-widest rounded-full px-8 py-6 text-xs border border-primary/50 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(161,0,255,0.4)] flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Return Home
            </Button>
          </Link>
          <Link href={FRONTEND_ROUTES.PUBLIC.TRIVIA} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-white font-black uppercase tracking-widest rounded-full px-8 py-6 text-xs transition-all duration-300 backdrop-blur-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" /> Explore Trivia
            </Button>
          </Link>
        </div>

        {/* Premium Bento Grid for Recommended Routes */}
        {/* <div className="w-full max-w-4xl text-left">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
            Recommended Active Coordinates
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Link href={FRONTEND_ROUTES.HOME} className="group block">
              <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(161,0,255,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full transition-all duration-300 group-hover:bg-primary/20" />
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black tracking-wide text-white uppercase mb-1 group-hover:text-primary transition-colors">
                  Main Portal
                </h3>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  Head back to the central hub to buy tickets, view active mega draws, and track live leaderboards.
                </p>
              </div>
            </Link>

            <Link href={FRONTEND_ROUTES.PUBLIC.REWARDS} className="group block">
              <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,181,71,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full transition-all duration-300 group-hover:bg-accent/20" />
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black tracking-wide text-white uppercase mb-1 group-hover:text-accent transition-colors">
                  Prizes & Rewards
                </h3>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  Discover epic VIP subscription benefits, referral commissions, and massive lucky draw pools.
                </p>
              </div>
            </Link>

            <Link href={FRONTEND_ROUTES.PUBLIC.CONTACT} className="group block sm:col-span-2 lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(161,0,255,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full transition-all duration-300 group-hover:bg-primary/20" />
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black tracking-wide text-white uppercase mb-1 group-hover:text-primary transition-colors">
                  Direct Support
                </h3>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  Need help routing your connection? Contact our dedicated user support and department experts.
                </p>
              </div>
            </Link>
          </div>
        </div> */}
      </main>

      {/* Standard Comprehensive Footer */}
      <SiteFooter />
    </div>
  );
}
