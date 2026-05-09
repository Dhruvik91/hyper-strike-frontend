"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { useProfileQuery, useLogoutMutation } from "@/hooks/queries/use-auth";
import { UserRole } from "@/constants/interface";

import {
  Menu,
  X,
  LayoutDashboard,
  Ticket,
  Trophy,
  Wallet,
  Users,
  LogOut,
  Settings,
  ShieldCheck,
  CreditCard,
  History,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: user, isLoading: isProfileLoading, isError: isProfileError } = useProfileQuery();
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    if (isProfileError) {
      router.push(FRONTEND_ROUTES.LOGIN);
    }
  }, [isProfileError, router]);

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin glow-primary" />
          <p className="text-muted-foreground animate-pulse font-medium uppercase tracking-widest text-xs">Loading your striking experience...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const role = user.role_id;

  const getNavigation = () => {
    const common = [
      { name: "Overview", href: role === UserRole.SUPER_ADMIN ? FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD : (role === UserRole.ADMIN ? FRONTEND_ROUTES.ADMIN.DASHBOARD : FRONTEND_ROUTES.USER.DASHBOARD), icon: LayoutDashboard },
    ];

    if (role === UserRole.USER) {
      return [
        ...common,
        { name: "My Tickets", href: FRONTEND_ROUTES.USER.TICKETS, icon: Ticket },
        { name: "Lucky Draws", href: FRONTEND_ROUTES.USER.DRAWS || "/dashboard/draws", icon: Trophy },
        { name: "Referrals", href: FRONTEND_ROUTES.USER.REFERRALS, icon: Users },
        { name: "Wallet", href: FRONTEND_ROUTES.USER.WALLET, icon: Wallet },
        { name: "Withdrawals", href: FRONTEND_ROUTES.USER.WITHDRAWALS, icon: History },
      ];
    }

    if (role === UserRole.ADMIN) {
      return [
        ...common,
        { name: "Commissions", href: FRONTEND_ROUTES.ADMIN.COMMISSIONS, icon: CreditCard },
        { name: "My Referrals", href: FRONTEND_ROUTES.ADMIN.REFERRALS, icon: Users },
        { name: "Withdrawals", href: "/dashboard/withdrawals", icon: History },
      ];
    }

    if (role === UserRole.SUPER_ADMIN) {
      return [
        ...common,
        { name: "User Management", href: FRONTEND_ROUTES.SUPER_ADMIN.USERS, icon: Users },
        { name: "Lucky Draws", href: FRONTEND_ROUTES.SUPER_ADMIN.DRAWS, icon: Trophy },
        { name: "Withdrawals", href: FRONTEND_ROUTES.SUPER_ADMIN.WITHDRAWALS, icon: History },
        { name: "Platform Config", href: FRONTEND_ROUTES.SUPER_ADMIN.CONFIG, icon: Settings },
      ];
    }

    return common;
  };

  const navigation = getNavigation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row selection:bg-primary/30">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-3xl sticky top-0 z-50">
        <Link href={FRONTEND_ROUTES.HOME} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 glow-primary rounded-full border border-primary/50 p-1 bg-black group-hover:scale-105 transition-transform duration-300">
             <img src="/images/hero-h.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">
            HYPER<span className="text-gradient-gold">STRIKEX</span>
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-[100dvh] w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-8 hidden md:flex items-center gap-3">
          <Link href={FRONTEND_ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 glow-primary rounded-full border border-primary/50 p-1 bg-black group-hover:scale-105 transition-transform duration-300">
               <img src="/images/hero-h.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">
              HYPER<span className="text-gradient-gold">STRIKEX</span>
            </span>
          </Link>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-primary border border-primary/50 flex items-center justify-center text-white font-black text-lg glow-primary shadow-[0_0_15px_rgba(161,0,255,0.5)]">
            {user.first_name?.[0] || user.whatsapp_number?.[0] || 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-white truncate uppercase tracking-widest">{user.first_name || 'Striker'}</span>
            <span className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-widest">{user.whatsapp_number}</span>
          </div>
          {role === UserRole.SUPER_ADMIN && (
            <ShieldCheck className="h-4 w-4 text-amber-400 ml-auto shrink-0" />
          )}
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">Menu</div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${isActive
                    ? "bg-primary/20 text-white shadow-[0_0_15px_rgba(161,0,255,0.2)] border border-primary/30"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(161,0,255,1)]"
                  />
                )}
                <item.icon className={`h-5 w-5 ${isActive ? "text-primary drop-shadow-[0_0_5px_rgba(161,0,255,0.8)]" : "text-muted-foreground group-hover:text-white transition-colors"}`} />
                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full justify-start text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all rounded-xl h-12"
          >
            {logoutMutation.isPending ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="mr-3 h-5 w-5" />
            )}
            <span className="font-semibold text-sm">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative min-h-screen overflow-hidden">
        {/* Animated gradients for premium feel */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="p-4 md:p-10 relative z-10 max-w-7xl mx-auto">
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

