"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fundUserSchema, FundUserFormData } from "@/lib/validations/super-admin";
import { useFundUserMutation } from "@/hooks/queries/use-super-admin";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign, Wallet } from "lucide-react";

interface FundUserDialogProps {
    userId: string;
    userName: string;
}

export function FundUserDialog({ userId, userName }: FundUserDialogProps) {
    const [open, setOpen] = useState(false);
    const fundMutation = useFundUserMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FundUserFormData>({
        resolver: zodResolver(fundUserSchema),
        defaultValues: {
            amount_inr: 0,
        },
    });

    const amountInr = watch("amount_inr") || 0;
    const usdtEquivalent = (amountInr / 84.23).toFixed(8);

    const onSubmit = async (data: FundUserFormData) => {
        await fundMutation.mutateAsync({
            userId,
            amount_inr: data.amount_inr,
        });
        setOpen(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 h-9 rounded-xl px-4 font-black text-xs uppercase tracking-widest"
                >
                    <Wallet className="w-3.5 h-3.5 mr-2" />
                    Fund
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-white/10 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white font-black uppercase text-xl">
                        Fund User Wallet
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Add funds to {userName}'s wallet. Amount will be converted to USDT.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Amount (INR)
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="number"
                                step="0.01"
                                {...register("amount_inr", { valueAsNumber: true })}
                                className="w-full bg-black border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                                placeholder="Enter amount in INR"
                            />
                        </div>
                        {errors.amount_inr && (
                            <p className="text-red-400 text-xs font-medium mt-1">
                                {errors.amount_inr.message}
                            </p>
                        )}
                    </div>

                    {amountInr > 0 && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                                Crypto Equivalent
                            </p>
                            <p className="text-2xl font-black text-emerald-400">
                                {usdtEquivalent} USDT
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                                Rate: 1 USDT = ₹84.23
                            </p>
                        </div>
                    )}

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setOpen(false);
                                reset();
                            }}
                            className="text-zinc-500 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || fundMutation.isPending}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black"
                        >
                            {isSubmitting || fundMutation.isPending ? "Processing..." : "Fund Wallet"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
