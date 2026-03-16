import { Metadata } from "next";
import { WalletContainer } from "@/features/wallet/containers/WalletContainer";

export const metadata: Metadata = {
    title: "Wallet | HyperStrike",
    description: "Monitor your withdrawable balance, track referral commissions, and securely request settlements.",
};

export default function WalletPage() {
    return <WalletContainer />;
}
