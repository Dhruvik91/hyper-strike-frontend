import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Disc as Discord, Mail, MapPin } from "lucide-react";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 relative overflow-hidden pt-20 pb-12 md:pb-24 lg:pb-12 px-4 md:px-8 mt-20">
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative z-10">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 group w-max">
            <div className="relative w-10 h-10 glow-primary rounded-full border border-primary/50 p-1 bg-black group-hover:scale-105 transition-transform duration-300">
              <Image src="/images/hero-h.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-300">HYPER<span className="text-gradient-gold">STRIKEX</span></span>
              <span className="text-[8px] tracking-[0.3em] text-muted-foreground font-black uppercase">Play. Learn. Win.</span>
            </div>
          </Link>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
            The ultimate platform merging cutting-edge tech, engaging trivia, and an elite community. Claim your spot on the leaderboard.
          </p>
          <div className="flex gap-4">
            <Link href="https://twitter.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="https://discord.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
              <Discord className="w-4 h-4" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6 lg:ml-auto">
          <h3 className="text-white font-black uppercase tracking-widest text-sm">Explore</h3>
          <nav className="flex flex-col gap-4">
            {[
              { label: "Home", href: FRONTEND_ROUTES.HOME },
              { label: "Trivia", href: FRONTEND_ROUTES.PUBLIC.TRIVIA },
              { label: "Community", href: FRONTEND_ROUTES.PUBLIC.COMMUNITY },
              { label: "Rewards", href: FRONTEND_ROUTES.PUBLIC.REWARDS },
              { label: "VIP Club", href: FRONTEND_ROUTES.PUBLIC.VIP },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium w-max">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-6 lg:ml-auto">
          <h3 className="text-white font-black uppercase tracking-widest text-sm">Legal & Help</h3>
          <nav className="flex flex-col gap-4">
            {[
              { label: "Contact Us", href: FRONTEND_ROUTES.PUBLIC.CONTACT },
              { label: "Privacy Policy", href: FRONTEND_ROUTES.PUBLIC.PRIVACY },
              { label: "Terms & Conditions", href: FRONTEND_ROUTES.PUBLIC.TERMS },
              { label: "FAQ", href: FRONTEND_ROUTES.PUBLIC.FAQ },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium w-max">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 lg:ml-auto">
          <h3 className="text-white font-black uppercase tracking-widest text-sm">Contact</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Email Support</span>
                <a href="mailto:support@hyperstrikex.co.uk" className="text-white hover:text-primary transition-colors text-sm font-medium mt-1">support@hyperstrikex.co.uk</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Headquarters</span>
                <span className="text-white text-sm font-medium mt-1">123 Innovation Drive<br/>Tech City, TC 90210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">
        <p className="text-muted-foreground text-xs font-medium">
          © {currentYear} HyperStrikeX. All rights reserved.
        </p>
        <p className="text-muted-foreground text-xs font-medium flex items-center gap-1">
          Designed with <span className="text-primary animate-pulse">♥</span> for the community.
        </p>
      </div>
    </footer>
  );
}
