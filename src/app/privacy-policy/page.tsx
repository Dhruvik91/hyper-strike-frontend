import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30">
      {/* Background Particles/Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <LandingHeader />

      <main className="flex-1 container mx-auto px-4 py-32 md:py-40 relative z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-8 md:p-16 border border-white/5">
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">Privacy Policy</h1>
            <p className="text-muted-foreground font-medium">Last Updated: May 2026</p>
          </div>

          <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight max-w-none">
            <ul className="space-y-6 list-none pl-0">
              <li className="pl-0"><strong>Data Collection:</strong> We collect only essential information required for your subscription, including your name, email address, and payment details.</li>
              <li className="pl-0"><strong>Data Security:</strong> All payment transactions are encrypted using SSL technology. We do not store your full credit card or bank details on our servers.</li>
              <li className="pl-0"><strong>Data Usage:</strong> Your data is used solely to manage your account, provide skill assessment analytics, and verify reward winners. We do not sell your data to third parties.</li>
              <li className="pl-0"><strong>Cookies:</strong> We use cookies to maintain your session and improve platform performance.</li>
              <li className="pl-0"><strong>International Transfer:</strong> As a UK-based entity, your data may be processed on secure global servers. By using the platform, you consent to this transfer.</li>
            </ul>

            <h2 className="mt-12">Dispute Resolution</h2>
            <p>
              "For any issues regarding subscriptions or rewards, please contact our support team directly before reaching out to your bank."
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
