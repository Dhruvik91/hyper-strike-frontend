export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 container max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-32 relative z-10 w-full">
      <div className="w-full">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
            HyperStrikeX Global Privacy Policy
          </h1>
          <p className="text-muted-foreground font-medium">Effective Date: April, 2026</p>
        </div>

        <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
          <p className="mb-6 leading-relaxed text-base md:text-lg">
            HyperStrikeX Ltd is a company incorporated in England and Wales (Registration Number: 17210389) whose registered office is at [Silverstream House,45 Fitzroy Street, Fitzrovia,London,W1T 6EB GB] (hereafter referred to as 'HyperStrikeX', 'we', 'our', or 'us').
          </p>
          <p className="mb-6 leading-relaxed text-base md:text-lg">
            This Privacy Policy applies directly to your use of the HyperStrikeX digital platform, our cognitive assessment modules, websites hosted under our domain, and the internal platform credit system ('Platform Points'). This document sets out the legal basis on which any personal data we collect from you, or that you provide to us, will be securely stored and processed by our servers under United Kingdom data protection principles.
          </p>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            Minimum Age Requirement
          </h2>
          <p className="mb-6 leading-relaxed text-base md:text-lg">
            Please note that you must be aged 18 years or older to subscribe, use the Services, or participate in any skill-based assessment on HyperStrikeX. We do not knowingly collect or solicit data from anyone under the age of 18. If we discover that an account has been created by a minor, the account along with all virtual points will be permanently deleted without notice.
          </p>
          <p className="mb-6 leading-relaxed text-base md:text-lg">
            HyperStrikeX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal data is collected, processed, secured, and transferred when you use our global SaaS platform. By subscribing to our services, you consent to the practices described below.
          </p>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            1. Detailed Data Collection &amp; Processing
          </h2>
          <p className="mb-5 leading-relaxed text-base md:text-lg">
            We process personal data strictly to deliver our cognitive assessment software and maintain platform integrity. We collect the following categories of information:
          </p>
          <ul className="space-y-4 text-muted-foreground mb-8 pl-6 list-disc text-base md:text-lg">
            <li className="leading-relaxed"><strong>Account Registration Data:</strong> Full name, registered phone number (used for WhatsApp OTP verification), email address, and unique user identification numbers.</li>
            <li className="leading-relaxed"><strong>Performance Metrics:</strong> Speed of answers, precision data, cognitive test scores, leaderboard position, and response patterns.</li>
            <li className="leading-relaxed"><strong>Technical &amp; Device Logging:</strong> Hardware fingerprints, IP addresses, unique Device IDs, operating system details, browser type, proxy/VPN status, and access timestamps.</li>
            <li className="leading-relaxed"><strong>Transaction Metadata:</strong> Date/time of subscription, currency, transaction status, and unique payment references. <em>Note: We never collect, process, or store raw credit card numbers or banking passwords.</em></li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            2. Legal Basis for Processing &amp; Data Usage
          </h2>
          <p className="mb-5 leading-relaxed text-base md:text-lg">
            We process your data under the legal frameworks of contractual necessity, legitimate business interests, and compliance. Your information is utilized to:
          </p>
          <ul className="space-y-4 text-muted-foreground mb-8 pl-6 list-disc text-base md:text-lg">
            <li className="leading-relaxed">Provision your SaaS subscription and authenticate logins.</li>
            <li className="leading-relaxed">Audit leaderboard accuracy to ensure rewards are given based purely on verified objective skill, preventing bot farm exploitation.</li>
            <li className="leading-relaxed">Detect, investigate, and prevent automated script execution, multiple account abuse, and fraudulent chargeback attempts.</li>
            <li className="leading-relaxed">Communicate transactional status, system updates, and prize validation steps via your verified WhatsApp number or email address.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            3. Data Retention &amp; Automatic Forfeiture
          </h2>
          <p className="mb-5 leading-relaxed text-base md:text-lg">
            We retain your personal information only as long as your account remains active or as required to fulfill legal tax and accounting obligations under United Kingdom law.
          </p>
          <ul className="space-y-4 text-muted-foreground mb-8 pl-6 list-disc text-base md:text-lg">
            <li className="leading-relaxed">Accounts flagged and permanently banned for violating our terms (e.g., bot usage or selling points) will have their technical data permanently archived in our internal risk registry to prevent future re-registration.</li>
            <li className="leading-relaxed">Upon explicit account deletion requests, your data will be permanently wiped from our active databases within thirty (30) business days, subject to unresolved fraud investigations.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            4. Advanced Data Security &amp; Payment Isolation
          </h2>
          <p className="mb-5 leading-relaxed text-base md:text-lg">
            To ensure institutional-grade protection, HyperStrikeX deploys robust technical protocols:
          </p>
          <ul className="space-y-4 text-muted-foreground mb-8 pl-6 list-disc text-base md:text-lg">
            <li className="leading-relaxed"><strong>Encryption Standards:</strong> All data in transit is shielded using Secure Sockets Layer (SSL) and Transport Layer Security (TLS) encryption.</li>
            <li className="leading-relaxed"><strong>Payment Isolation:</strong> All financial processing is safely isolated and managed entirely by our verified, PCI-DSS compliant third-party payment gateways.</li>
            <li className="leading-relaxed"><strong>Server-Side Access Control:</strong> Database access is strictly restricted to authorized security personnel via encrypted JSON Web Tokens (JWT).</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            5. International Data Transfers &amp; Global Hosting
          </h2>
          <p className="mb-8 leading-relaxed text-base md:text-lg">
            HyperStrikeX is operated by a United Kingdom entity. However, to maintain low-latency speeds for our global users, your data may be hosted, processed, or mirrored on secure cloud servers globally. By accessing the platform, users acknowledge and explicitly consent to the cross-border transfer of their information to secure central servers.
          </p>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            6. Strict No-Sale &amp; Third-Party Disclosure Policy
          </h2>
          <p className="mb-5 leading-relaxed text-base md:text-lg">
            We enforce a zero-tolerance policy against the commercialization of user data. We do not sell, rent, or trade your personal information to third-party advertisers. Information is only disclosed to third parties under the following strict conditions:
          </p>
          <ul className="space-y-4 text-muted-foreground mb-8 pl-6 list-disc text-base md:text-lg">
            <li className="leading-relaxed">To compliant IT infrastructure services (e.g., cloud hosting, automated WhatsApp API delivery systems, and fraud prevention suites).</li>
            <li className="leading-relaxed">To risk partners and payment networks to settle transactional disputes or investigate chargeback claims.</li>
            <li className="leading-relaxed">If legally compelled by law enforcement or regulatory authorities governing the United Kingdom.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            7. Cookies, Tracking &amp; Technical Storage
          </h2>
          <p className="mb-8 leading-relaxed text-base md:text-lg">
            Our platform utilizes functional cookies, local web storage, and session identifiers. These are required to maintain your active login status, ensure fair-play timing metrics during live quizzes, and optimize server-side page speeds. Disabling cookies in your browser settings may limit your ability to access premium SaaS content.
          </p>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-12 mb-5">
            Privacy Policy Summary
          </h2>
          <ul className="space-y-4 text-muted-foreground mb-8 pl-6 list-disc text-base md:text-lg">
            <li className="leading-relaxed"><strong>Data Collection:</strong> We collect only essential information required for your subscription, including your name, email address, and payment details.</li>
            <li className="leading-relaxed"><strong>Data Security:</strong> All payment transactions are encrypted using SSL technology. We do not store your full credit card or bank details on our servers.</li>
            <li className="leading-relaxed"><strong>Data Usage:</strong> Your data is used solely to manage your account, provide skill assessment analytics, and verify reward winners. We do not sell your data to third parties.</li>
            <li className="leading-relaxed"><strong>Cookies:</strong> We use cookies to maintain your session and improve platform performance.</li>
            <li className="leading-relaxed"><strong>International Transfer:</strong> As a UK-based entity, your data may be processed on secure global servers. By using the platform, you consent to this international transfer.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
