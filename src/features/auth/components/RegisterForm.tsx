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

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  whatsapp: z.string().min(10, { message: "Please enter a valid WhatsApp number." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  referralCode: z.string().optional(),
});

export type RegisterValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (values: RegisterValues) => void;
  isLoading: boolean;
  showOtp: boolean;
  onVerifyOtp: (otp: string) => void;
  onGoBack: () => void;
}

export function RegisterForm({ onSubmit, isLoading, showOtp, onVerifyOtp, onGoBack }: RegisterFormProps) {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      whatsapp: "",
      password: "",
      referralCode: "",
    },
  });

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] overflow-hidden">
      <AnimatePresence mode="wait">
        {!showOtp ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader className="space-y-1 pb-8 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight text-white">
                Get Started
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Join HyperStrike and start winning today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">Email</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="name@example.com" 
                              type="email"
                              className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500/50 h-13 pl-12 transition-all hover:bg-zinc-900/80"
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
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">WhatsApp Number</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="+123 456 7890" 
                              type="tel"
                              className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500/50 h-13 pl-12 transition-all hover:bg-zinc-900/80"
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
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="Min 8 characters" 
                              type="password"
                              className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500/50 h-13 pl-12 transition-all hover:bg-zinc-900/80"
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
                    name="referralCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 font-medium ml-1">Referral Code (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="HSR-XXXXXX" 
                              type="text"
                              className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500/50 h-13 pl-12 transition-all hover:bg-zinc-900/80"
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
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg shadow-[0_4px_20px_rgba(37,99,235,0.3)] border-0 transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Sending OTP...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Continue to WhatsApp OTP</span>
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
              <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight text-white text-center">
                Verify WhatsApp
              </CardTitle>
              <CardDescription className="text-zinc-400 max-w-sm mx-auto">
                We've sent a 6-digit confirmation code to your WhatsApp. Enter it below to secure your account.
              </CardDescription>
            </div>
            
            <div className="space-y-6 max-w-sm mx-auto">
              <div className="space-y-4">
                <Input 
                  placeholder="EX: 123456" 
                  className="bg-zinc-900/50 border-white/10 focus-visible:ring-emerald-500/50 h-16 text-center text-2xl font-bold tracking-[0.5em] transition-all hover:bg-zinc-900/80"
                  onChange={(e) => {
                    if (e.target.value.length === 6) {
                      onVerifyOtp(e.target.value);
                    }
                  }}
                />
                <p className="text-center text-xs text-zinc-500">
                  Didn't receive the code? <button className="text-emerald-400 hover:underline font-semibold">Resend OTP</button>
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
        <p className="text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href={FRONTEND_ROUTES.LOGIN} className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
