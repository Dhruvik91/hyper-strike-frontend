import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { ContactForm } from "@/features/contact/components/ContactForm";

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30">
      {/* Background Particles/Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <LandingHeader />

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 relative z-10">
        <ContactForm />
      </main>

      <SiteFooter />
    </div>
  );
}
