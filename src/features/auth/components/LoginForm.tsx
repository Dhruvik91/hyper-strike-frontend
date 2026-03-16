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
    <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden">
      <CardHeader className="space-y-1 pb-8 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight text-white">
          Sign In
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Enter your details to access your HyperStrike account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="whatsapp_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300 font-medium ml-1">WhatsApp Number</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                      <Input
                        placeholder="+123 456 7890"
                        type="tel"
                        className="bg-zinc-900/50 border-white/10 focus-visible:ring-emerald-500/50 h-14 pl-12 transition-all hover:bg-zinc-900/80 active:scale-[0.99]"
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
                    <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                      <Input
                        placeholder="••••••••"
                        type="password"
                        className="bg-zinc-900/50 border-white/10 focus-visible:ring-emerald-500/50 h-14 pl-12 transition-all hover:bg-zinc-900/80 active:scale-[0.99]"
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
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-lg shadow-[0_4px_20px_rgba(16,185,129,0.3)] border-0 transition-all"
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
          <Link href={FRONTEND_ROUTES.REGISTER} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
