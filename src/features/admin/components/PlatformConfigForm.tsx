"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { platformConfigSchema, PlatformConfigFormData } from "@/lib/validations/super-admin";
import { usePlatformConfigQuery, useUpdatePlatformConfigMutation } from "@/hooks/queries/use-super-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent, Save } from "lucide-react";
import { useEffect } from "react";

export function PlatformConfigForm() {
    const { data: config, isLoading } = usePlatformConfigQuery();
    const updateMutation = useUpdatePlatformConfigMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<PlatformConfigFormData>({
        resolver: zodResolver(platformConfigSchema),
    });

    useEffect(() => {
        if (config) {
            reset({
                ticket_price_inr: config.ticket_price_inr,
                referral_commission_user_pct: config.referral_commission_user_pct,
                referral_commission_admin_pct: config.referral_commission_admin_pct,
            });
        }
    }, [config, reset]);

    const onSubmit = async (data: PlatformConfigFormData) => {
        const payload: any = {};
        if (data.ticket_price_inr) payload.ticket_price_inr = data.ticket_price_inr;
        if (data.referral_commission_user_pct) payload.referral_commission_user_pct = data.referral_commission_user_pct;
        if (data.referral_commission_admin_pct) payload.referral_commission_admin_pct = data.referral_commission_admin_pct;
        
        await updateMutation.mutateAsync(payload);
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        Ticket Pricing
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Ticket Price (INR)
                        </label>
                        <input
                            type="text"
                            {...register("ticket_price_inr")}
                            className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                            placeholder="500.00"
                        />
                        {errors.ticket_price_inr && (
                            <p className="text-red-400 text-xs font-medium">{errors.ticket_price_inr.message}</p>
                        )}
                        <p className="text-xs text-zinc-500">Base price for a single lottery ticket</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Percent className="w-5 h-5 text-blue-400" />
                        Commission Rates
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            User Referral Commission (%)
                        </label>
                        <input
                            type="text"
                            {...register("referral_commission_user_pct")}
                            className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                            placeholder="0.10"
                        />
                        {errors.referral_commission_user_pct && (
                            <p className="text-red-400 text-xs font-medium">{errors.referral_commission_user_pct.message}</p>
                        )}
                        <p className="text-xs text-zinc-500">Commission rate for regular users (0.10 = 10%)</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Admin Referral Commission (%)
                        </label>
                        <input
                            type="text"
                            {...register("referral_commission_admin_pct")}
                            className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                            placeholder="0.15"
                        />
                        {errors.referral_commission_admin_pct && (
                            <p className="text-red-400 text-xs font-medium">{errors.referral_commission_admin_pct.message}</p>
                        )}
                        <p className="text-xs text-zinc-500">Commission rate for admin users (0.15 = 15%)</p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={!isDirty || isSubmitting || updateMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 h-12 rounded-2xl shadow-xl shadow-emerald-900/20 border-0"
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting || updateMutation.isPending ? "Saving..." : "Save Configuration"}
                </Button>
            </div>
        </form>
    );
}
