import { Metadata } from "next";
import { AdminDashboardContainer } from "@/features/admin/containers/AdminDashboardContainer";

export const metadata: Metadata = {
    title: "Admin Dashboard | HyperStrike",
    description: "Monitor system metrics, network volume, and commission distributions from the central oversight command.",
};

export default function AdminDashboardPage() {
    return <AdminDashboardContainer />;
}
