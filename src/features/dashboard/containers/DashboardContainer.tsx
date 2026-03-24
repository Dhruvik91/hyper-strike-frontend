"use client";

import { useProfileQuery } from "@/hooks/queries/use-auth";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { useMyReferralLinkQuery } from "@/hooks/queries/use-referrals";
import { useMyTicketsQuery } from "@/hooks/queries/use-tickets";
import { useUserReferralsQuery } from "@/hooks/queries/use-user";
import { toast } from "sonner";
import { DashboardView } from "../components/DashboardView";
import { Ticket, Users, Wallet, Trophy } from "lucide-react";

export function DashboardContainer() {
    const { data: user } = useProfileQuery();
    const { data: wallet } = useWalletBalanceQuery();
    const { data: referralLinkData } = useMyReferralLinkQuery();
    const { data: ticketsResponse } = useMyTicketsQuery(1, 10);
    const { data: referralsData } = useUserReferralsQuery();

    const walletBalanceINR = wallet ? parseFloat(wallet.wallet_balance_inr) : 0;
    const winningTickets = ticketsResponse?.items?.filter(t => t.is_winner).length || 0;

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
            value: referralsData?.length?.toString() || "0",
            icon: Users,
            trend: "Direct referrals",
            color: "text-emerald-400"
        },
        {
            title: "Wallet Balance",
            value: `₹${walletBalanceINR.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
            icon: Wallet,
            trend: `${wallet?.crypto_currency || "USDT"} balance`,
            color: "text-purple-400"
        },
        {
            title: "Winning Tickets",
            value: winningTickets.toString(),
            icon: Trophy,
            trend: "Lucky Draw Wins",
            color: "text-amber-400"
        }
    ];

    const recentActivity = ticketsResponse?.items?.map((ticket) => ({
        id: ticket.id,
        action: `Purchased Ticket #${ticket.ticket_number}`,
        date: new Date(ticket.created_at).toLocaleDateString(),
        amount: ticket.purchase_price_inr ? `-₹${ticket.purchase_price_inr}` : "N/A"
    })) || [];

    const handleCopyReferral = () => {
        if (referralLinkData?.referral_link) {
            navigator.clipboard.writeText(referralLinkData.referral_link);
            toast.success("Referral link copied!");
        } else {
            toast.error("Referral link not available");
        }
    };

    return (
        <DashboardView
            user={user}
            referralLink={referralLinkData?.referral_link}
            ticketsTotal={ticketsResponse?.total || 0}
            stats={stats}
            recentActivity={recentActivity.slice(0, 5)}
            onCopyReferral={handleCopyReferral}
        />
    );
}
