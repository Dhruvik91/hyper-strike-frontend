"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Settings, Save, RefreshCw, Percent, Ticket, ShieldCheck } from "lucide-react";
import { usePlatformConfigQuery, useUpdatePlatformConfigMutation } from "@/hooks/queries/use-super-admin";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const configSchema = z.object({
    ticket_price_inr: z.number().min(10, "Minimum price is ₹10"),
    referral_commission_user_pct: z.number().min(0).max(100),
    referral_commission_admin_pct: z.number().min(0).max(100),
});

type ConfigInput = z.infer<typeof configSchema>;

export default function PlatformConfigPage() {
    const { data: config, isLoading } = usePlatformConfigQuery();
    const updateMutation = useUpdatePlatformConfigMutation();

    const form = useForm<ConfigInput>({
        resolver: zodResolver(configSchema),
        defaultValues: {
            ticket_price_inr: 500,
            referral_commission_user_pct: 10,
            referral_commission_admin_pct: 5,
        },
    });

    useEffect(() => {
        if (config) {
            form.reset({
                ticket_price_inr: Number(config.ticket_price_inr),
                referral_commission_user_pct: Number(config.referral_commission_user_pct),
                referral_commission_admin_pct: Number(config.referral_commission_admin_pct),
            });
        }
    }, [config, form]);

    const onSubmit = (values: ConfigInput) => {
        updateMutation.mutate({
            ticket_price_inr: values.ticket_price_inr.toString(),
            referral_commission_user_pct: values.referral_commission_user_pct.toString(),
            referral_commission_admin_pct: values.referral_commission_admin_pct.toString(),
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl border border-purple-500/20 shadow-lg">
                        <Settings className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500/80">Nexus Configuration</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Parameters</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                    Fine-tune the platform&apos;s economic engine. Adjust entry barriers and yield percentages with immediate global effect.
                </p>
            </motion.div>

            <section className="max-w-2xl">
                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                    <CardHeader className="border-b border-white/5 pb-8 mb-8">
                        <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            Global Directive
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="ticket_price_inr"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Standard Ticket Price (INR)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        className="bg-black/40 border-white/10 h-14 pl-12 rounded-2xl text-xl font-black text-white focus:ring-purple-500/20"
                                                        onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-[10px] text-zinc-500">
                                                Universal price for a single lucky draw entry.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="referral_commission_user_pct"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">User Commission (%)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            className="bg-black/40 border-white/10 h-14 pl-12 rounded-2xl text-xl font-black text-white focus:ring-purple-500/20"
                                                            onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="referral_commission_admin_pct"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Admin Yield (%)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            className="bg-black/40 border-white/10 h-14 pl-12 rounded-2xl text-xl font-black text-white focus:ring-purple-500/20"
                                                            onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <Button
                                        type="submit"
                                        disabled={updateMutation.isPending}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black h-16 rounded-2xl shadow-xl shadow-purple-900/20 border-0 transition-transform active:scale-[0.98]"
                                    >
                                        {updateMutation.isPending ? "Executing Protocol..." : "Commit Changes"}
                                        <Save className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
