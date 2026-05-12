"use client";

import { motion } from "framer-motion";
import { Crown, Star, Sparkles, Zap, Gift, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function LandingVip() {
  return (
    <section className="container mx-auto px-4 mb-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-[40px] p-8 md:p-14 relative overflow-hidden glow-border-purple group"
      >
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[40%] h-[150%] bg-primary/20 blur-[120px] -rotate-45 pointer-events-none" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[50%] h-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          {/* Left: VIP Badge Visual */}
          <div className="relative w-48 h-64 md:w-56 md:h-72 shrink-0 hidden md:block">
             <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B4E] to-black rounded-3xl border border-primary/40 shadow-2xl rotate-[-6deg] flex flex-col items-center justify-center">
                <div className="relative mb-4">
                   <Crown className="w-20 h-20 text-accent drop-shadow-[0_0_20px_oklch(0.8_0.2_80)]" />
                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full blur-[2px] opacity-50" />
                </div>
                <span className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">VIP</span>
                <div className="mt-4 flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                   ))}
                </div>
             </div>
             {/* Floating Particles */}
             <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute -top-4 -right-4"
             >
                <Sparkles className="w-8 h-8 text-accent opacity-40 blur-[1px]" />
             </motion.div>
          </div>

          {/* Center: Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-primary font-black tracking-[0.5em] text-[10px] md:text-xs uppercase italic mb-4 block">VIP SUBSCRIPTION</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
               <span className="text-white">JUST</span> <br className="hidden sm:block" />
               <span className="text-gradient-primary text-glow-primary uppercase">£1 / MONTH</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg font-bold mb-10 max-w-xl mx-auto lg:mx-0">
              Unlock premium features, exclusive rewards, and early access to all tech articles.
            </p>

            {/* Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
               {[
                 { icon: Zap, text: "Ad-Free" },
                 { icon: Gift, text: "Exclusives" },
                 { icon: Trophy, text: "Leaderboard" },
                 { icon: Crown, text: "Priority" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 justify-center lg:justify-start group/item">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/item:bg-primary/30 transition-colors">
                       <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black text-white/80 uppercase tracking-widest">{item.text}</span>
                 </div>
               ))}
            </div>

            <Link href={FRONTEND_ROUTES.REGISTER} className="w-full lg:w-auto inline-block">
              <Button className="w-full lg:w-auto h-16 md:h-18 px-16 bg-gradient-primary glow-primary text-white font-black tracking-[0.2em] text-sm rounded-2xl relative overflow-hidden group uppercase">
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 JOIN VIP NOW <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right: Circular CTA Badge */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 flex items-center justify-center">
             <div className="absolute inset-0 border-[1px] border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
             <div className="absolute inset-4 border-[1px] border-white/5 rounded-full" />
             <div className="absolute inset-8 bg-gradient-to-b from-primary/20 to-transparent blur-[40px] rounded-full" />
             
             <div className="text-center relative z-10">
                <div className="text-5xl md:text-7xl font-black text-gradient-gold text-glow-gold leading-none">£1</div>
                <div className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] uppercase mt-2 italic">ONLY</div>
             </div>
             
             {/* Orbiting Icon */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-primary/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(161,0,255,0.4)]">
                   <Sparkles className="w-4 h-4 text-primary" />
                </div>
             </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
