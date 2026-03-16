import { Metadata } from "next";
import { WithdrawalsContainer } from "@/features/admin/containers/WithdrawalsContainer";

export const metadata: Metadata = {
    title: "Review Withdrawals | Super Admin",
    description: "Authorize and audit platform-wide withdrawal requests.",
};

export default function SuperAdminWithdrawalsPage() {
    return <WithdrawalsContainer />;
}
