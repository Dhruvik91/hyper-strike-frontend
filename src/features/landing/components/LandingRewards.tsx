"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Music, Crown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function LandingRewards() {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-black tracking-[0.4em] text-[10px] uppercase italic">Curated Loot</span>
            <h2 className="text-3xl md:text-5xl font-black text-gradient-gold uppercase leading-none">Win Epic Rewards</h2>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-black tracking-widest uppercase mb-1">
            <span>Swipe to Explore</span>
            <div className="flex gap-1">
               <ChevronRight className="w-4 h-4 rotate-180 opacity-30" />
               <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Reward Cards Carousel */}
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {/* Reward Card 01 */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col min-w-[88vw] sm:min-w-[400px] md:min-w-0 snap-center h-[580px] md:h-[720px] glow-border-purple group"
          >
            <div className="absolute top-8 left-8 bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-muted-foreground tracking-widest">01</div>
            <div className="mt-12 mb-6 flex flex-col items-center text-center">
               <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-2">Welcome Bonus</span>
               <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-gradient-gold text-glow-gold">5 POINTS</h3>
            </div>
            <div className="relative flex-1 w-full mb-10">
               <Image src="/images/points.png" alt="Reward" fill className="object-contain drop-shadow-[0_0_30px_rgba(255,181,71,0.4)]" />
            </div>
            {/* Podium */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-accent/20 blur-[30px] rounded-full" />
            
            <p className="text-muted-foreground text-xs md:text-sm text-center mb-10 font-bold leading-relaxed px-6 italic">
              Kickstart your journey with 5 free points!
            </p>
            <Link href={FRONTEND_ROUTES.REGISTER} className="w-full block">
              <Button variant="ghost" className="w-full text-white font-black tracking-widest text-[11px] uppercase bg-white/5 border border-white/10 rounded-2xl h-16 hover:bg-primary/20 transition-all relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                CLAIM NOW <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Reward Card 02 (Featured) */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col min-w-[88vw] sm:min-w-[400px] md:min-w-0 snap-center h-[580px] md:h-[720px] border-2 border-primary shadow-[0_0_80px_-10px_rgba(161,0,255,0.4)] bg-gradient-to-b from-primary/10 to-black/20 group"
          >
            <div className="absolute top-8 left-8 bg-primary border border-white/20 px-4 py-2 rounded-xl text-[10px] font-black text-white tracking-widest">02</div>
            <div className="mt-12 mb-6 flex flex-col items-center text-center">
               <span className="text-[10px] font-black text-primary-foreground tracking-[0.3em] uppercase mb-2">Weekly Win</span>
               <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-gradient-primary text-glow-primary">AIRPODS PRO 2</h3>
            </div>
            <div className="relative flex-1 w-full mb-10">
               <Image src="/images/airpods.png" alt="Reward" fill className="object-contain scale-125 drop-shadow-[0_0_40px_rgba(161,0,255,0.6)]" />
               <div className="absolute top-0 right-10 opacity-30">
                 <Music className="w-8 h-8 text-primary blur-[2px]" />
               </div>
            </div>
            {/* Podium */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[80%] h-12 podium-glow rounded-full" />
            
            <p className="text-muted-foreground text-xs md:text-sm text-center mb-10 font-bold leading-relaxed px-6 italic">
              Play this week and win Apple AirPods Pro 2!
            </p>
            <Link href={FRONTEND_ROUTES.REGISTER} className="w-full block">
              <Button className="w-full bg-gradient-primary text-white font-black tracking-widest text-[11px] uppercase rounded-2xl h-18 shadow-[0_20px_40px_-10px_rgba(161,0,255,0.6)] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 PLAY NOW <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Reward Card 03 */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col min-w-[88vw] sm:min-w-[400px] md:min-w-0 snap-center h-[580px] md:h-[720px] glow-border-purple group"
          >
            <div className="absolute top-8 left-8 bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-muted-foreground tracking-widest">03</div>
            <div className="mt-12 mb-6 flex flex-col items-center text-center">
               <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-2">VIP Club</span>
               <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">WIN IPHONE <br /> 15 PRO MAX</h3>
            </div>
            <div className="relative flex-1 w-full mb-10">
               <Image src="/images/iphone.png" alt="Reward" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
               <div className="absolute bottom-10 right-4 bg-accent/20 backdrop-blur-xl border border-accent/40 px-3 py-1 rounded-lg flex items-center gap-1">
                  <Crown className="w-3 h-3 text-accent" />
                  <span className="text-[8px] font-black text-accent uppercase tracking-tighter">VIP ONLY</span>
               </div>
            </div>
            {/* Podium Shadow */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-white/5 blur-[25px] rounded-full" />
            
            <p className="text-muted-foreground text-xs md:text-sm text-center mb-10 font-bold leading-relaxed px-10 italic">
              Join the VIP Club and win iPhone 15 Pro Max & luxury prizes!
            </p>
            <Link href={FRONTEND_ROUTES.REGISTER} className="w-full block">
              <Button variant="ghost" className="w-full text-white font-black tracking-widest text-[11px] uppercase bg-white/5 border border-white/10 rounded-2xl h-16 hover:bg-white/10 transition-all relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                JOIN VIP <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
