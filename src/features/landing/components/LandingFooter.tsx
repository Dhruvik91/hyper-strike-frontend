"use client";

import { motion } from "framer-motion";
import { Home as HomeIcon, Gamepad2, Navigation, Gift, Crown } from "lucide-react";

import { FRONTEND_ROUTES } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LandingFooter() {
  const pathname = usePathname();

  const navItems = [
    { icon: HomeIcon, label: "Home", href: FRONTEND_ROUTES.HOME },
    { icon: Gamepad2, label: "Trivia", href: FRONTEND_ROUTES.PUBLIC.TRIVIA },
    { icon: Navigation, label: "Community", href: FRONTEND_ROUTES.PUBLIC.COMMUNITY },
    { icon: Gift, label: "Rewards", href: FRONTEND_ROUTES.PUBLIC.REWARDS },
    { icon: Crown, label: "VIP Club", href: FRONTEND_ROUTES.PUBLIC.VIP },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-22 bg-[#050505]/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-2 md:hidden z-[200] rounded-t-[32px]">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href;
        return (
          <Link href={item.href} key={i} className={`flex flex-col items-center gap-2 transition-all w-16 relative ${isActive ? 'text-white' : 'text-muted-foreground/50'}`}>
            {isActive && (
              <motion.div 
                layoutId="nav-active"
                className="absolute top-[-15px] w-12 h-12 bg-primary/20 blur-[15px] rounded-full -z-10"
              />
            )}
            <item.icon className={`w-6 h-6 ${isActive ? 'text-primary drop-shadow-[0_0_12px_rgba(161,0,255,0.8)] scale-110' : ''} transition-all`} />
            <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
            {isActive && <div className="w-1 h-1 bg-primary rounded-full mt-0.5 shadow-[0_0_5px_rgba(161,0,255,1)]" />}
          </Link>
        );
      })}
    </footer>
  );
}
