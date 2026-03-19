import { Metadata } from "next";
import { DrawsManagementContainer } from "@/features/admin/containers/DrawsManagementContainer";

export const metadata: Metadata = {
    title: "Draw Management | Super Admin",
    description: "Manage lottery draws, schedule events, and select winners.",
};

export default function DrawsManagementPage() {
    return <DrawsManagementContainer />;
}
