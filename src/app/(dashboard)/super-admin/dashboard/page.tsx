import { Metadata } from "next";
import { SuperAdminDashboardContainer } from "@/features/admin/containers/SuperAdminDashboardContainer";

export const metadata: Metadata = {
    title: "Super Admin Dashboard | HyperStrike",
    description: "Manage global platform governance, system integrity, and personnel oversight from the central Nexus command.",
};

export default function SuperAdminDashboardPage() {
    return <SuperAdminDashboardContainer />;
}
