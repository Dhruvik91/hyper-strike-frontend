import { Metadata } from "next";
import { ReferralsContainer } from "@/features/referrals/containers/ReferralsContainer";

export const metadata: Metadata = {
    title: "My Referrals | HyperStrike",
    description: "Build your affiliate network and earn passive yields from every ticket your referral squadron launches.",
};

export default function ReferralsPage() {
    return <ReferralsContainer />;
}
