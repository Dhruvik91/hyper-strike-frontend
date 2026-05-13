export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-32 md:py-40 relative z-10 w-full">
      <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-8 md:p-16 border border-white/5">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">HyperStrikeX Global Privacy Policy</h1>
          <p className="text-muted-foreground font-medium">Effective Date: April, 2026</p>
        </div>

        <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight max-w-none">
          <p>
            HyperStrikeX Ltd is a company incorporated in England and Wales (Registration Number: 17210389) whose registered office is at [Silverstream House,45 Fitzroy Street, Fitzrovia,London,W1T 6EB GB] (hereafter referred to as 'HyperStrikeX', 'we', 'our', or 'us').
          </p>
          <p>
            This Privacy Policy applies directly to your use of the HyperStrikeX digital platform, our cognitive assessment modules, websites hosted under our domain, and the internal platform credit system ('Platform Points'). This document sets out the legal basis on which any personal data we collect from you, or that you provide to us, will be securely stored and processed by our servers under United Kingdom data protection principles.
          </p>

          <h2 className="mt-12">Minimum Age Requirement</h2>
          <p>
            Please note that you must be aged 18 years or older to subscribe, use the Services, or participate in any skill-based assessment on HyperStrikeX. We do not knowingly collect or solicit data from anyone under the age of 18. If we discover that an account has been created by a minor, the account along with all virtual points will be permanently deleted without notice.
          </p>
          <p>
            HyperStrikeX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal data is collected, processed, secured, and transferred when you use our global SaaS platform. By subscribing to our services, you consent to the practices described below.
          </p>

          <h2 className="mt-12">1. Detailed Data Collection &amp; Processing</h2>
          <p>
            We process personal data strictly to deliver our cognitive assessment software and maintain platform integrity. We collect the following categories of information:
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li><strong>Account Registration Data:</strong> Full name, registered phone number (used for WhatsApp OTP verification), email address, and unique user identification numbers.</li>
            <li><strong>Performance Metrics:</strong> Speed of answers, precision data, cognitive test scores, leaderboard position, and response patterns.</li>
            <li><strong>Technical &amp; Device Logging:</strong> Hardware fingerprints, IP addresses, unique Device IDs, operating system details, browser type, proxy/VPN status, and access timestamps.</li>
            <li><strong>Transaction Metadata:</strong> Date/time of subscription, currency, transaction status, and unique payment references. <em>Note: We never collect, process, or store raw credit card numbers or banking passwords.</em></li>
          </ul>

          <h2 className="mt-12">2. Legal Basis for Processing &amp; Data Usage</h2>
          <p>
            We process your data under the legal frameworks of contractual necessity, legitimate business interests, and compliance. Your information is utilized to:
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li>Provision your SaaS subscription and authenticate logins.</li>
            <li>Audit leaderboard accuracy to ensure rewards are given based purely on verified objective skill, preventing bot farm exploitation.</li>
            <li>Detect, investigate, and prevent automated script execution, multiple account abuse, and fraudulent chargeback attempts.</li>
            <li>Communicate transactional status, system updates, and prize validation steps via your verified WhatsApp number or email address.</li>
          </ul>

          <h2 className="mt-12">3. Data Retention &amp; Automatic Forfeiture</h2>
          <p>
            We retain your personal information only as long as your account remains active or as required to fulfill legal tax and accounting obligations under United Kingdom law.
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li>Accounts flagged and permanently banned for violating our terms (e.g., bot usage or selling points) will have their technical data permanently archived in our internal risk registry to prevent future re-registration.</li>
            <li>Upon explicit account deletion requests, your data will be permanently wiped from our active databases within thirty (30) business days, subject to unresolved fraud investigations.</li>
          </ul>

          <h2 className="mt-12">4. Advanced Data Security &amp; Payment Isolation</h2>
          <p>
            To ensure institutional-grade protection, HyperStrikeX deploys robust technical protocols:
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li><strong>Encryption Standards:</strong> All data in transit is shielded using Secure Sockets Layer (SSL) and Transport Layer Security (TLS) encryption.</li>
            <li><strong>Payment Isolation:</strong> All financial processing is safely isolated and managed entirely by our verified, PCI-DSS compliant third-party payment gateways.</li>
            <li><strong>Server-Side Access Control:</strong> Database access is strictly restricted to authorized security personnel via encrypted JSON Web Tokens (JWT).</li>
          </ul>

          <h2 className="mt-12">5. International Data Transfers &amp; Global Hosting</h2>
          <p>
            HyperStrikeX is operated by a United Kingdom entity. However, to maintain low-latency speeds for our global users, your data may be hosted, processed, or mirrored on secure cloud servers globally. By accessing the platform, users acknowledge and explicitly consent to the cross-border transfer of their information to secure central servers.
          </p>

          <h2 className="mt-12">6. Strict No-Sale &amp; Third-Party Disclosure Policy</h2>
          <p>
            We enforce a zero-tolerance policy against the commercialization of user data. We do not sell, rent, or trade your personal information to third-party advertisers. Information is only disclosed to third parties under the following strict conditions:
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li>To compliant IT infrastructure services (e.g., cloud hosting, automated WhatsApp API delivery systems, and fraud prevention suites).</li>
            <li>To risk partners and payment networks to settle transactional disputes or investigate chargeback claims.</li>
            <li>If legally compelled by law enforcement or regulatory authorities governing the United Kingdom.</li>
          </ul>

          <h2 className="mt-12">7. Cookies, Tracking &amp; Technical Storage</h2>
          <p>
            Our platform utilizes functional cookies, local web storage, and session identifiers. These are required to maintain your active login status, ensure fair-play timing metrics during live quizzes, and optimize server-side page speeds. Disabling cookies in your browser settings may limit your ability to access premium SaaS content.
          </p>

          <h2 className="mt-12">Privacy Policy</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li><strong>Data Collection:</strong> We collect only essential information required for your subscription, including your name, email address, and payment details.</li>
            <li><strong>Data Security:</strong> All payment transactions are encrypted using SSL technology. We do not store your full credit card or bank details on our servers.</li>
            <li><strong>Data Usage:</strong> Your data is used solely to manage your account, provide skill assessment analytics, and verify reward winners. We do not sell your data to third parties.</li>
            <li><strong>Cookies:</strong> We use cookies to maintain your session and improve platform performance.</li>
            <li><strong>International Transfer:</strong> As a UK-based entity, your data may be processed on secure global servers. By using the platform, you consent to this international transfer.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
