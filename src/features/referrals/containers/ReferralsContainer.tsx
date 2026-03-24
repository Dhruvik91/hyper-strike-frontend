"use client";

import { useState } from "react";
import { useMyReferralLinkQuery } from "@/hooks/queries/use-referrals";
import { useUserReferralsQuery } from "@/hooks/queries/use-user";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { toast } from "sonner";
import { ReferralsView } from "../components/ReferralsView";
import { Referral } from "@/constants/interface";

export function ReferralsContainer() {
    const { data: referralLinkData } = useMyReferralLinkQuery();
    const { data: referredUsers, isLoading: isReferralsLoading } = useUserReferralsQuery();
    const { data: wallet } = useWalletBalanceQuery();
    const [isCopied, setIsCopied] = useState(false);

    const referrals: Referral[] = (referredUsers || []).map((user) => ({
        id: user.id,
        referrer_id: "",
        referred_id: user.id,
        referred_user: user,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }));

    const handleCopy = () => {
        if (referralLinkData?.referral_link) {
            navigator.clipboard.writeText(referralLinkData.referral_link);
            setIsCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <ReferralsView
            referralLink={referralLinkData?.referral_link}
            referrals={referrals}
            totalReferrals={referrals.length}
            isReferralsLoading={isReferralsLoading}
            wallet={wallet}
            isCopied={isCopied}
            onCopy={handleCopy}
        />
    );
}
