import { Metadata } from "next";
import { DashboardContainer } from "@/features/dashboard/containers/DashboardContainer";

export const metadata: Metadata = {
  title: "Dashboard | HyperStrike",
  description: "Monitor your tickets, referral network, and upcoming lucky draws in real-time.",
};

export default function DashboardPage() {
  return <DashboardContainer />;
}

