import { Metadata } from "next";
import { AdminWithdrawalsContainer } from "@/features/admin/containers/AdminWithdrawalsContainer";

export const metadata: Metadata = {
  title: "Withdrawals | HyperStrike Admin",
  description: "View and manage your withdrawal requests.",
};

export default function AdminWithdrawalsPage() {
  return <AdminWithdrawalsContainer />;
}
