import { Metadata } from "next";
import { DrawDetailsContainer } from "@/features/admin/containers/DrawDetailsContainer";

export const metadata: Metadata = {
    title: "Draw Details | Super Admin",
    description: "View draw details, manage winners, and oversee lottery operations.",
};

interface DrawDetailsPageProps {
    params: {
        id: string;
    };
}

export default function DrawDetailsPage({ params }: DrawDetailsPageProps) {
    return <DrawDetailsContainer drawId={params.id} />;
}
