"use client";

import { useState } from "react";
import { useMyReferralLinkQuery, useMyReferralsQuery } from "@/hooks/queries/use-referrals";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { toast } from "sonner";
import { ReferralsView } from "../components/ReferralsView";

export function ReferralsContainer() {
    const { data: referralLink } = useMyReferralLinkQuery();
    const { data: referralsResponse, isLoading: isReferralsLoading } = useMyReferralsQuery(1, 10);
    const { data: wallet } = useWalletBalanceQuery();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink);
            setIsCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <ReferralsView
            referralLink={referralLink}
            referrals={referralsResponse?.items || []}
            totalReferrals={referralsResponse?.total || 0}
            isReferralsLoading={isReferralsLoading}
            wallet={wallet}
            isCopied={isCopied}
            onCopy={handleCopy}
        />
    );
}
