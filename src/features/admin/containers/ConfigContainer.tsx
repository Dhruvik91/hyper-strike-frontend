"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePlatformConfigQuery, useUpdatePlatformConfigMutation } from "@/hooks/queries/use-super-admin";
import { ConfigView } from "../components/ConfigView";

const configSchema = z.object({
    ticket_price_inr: z.number().min(10, "Minimum price is ₹10"),
    referral_commission_user_pct: z.number().min(0).max(100),
    referral_commission_admin_pct: z.number().min(0).max(100),
});

export type ConfigInput = z.infer<typeof configSchema>;

export function ConfigContainer() {
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

    return (
        <ConfigView
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isUpdating={updateMutation.isPending}
        />
    );
}
