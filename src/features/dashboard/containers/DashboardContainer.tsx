"use client";

import { useProfileQuery } from "@/hooks/queries/use-auth";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { useMyReferralLinkQuery, useMyReferralsQuery } from "@/hooks/queries/use-referrals";
import { useMyTicketsQuery } from "@/hooks/queries/use-tickets";
import { toast } from "sonner";
import { DashboardView } from "../components/DashboardView";
import { Ticket, Users, Wallet, Trophy } from "lucide-react";

export function DashboardContainer() {
    const { data: user } = useProfileQuery();
    const { data: wallet } = useWalletBalanceQuery();
    const { data: referralLink } = useMyReferralLinkQuery();
    const { data: ticketsResponse } = useMyTicketsQuery(1, 10);
    const { data: referralsResponse } = useMyReferralsQuery(1, 10);

    const stats = [
        {
            title: "Active Tickets",
            value: ticketsResponse?.total?.toString() || "0",
            icon: Ticket,
            trend: "Total collection",
            color: "text-blue-400"
        },
        {
            title: "Network Size",
            value: referralsResponse?.total?.toString() || "0",
            icon: Users,
            trend: "Direct referrals",
            color: "text-emerald-400"
        },
        {
            title: "Wallet Balance",
            value: `₹${wallet?.balance || 0}`,
            icon: Wallet,
            trend: `₹${wallet?.commission_earned || 0} earned`,
            color: "text-purple-400"
        },
        {
            title: "Tournament Wins",
            value: "0",
            icon: Trophy,
            trend: "Lucky Draw History",
            color: "text-amber-400"
        }
    ];

    const recentActivity = ticketsResponse?.items?.map((ticket) => ({
        id: ticket.id,
        action: `Purchased Ticket #${ticket.ticket_number}`,
        date: new Date(ticket.created_at).toLocaleDateString(),
        amount: `-₹${ticket.purchase_price_inr}`
    })) || [];

    const handleCopyReferral = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink);
            toast.success("Referral link copied!");
        } else {
            toast.error("Referral link not available");
        }
    };

    return (
        <DashboardView
            user={user}
            referralLink={referralLink}
            ticketsTotal={ticketsResponse?.total || 0}
            stats={stats}
            recentActivity={recentActivity.slice(0, 5)}
            onCopyReferral={handleCopyReferral}
        />
    );
}
