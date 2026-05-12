"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TriviaConfigView } from "./TriviaConfigView";
import { TriviaQuestionCard } from "./TriviaQuestionCard";
import { TriviaResultsView, UserAnswer } from "./TriviaResultsView";
import {
  useTriviaCategoriesQuery,
  useTriviaQuestionsQuery,
  useTriviaGlobalCountQuery,
  useTriviaTokenMutation,
} from "@/hooks/queries/use-trivia";
import { FetchTriviaParams } from "@/constants/interface";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Loader2, Brain } from "lucide-react";

type GameState = "config" | "play" | "results";

export function TriviaContainer() {
  // Navigation orchestrator state
  const [gameState, setGameState] = useState<GameState>("config");

  // Configuration parameters state
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<string>("any");
  const [type, setType] = useState<string>("any");
  const [amount, setAmount] = useState<number>(10);

  // Playback runtime tracking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // Sanitize parameters so "any" values do not trigger Code 2 Invalid Parameters errors on OpenTDB
  const getSanitizedParams = (): FetchTriviaParams => {
    const params: FetchTriviaParams = { amount };
    if (category !== undefined) params.category = category;
    if (difficulty !== "any") params.difficulty = difficulty as any;
    if (type !== "any") params.type = type as any;
    return params;
  };

  // Subscribed Queries & Mutations
  const categoriesQuery = useTriviaCategoriesQuery();
  const globalCountQuery = useTriviaGlobalCountQuery();
  const tokenMutation = useTriviaTokenMutation();

  // Conditionally execute the trivia fetch hook only when play state is fully active
  const questionsQuery = useTriviaQuestionsQuery(getSanitizedParams(), {
    enabled: gameState === "play",
  });

  // Action Triggers
  const handleStartStrike = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setGameState("play");
  };

  const handleAnswerSelected = (selectedOption: string, isCorrect: boolean, timeTaken: number) => {
    setUserAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedOption,
        isCorrect,
        timeTaken,
      },
    ]);
  };

  const handleNextQuestion = () => {
    const questions = questionsQuery.data?.results || [];
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState("results");
    }
  };

  const handlePlayAgain = () => {
    setGameState("config");
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleResetToken = () => {
    tokenMutation.mutate("reset");
  };

  const questions = questionsQuery.data?.results || [];
  const isFetchingQuestions = questionsQuery.isFetching || questionsQuery.isLoading;

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center relative py-8 px-4">
      <AnimatePresence mode="wait">
        {gameState === "config" && (
          <TriviaConfigView
            key="config-view"
            categories={categoriesQuery.data?.trivia_categories || []}
            isLoadingCategories={categoriesQuery.isLoading}
            selectedCategory={category}
            onSelectCategory={setCategory}
            selectedDifficulty={difficulty}
            onSelectDifficulty={setDifficulty}
            selectedType={type}
            onSelectType={setType}
            selectedAmount={amount}
            onSelectAmount={setAmount}
            onStart={handleStartStrike}
            isLoadingQuestions={false}
            globalCount={
              globalCountQuery.data
                ? {
                    total: globalCountQuery.data.overall.total_num_of_questions,
                    verified: globalCountQuery.data.overall.total_num_of_verified_questions,
                  }
                : undefined
            }
          />
        )}

        {gameState === "play" && (
          <motion.div
            key="play-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl"
          >
            {isFetchingQuestions ? (
              // Cinematic Loading State
              <div className="w-full glass-card rounded-[32px] p-12 text-center flex flex-col items-center justify-center gap-6 border border-white/5 shadow-2xl min-h-[400px]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  <Brain className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">
                    Querying Knowledge Matrix...
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto">
                    Retrieving guaranteed unique parameters via Open Trivia local session handshake protocols.
                  </p>
                </div>
              </div>
            ) : questionsQuery.isError ? (
              // Graceful API Error Fallback Handler
              <div className="w-full glass-card rounded-[32px] p-12 text-center flex flex-col items-center justify-center gap-6 border border-rose-500/20 bg-rose-500/5 shadow-2xl min-h-[400px]">
                <AlertCircle className="w-16 h-16 text-rose-400" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black text-rose-300 uppercase tracking-wider">
                    Strike Handshake Failure
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium max-w-md mx-auto">
                    {questionsQuery.error instanceof Error
                      ? questionsQuery.error.message
                      : "Unable to retrieve parameters matching the configured filters. The database subset may be exhausted."}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setGameState("config")}
                  className="bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest h-12 px-8 rounded-xl mt-2"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Return to Filters</span>
                </Button>
              </div>
            ) : questions.length === 0 ? (
              // Empty ResultSet State
              <div className="w-full glass-card rounded-[32px] p-12 text-center flex flex-col items-center justify-center gap-6 border border-amber-500/20 bg-amber-500/5 shadow-2xl min-h-[400px]">
                <AlertCircle className="w-16 h-16 text-amber-400" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black text-amber-300 uppercase tracking-wider">
                    Parameter Subset Depleted
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium max-w-md mx-auto">
                    No remaining unique questions exist under this category and difficulty combination. Consider resetting your session token to replay past questions.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    type="button"
                    onClick={() => setGameState("config")}
                    className="bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest h-12 px-6 rounded-xl"
                  >
                    Adjust Filters
                  </Button>
                  <Button
                    type="button"
                    onClick={handleResetToken}
                    disabled={tokenMutation.isPending}
                    className="bg-gradient-primary glow-primary text-white font-black text-xs uppercase tracking-widest h-12 px-6 rounded-xl"
                  >
                    {tokenMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Session Token"}
                  </Button>
                </div>
              </div>
            ) : (
              // Active Question Presentation
              <TriviaQuestionCard
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onAnswerSelected={handleAnswerSelected}
                onNext={handleNextQuestion}
                onEndEarly={() => setGameState("results")}
                isLastQuestion={currentQuestionIndex + 1 === questions.length}
              />
            )}
          </motion.div>
        )}

        {gameState === "results" && (
          <TriviaResultsView
            key="results-view"
            questions={questions.slice(0, userAnswers.length)}
            userAnswers={userAnswers}
            onPlayAgain={handlePlayAgain}
            onResetToken={handleResetToken}
            isResettingToken={tokenMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
