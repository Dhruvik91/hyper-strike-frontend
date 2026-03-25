import { Metadata } from "next";
import { WithdrawalsContainer } from "@/features/withdrawals/containers/WithdrawalsContainer";

export const metadata: Metadata = {
    title: "Withdrawals | HyperStrike",
    description: "View and manage your withdrawal requests and settlement history.",
};

export default function WithdrawalsPage() {
    return <WithdrawalsContainer />;
}
