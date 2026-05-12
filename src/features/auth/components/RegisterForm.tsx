"use client";

import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, Lock, Phone, UserPlus, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { registerSchema, RegisterInput } from "@/lib/validations/auth";

interface RegisterFormProps {
  onSubmit: (values: RegisterInput) => void;
  isLoading: boolean;
  showOtp: boolean;
  onVerifyOtp: (otp: string) => void;
  onGoBack: () => void;
}

export function RegisterForm({ onSubmit, isLoading, showOtp, onVerifyOtp, onGoBack }: RegisterFormProps) {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      whatsapp_number: "",
      password: "",
      referral_code: "",
      first_name: "",
      last_name: "",
    },
  });


  return (
    <Card className="glass-card border border-white/5 overflow-hidden">
      <AnimatePresence mode="wait">
        {!showOtp ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader className="space-y-1 pb-6 text-center">
              <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                Get Started
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium">
                Join HyperStrike and start winning today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">Email</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 pl-12 transition-all hover:bg-white/10 text-white"
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">WhatsApp Number</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <Input
                              placeholder="+123 456 7890"
                              type="tel"
                              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 pl-12 transition-all hover:bg-white/10 text-white"
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <Input
                              placeholder="Min 8 characters"
                              type="password"
                              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 pl-12 transition-all hover:bg-white/10 text-white"
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referral_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">Referral Code (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <Input
                              placeholder="HSR-XXXXXX"
                              type="text"
                              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 pl-12 transition-all hover:bg-white/10 text-white"
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs ml-1" />
                      </FormItem>
                    )}
                  />

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-primary glow-primary text-white font-black text-sm uppercase tracking-widest border border-primary/50 transition-all shadow-[0_0_20px_rgba(161,0,255,0.4)]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Sending OTP...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Get Otp</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            <div className="text-center space-y-3 mb-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20 glow-primary">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">
                Verify WhatsApp
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium max-w-sm mx-auto">
                We've sent a 6-digit confirmation code to your WhatsApp. Enter it below to secure your account.
              </CardDescription>
            </div>

            <div className="space-y-6 max-w-sm mx-auto">
              <div className="space-y-4">
                <Input
                  placeholder="EX: 123456"
                  className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-14 text-center text-xl font-black tracking-[0.5em] transition-all hover:bg-white/10 text-white"
                  onChange={(e) => {
                    if (e.target.value.length === 6) {
                      onVerifyOtp(e.target.value);
                    }
                  }}
                />
                <p className="text-center text-xs text-zinc-500 font-medium">
                  Didn't receive the code? <button className="text-primary hover:underline font-bold uppercase tracking-wider">Resend OTP</button>
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  variant="ghost"
                  onClick={onGoBack}
                  className="w-full h-12 text-zinc-400 hover:text-white hover:bg-white/5 flex items-center gap-2 justify-center"
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Change Details</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CardFooter className="flex flex-col items-center justify-center border-t border-white/5 bg-white/[0.02] py-6">
        <p className="text-sm text-zinc-400 font-medium">
          Already have an account?{" "}
          <Link href={FRONTEND_ROUTES.LOGIN} className="text-primary hover:text-primary/80 font-bold uppercase tracking-wider transition-colors ml-1">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
