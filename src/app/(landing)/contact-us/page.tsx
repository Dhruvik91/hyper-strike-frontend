import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { ContactDepartments } from "@/features/contact/components/ContactDepartments";

export const metadata: Metadata = {
  title: "Contact Us | Hyper-Strike Direct Departments & Secure Portal",
  description:
    "Get in touch with Hyper-Strike departments directly. Access our dedicated user support, brand partnerships, advertising, and career application channels with secure, high-fidelity routing.",
};

export default function ContactUsPage() {
  return (
    <main className="w-full flex-1 relative overflow-hidden pt-24 pb-20 flex flex-col">
      {/* Background Cinematic Ambience Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* Superior SEO-Optimized Page Header */}
        <div className="text-center mb-10 md:mb-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-4 text-glow-primary">
            Contact <span className="text-gradient-primary">Hyper-Strike</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium">
            Connect with our targeted departments directly via encrypted channels, or submit your query through our high-speed support portal below.
          </p>
        </div>

        {/* Fully Responsive Side-by-Side / Stacked Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-stretch relative z-10">
          <ContactDepartments />
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
