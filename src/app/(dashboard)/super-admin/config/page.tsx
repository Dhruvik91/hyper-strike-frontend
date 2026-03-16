import { Metadata } from "next";
import { ConfigContainer } from "@/features/admin/containers/ConfigContainer";

export const metadata: Metadata = {
    title: "Platform Configuration | Super Admin",
    description: "Manage platform-wide settings, ticket prices, and commission rates.",
};

export default function PlatformConfigPage() {
    return <ConfigContainer />;
}
