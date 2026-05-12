"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FRONTEND_ROUTES } from "@/constants/constants";

const NAV_LINKS = [
  { label: "Home", href: FRONTEND_ROUTES.HOME },
  { label: "Trivia", href: FRONTEND_ROUTES.PUBLIC.TRIVIA },
  { label: "Community", href: FRONTEND_ROUTES.PUBLIC.COMMUNITY },
];

export function LandingHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 h-18 md:h-20 px-4 md:px-8 flex items-center justify-between backdrop-blur-3xl bg-black/40 border-b border-white/5 z-40">
      {/* Left: Logo & Mobile Menu */}
      <div className="flex items-center gap-3 md:gap-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/5 rounded-xl border border-white/5">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#050505] border-r border-white/10 p-6 flex flex-col w-[300px]">
            <SheetHeader className="text-left mb-8">
              <SheetTitle className="flex flex-col gap-1">
                <span className="text-xl md:text-2xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">HYPER<span className="text-gradient-gold">STRIKEX</span></span>
              </SheetTitle>
              <SheetDescription className="text-xs tracking-[0.2em] text-muted-foreground font-bold uppercase">
                Navigation Menu
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-4 flex-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors border ${
                    isActive
                      ? "bg-primary/20 text-white border-primary/30 shadow-[0_0_15px_rgba(161,0,255,0.2)]"
                      : "text-white hover:bg-white/10 border-transparent hover:border-white/5"
                  }`}
                >
                  {link.label}
                </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
              <Link href={FRONTEND_ROUTES.LOGIN} className="w-full">
                <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider h-12">
                  Sign In
                </Button>
              </Link>
              <Link href={FRONTEND_ROUTES.REGISTER} className="w-full">
                <Button className="w-full bg-primary text-white font-bold uppercase tracking-wider rounded-lg h-12 shadow-[0_0_20px_rgba(161,0,255,0.4)]">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 glow-primary rounded-full border border-primary/50 p-1 bg-black group-hover:scale-105 transition-transform duration-300">
            <Image src="/images/home-logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">HYPER<span className="text-gradient-gold">STRIKEX</span></span>
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-muted-foreground font-black uppercase hidden sm:block">Tech • Trivia • Community</span>
          </div>
        </Link>
      </div>

      {/* Center: Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
        {NAV_LINKS.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
          <Link
            key={link.label}
            href={link.href}
            className={`px-5 py-2 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-widest transition-all duration-300
              ${isActive
                ? "bg-primary/20 text-white shadow-[0_0_20px_rgba(161,0,255,0.3)] border border-primary/30"
                : "text-muted-foreground hover:text-white hover:bg-white/10 border border-transparent"}`}
          >
            {link.label}
          </Link>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link
          href={FRONTEND_ROUTES.LOGIN}
          className="text-muted-foreground hover:text-primary text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors hidden sm:block"
        >
          Sign In
        </Link>
        <Link href={FRONTEND_ROUTES.REGISTER}>
          <Button className="bg-gradient-primary glow-primary text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full px-6 md:px-8 py-2 md:py-2.5 h-auto border border-primary/50 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(161,0,255,0.4)] hidden sm:block">
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}
