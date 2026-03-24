import { Metadata } from "next";
import { DrawsContainer } from "@/features/draws/containers/DrawsContainer";

export const metadata: Metadata = {
  title: "Lucky Draws | HyperStrike",
  description: "View upcoming draws, draw history, and winners for HyperStrike lottery.",
};

export default function DrawsPage() {
  return <DrawsContainer />;
}
