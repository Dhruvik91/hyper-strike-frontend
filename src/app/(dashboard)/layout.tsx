"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FRONTEND_ROUTES } from "@/constants/constants";

import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Ticket, 
  Trophy, 
  Wallet, 
  Users, 
  LogOut 
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: FRONTEND_ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: "My Tickets", href: `${FRONTEND_ROUTES.DASHBOARD}/tickets`, icon: Ticket },
    { name: "Lucky Draws", href: `${FRONTEND_ROUTES.DASHBOARD}/draws`, icon: Trophy },
    { name: "Referrals", href: `${FRONTEND_ROUTES.DASHBOARD}/referrals`, icon: Users },
    { name: "Wallet & Earnings", href: `${FRONTEND_ROUTES.DASHBOARD}/wallet`, icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <Link href={FRONTEND_ROUTES.DASHBOARD} className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            HyperStrike
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-40 h-[100dvh] w-64 border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 hidden md:flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            HyperStrike
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-8 md:py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-emerald-500/10 text-emerald-400 font-medium" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-zinc-400 group-hover:text-white"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* Decorative background blur */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="p-4 md:p-8 relative z-10 max-w-7xl mx-auto min-h-[calc(100dvh-65px)] md:min-h-[100dvh]">
          {children}
        </div>
      </main>
      
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
