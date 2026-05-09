import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { LandingHero } from "@/features/landing/components/LandingHero";
import { LandingStats } from "@/features/landing/components/LandingStats";
import { LandingVip } from "@/features/landing/components/LandingVip";
import { LandingRewards } from "@/features/landing/components/LandingRewards";
import { LandingFeatures } from "@/features/landing/components/LandingFeatures";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white overflow-x-hidden pb-24 md:pb-0 font-sans selection:bg-primary/30">
      {/* Premium Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <LandingHeader />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <LandingHero />

        {/* Stats Strip */}
        <LandingStats />

        {/* VIP Subscription Section */}
        <LandingVip />

        {/* Rewards Section */}
        <LandingRewards />

        {/* Feature Grid Section */}
        <LandingFeatures />
      </main>

      {/* Standard Comprehensive Footer */}
      <SiteFooter />

      {/* Mobile-only Bottom Navigation Bar */}
      <LandingFooter />
    </div>
  );
}
