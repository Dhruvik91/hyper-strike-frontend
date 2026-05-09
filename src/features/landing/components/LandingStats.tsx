"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Code, Star } from "lucide-react";

export function LandingStats() {
  return (
    <section className="px-4 py-8 md:py-12 bg-black border-y border-white/5">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { icon: Users, label: "Active Members", value: "25K+" },
          { icon: Trophy, label: "Trivia Played", value: "10K+" },
          { icon: Code, label: "Tech Articles", value: "5K+" },
          { icon: Star, label: "Expert Contributors", value: "100+" },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            key={i} 
            className="flex items-center gap-3 p-4 rounded-3xl bg-[#0A0A0F]/50 border border-white/5 glass-card"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(161,0,255,0.2)]">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">{stat.value}</span>
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black mt-1">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
