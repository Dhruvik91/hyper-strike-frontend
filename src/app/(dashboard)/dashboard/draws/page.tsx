import { Metadata } from "next";
import { DrawsContainer } from "@/features/draws/containers/DrawsContainer";

export const metadata: Metadata = {
    title: "Draws | HyperStrike",
    description: "Participate in upcoming weekly strikes and view the history of previous lucky draws.",
};

export default function DrawsPage() {
    return <DrawsContainer />;
}
