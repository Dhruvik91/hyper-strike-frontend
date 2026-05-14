"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    toast.success("Message sent successfully! We will get back to you soon.");
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto glass-card rounded-[32px] p-6 md:p-10 relative overflow-hidden h-full flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 mb-8 text-center">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Get in Touch</h2>
        <p className="text-muted-foreground text-sm font-medium">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Name</label>
          <input
            {...register("name")}
            id="name"
            disabled={isSubmitting}
            className={`w-full bg-white/5 border ${errors.name ? 'border-destructive' : 'border-white/10'} rounded-xl h-14 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-muted-foreground/50`}
            placeholder="John Doe"
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="text-xs text-destructive font-medium pl-2">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            disabled={isSubmitting}
            className={`w-full bg-white/5 border ${errors.email ? 'border-destructive' : 'border-white/10'} rounded-xl h-14 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-muted-foreground/50`}
            placeholder="john@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="text-xs text-destructive font-medium pl-2">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Subject</label>
          <input
            {...register("subject")}
            id="subject"
            disabled={isSubmitting}
            className={`w-full bg-white/5 border ${errors.subject ? 'border-destructive' : 'border-white/10'} rounded-xl h-14 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-muted-foreground/50`}
            placeholder="How can we help?"
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <span className="text-xs text-destructive font-medium pl-2">{errors.subject.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Message</label>
          <textarea
            {...register("message")}
            id="message"
            disabled={isSubmitting}
            rows={5}
            className={`w-full bg-white/5 border ${errors.message ? 'border-destructive' : 'border-white/10'} rounded-xl p-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-muted-foreground/50 resize-none`}
            placeholder="Write your message here..."
            aria-invalid={!!errors.message}
          />
          {errors.message && <span className="text-xs text-destructive font-medium pl-2">{errors.message.message}</span>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 mt-4 bg-gradient-primary glow-primary text-white font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>SENDING...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>SEND MESSAGE</span>
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
