import { Metadata } from "next";
import { SuperAdminDashboardContainer } from "@/features/admin/containers/SuperAdminDashboardContainer";

export const metadata: Metadata = {
    title: "User Management | Super Admin",
    description: "Manage all platform users, admins, and account statuses.",
};

export default function UsersManagementPage() {
    return <SuperAdminDashboardContainer />;
}
