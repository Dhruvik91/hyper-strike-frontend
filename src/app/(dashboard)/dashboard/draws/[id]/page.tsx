import { Metadata } from "next";
import { DrawDetailsContainer } from "@/features/draws/containers/DrawDetailsContainer";

export const metadata: Metadata = {
    title: "Draw Details | HyperStrike",
    description: "Detailed victory records and official standings for the selected lucky draw.",
};

export default function DrawDetailsPage() {
    return <DrawDetailsContainer />;
}
