"use client";

import { useAdminReferralsQuery } from "@/hooks/queries/use-admin";
import { AdminReferralsView } from "../components/AdminReferralsView";

export function AdminReferralsContainer() {
    const { data: referrals, isLoading } = useAdminReferralsQuery();

    return (
        <AdminReferralsView
            referrals={referrals || []}
            isLoading={isLoading}
        />
    );
}
