export default function TermsAndConditionsPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-32 md:py-40 relative z-10 w-full">
      <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-8 md:p-16 border border-white/5">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">Terms & Conditions</h1>
          <p className="text-muted-foreground font-medium">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight max-w-none">
          <h2 className="mt-8">Disclaimer</h2>
          <p>
            Disclaimer: HyperStrikeX is a UK-based digital platform providing premium skill-based assessment and educational quiz services. The access fee is a subscription for digital content and platform features. HyperStrikeX does not offer "Online Money Gaming," betting, or gambling services. Participation in promotional challenges is based purely on skill, speed, and knowledge. Access is restricted to users aged 18+ in compliant jurisdictions. All transactions are governed by the laws of the United Kingdom.
          </p>

          <h2 className="mt-12">2. Core Terms & Conditions</h2>
          
          <h3 className="mt-8 text-xl font-bold">A. Nature of Service & Subscription:</h3>
          <p>
            No "Pay-to-Play": Frame the £1 as a "Monthly Membership Fee" that grants access to the platform and content.
          </p>
          <p>
            "The User acknowledges that the payment of GB £1 is a subscription fee for accessing HyperStrikeX's premium digital library, skill-based analytics, and quiz content. This is a SaaS (Software as a Service) agreement for digital content consumption and is not an entry fee for a lottery or game of chance."
          </p>

          <h3 className="mt-8 text-xl font-bold">B. Place of Contract & Global Jurisdiction:</h3>
          <p>
            "HyperStrikeX is a digital service owned and operated exclusively by a United Kingdom entity. All transactions are executed under UK law. Regardless of the User's physical location, by accessing the platform, the User is 'importing' digital services from the UK. HyperStrikeX does not maintain a permanent establishment, physical office, or local tax nexus in any jurisdiction outside of the United Kingdom."
          </p>

          <h3 className="mt-8 text-xl font-bold">C. Virtual Points & Social Rewards Policy:</h3>
          <p>
            "HyperStrikeX awards 'Platform Points' for subscriptions, referrals, and performance.
          </p>
          <ul className="space-y-4 list-disc pl-6">
            <li><strong>No Cash Value:</strong> Points are strictly non-monetary and hold zero cash value. They cannot be exchanged, redeemed, or converted into fiat currency or cryptocurrency.</li>
          </ul>
          <p className="mt-4">
            <strong>The Points System:</strong> Since points have no cash value and can only be used on the platform (e.g., for "Lifelines" or "Special Badges")
          </p>
          <ul className="space-y-4 list-disc pl-6 mt-4">
            <li><strong>In-Platform Use:</strong> Points are intended solely for unlocking features and content within HyperStrikeX.</li>
            <li><strong>Transfer Rules:</strong> Transfers between users are for personal, social purposes only. Any user caught selling points for real money outside the platform will face an immediate permanent ban and forfeiture of all points."</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold">D. Skill-Based Performance:</h3>
          <p>
            "This is a skill-based competition. Winners are determined solely by speed and accuracy of answers. No element of chance is involved."
          </p>
          <p>
            "All promotional rewards (e.g., Global Leaderboard Rewards like iPhones) are awarded based on objective performance metrics including speed and accuracy. There is no 'Random Number Generator' (RNG) or element of luck. Outcomes are determined strictly by the User's cognitive and physical input."
          </p>

          <h3 className="mt-8 text-xl font-bold">E. International Tax & Compliance:</h3>
          <p>
            "The subscription fee is a cross-border payment for digital content and is exclusive of any local taxes, duties, or levies in the User's country. As an international service provider, HyperStrikeX is not responsible for the User's local tax obligations (including any tax). The User is solely responsible for declaring and paying any applicable taxes required by their local authorities for the 'import' of this digital service."
          </p>

          <h2 className="mt-12">3. Refund & Chargeback Policy</h2>
          <p>
            "Finality of Purchase: Due to the immediate delivery of digital content and 'Platform Points,' all subscriptions are final and non-refundable. By using even one point or accessing any quiz, the User waives their right to a refund. Any fraudulent 'chargeback' claims will be reported to our risk partners (Payment gateways) and may result in legal action or reporting to credit bureaus."
          </p>

          <h2 className="mt-12">4. Referral Integrity Clause</h2>
          <p>
            "Referral Rewards: Referral points are only credited after the 'Successful Subscription' of the referred party. HyperStrikeX reserves the right to audit referral chains and cancel points earned through fraudulent account creation or botting."
          </p>

          <h2 className="mt-12">Company Information</h2>
          <ul className="space-y-4 list-disc pl-6">
            <li><strong>Registered Office Address:</strong> wait</li>
            <li><strong>Company Number:</strong> wait</li>
            <li><strong>Official Email:</strong> support@hyperstrikex.co.uk</li>
            <li><strong>Response Time:</strong> "We aim to respond to all inquiries within 24-48 business hours."</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
