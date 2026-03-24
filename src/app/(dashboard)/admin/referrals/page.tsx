import { Metadata } from "next";
import { AdminReferralsContainer } from "@/features/admin/containers/AdminReferralsContainer";

export const metadata: Metadata = {
  title: "My Referrals | HyperStrike Admin",
  description: "View and manage users referred through your admin account.",
};

export default function AdminReferralsPage() {
  return <AdminReferralsContainer />;
}
