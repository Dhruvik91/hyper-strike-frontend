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
        .min(500, "Minimum withdrawal amount is ₹500")
        .max(50000, "Maximum withdrawal amount is ₹50,000"),
    account_details: z.string().min(10, "Please provide full bank account details (Bank, A/C No, IFSC)"),
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
            amount: 500,
            account_details: "",
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
                                    <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Withdrawal Amount (INR)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="500"
                                                className="bg-black/40 border-white/10 h-14 pl-8 rounded-2xl text-xl font-black text-white focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all"
                                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-[10px] font-medium text-zinc-500 flex justify-between">
                                        <span>Available: ₹{maxBalance}</span>
                                        <span>Min: ₹500</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="account_details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Settlement Account Details</FormLabel>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            placeholder="Bank Name:&#10;Account Number:&#10;IFSC Code:&#10;Account Holder:"
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
