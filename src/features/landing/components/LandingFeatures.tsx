"use client";

import { motion } from "framer-motion";
import { Zap, Lightbulb, Users, Trophy, Gift } from "lucide-react";

export function LandingFeatures() {
  return (
    <section className="pb-32 pt-10 px-4 relative">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
        {[
          { icon: Zap, label: "Cutting Edge Tech", desc: "Latest innovation." },
          { icon: Lightbulb, label: "Fun Trivia", desc: "Win daily prizes." },
          { icon: Users, label: "Strong Community", desc: "Worldwide network." },
          { icon: Trophy, label: "Leaderboards", desc: "Become the champion." },
          { icon: Gift, label: "Exclusive Rewards", desc: "Unlock VIP benefits." },
        ].map((feature, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            key={i} 
            className="flex flex-col items-center text-center gap-4 group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] bg-[#0A0A0F] border border-white/5 flex items-center justify-center shadow-lg group-hover:border-primary/50 group-hover:glow-primary transition-all duration-500">
              <feature.icon className="w-7 h-7 md:w-9 md:h-9 text-primary drop-shadow-[0_0_8px_rgba(161,0,255,0.5)]" />
            </div>
            <div className="flex flex-col gap-1.5 px-2">
              <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white leading-tight">{feature.label}</h4>
              <p className="text-[8px] md:text-[9px] text-muted-foreground leading-tight hidden sm:block font-bold">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
