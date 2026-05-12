"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Lock, ArrowRight, Phone } from "lucide-react";
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

import { loginSchema, LoginInput } from "@/lib/validations/auth";

interface LoginFormProps {
  onSubmit: (values: LoginInput) => void;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      whatsapp_number: "",
      password: "",
    },
  });




  return (
    <Card className="glass-card border border-white/5 overflow-hidden">
      <CardHeader className="space-y-1 pb-6 text-center">
        <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
          Sign In
        </CardTitle>
        <CardDescription className="text-muted-foreground font-medium">
          Enter your details to access your HyperStrike account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 pl-12 transition-all hover:bg-white/10 active:scale-[0.99] text-white"
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
                  <div className="flex items-center justify-between ml-1">
                    <FormLabel className="text-zinc-300 font-medium">Password</FormLabel>
                    <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold uppercase tracking-widest">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                      <Input
                        placeholder="••••••••"
                        type="password"
                        className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 pl-12 transition-all hover:bg-white/10 active:scale-[0.99] text-white"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs ml-1" />
                </FormItem>
              )}
            />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-primary glow-primary text-white font-black text-lg uppercase tracking-widest border border-primary/50 transition-all shadow-[0_0_20px_rgba(161,0,255,0.4)]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center border-t border-white/5 bg-white/[0.02] py-6">
        <p className="text-sm text-zinc-400">
          New to HyperStrike?{" "}
          <Link href={FRONTEND_ROUTES.REGISTER} className="text-primary hover:text-primary/80 font-bold uppercase tracking-wider transition-colors ml-1">
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
