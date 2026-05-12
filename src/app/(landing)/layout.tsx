import React from "react";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      {/* Premium Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <LandingHeader />

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col">
        {children}
      </div>

      {/* Standard Comprehensive Footer */}
      <SiteFooter />
    </div>
  );
}
