import { Metadata } from "next";
import { AdminCommissionsContainer } from "@/features/admin/containers/AdminCommissionsContainer";

export const metadata: Metadata = {
  title: "Commissions | HyperStrike Admin",
  description: "Track and manage commission earnings from your referral network.",
};

export default function AdminCommissionsPage() {
  return <AdminCommissionsContainer />;
}
