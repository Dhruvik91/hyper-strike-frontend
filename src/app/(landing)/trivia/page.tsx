import React from "react";
import { Metadata } from "next";
import { TriviaContainer } from "@/features/trivia/components/TriviaContainer";

export const metadata: Metadata = {
  title: "Hyper-Strike Trivia | Cyberpunk Gaming Module",
  description:
    "Test your intelligence parameters against the global Open Trivia Database repository. Experience high-fidelity cyberpunk visual execution, persistent token storage, and responsive query parameters.",
};

export default function TriviaPage() {
  return (
    <main className="w-full min-h-screen relative overflow-hidden pt-24 pb-16 flex flex-col">
      {/* Background Cinematic Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center">
        <TriviaContainer />
      </div>
    </main>
  );
}
