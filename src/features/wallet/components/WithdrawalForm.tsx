"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wallet, ArrowRight, Info } from "lucide-react";
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

const withdrawalSchema = z.object({
    amount: z.number()
        .min(0.01, "Minimum withdrawal amount is 0.01")
        .max(100000, "Maximum withdrawal amount exceeded"),
    crypto_currency: z.string().min(1, "Crypto currency is required"),
    wallet_address: z.string().min(10, "Wallet address is required"),
});

type WithdrawalInput = z.infer<typeof withdrawalSchema>;

interface WithdrawalFormProps {
    onSubmit: (values: WithdrawalInput) => void;
    isLoading: boolean;
    maxBalance: number;
}

export function WithdrawalForm({ onSubmit, isLoading, maxBalance }: WithdrawalFormProps) {
    const form = useForm<WithdrawalInput>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: {
            amount: 0.01,
            crypto_currency: "USDT",
            wallet_address: "",
        },
    });

    const amount = form.watch("amount");

    return (
        <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    Request Payout
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Withdrawal Amount</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="0.01"
                                                className="bg-black/40 border-white/10 h-14 rounded-2xl text-xl font-black text-white focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all"
                                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-[10px] font-medium text-zinc-500 flex justify-between">
                                        <span>Available: {maxBalance}</span>
                                        <span>Min: 0.01</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="crypto_currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Crypto Currency</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="USDT"
                                            className="bg-black/40 border-white/10 h-14 rounded-2xl text-sm font-bold text-white focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="wallet_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Wallet Address</FormLabel>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            placeholder="0x..."
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-medium text-white min-h-[120px] focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl flex gap-3 items-start">
                            <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                                Payouts are processed within 24-48 business hours. Please ensure your account details are accurate to avoid transaction failures.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading || amount > maxBalance}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 rounded-2xl shadow-xl shadow-emerald-900/20 border-0 transition-transform active:scale-[0.98]"
                        >
                            {isLoading ? "Submitting..." : "Initialize Payout"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
