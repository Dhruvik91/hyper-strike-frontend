"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TriviaQuestion } from "@/constants/interface";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Timer, Award, ChevronRight, AlertCircle } from "lucide-react";
import { decodeHtmlEntities } from "../utils/decode";
import { cn } from "@/lib/utils";

export interface TriviaQuestionCardProps {
  question: TriviaQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (selectedOption: string, isCorrect: boolean, timeTaken: number) => void;
  onNext: () => void;
  onEndEarly: () => void;
  isLastQuestion: boolean;
}

const QUESTION_DURATION = 20; // 20 seconds per question

export function TriviaQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswerSelected,
  onNext,
  onEndEarly,
  isLastQuestion,
}: TriviaQuestionCardProps) {
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [decodedCorrectAnswer, setDecodedCorrectAnswer] = useState("");
  const [decodedQuestion, setDecodedQuestion] = useState("");

  // Initialize and shuffle choices whenever the active question changes
  useEffect(() => {
    const correct = decodeHtmlEntities(question.correct_answer);
    const incorrects = question.incorrect_answers.map(decodeHtmlEntities);
    const allChoices = [correct, ...incorrects];

    // Fisher-Yates shuffle algorithm
    for (let i = allChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allChoices[i], allChoices[j]] = [allChoices[j], allChoices[i]];
    }

    setChoices(allChoices);
    setDecodedCorrectAnswer(correct);
    setDecodedQuestion(decodeHtmlEntities(question.question));
    setSelectedChoice(null);
    setIsAnswered(false);
    setTimeLeft(QUESTION_DURATION);
  }, [question, questionIndex]);

  // Handle countdown timer logic
  useEffect(() => {
    if (isAnswered || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isAnswered, timeLeft]);

  // Handle timeout side-effect safely outside rendering/updater loops
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
      onAnswerSelected("[Time Out]", false, QUESTION_DURATION);
    }
  }, [timeLeft, isAnswered, onAnswerSelected]);

  const handleSelectChoice = (choice: string) => {
    if (isAnswered) return;

    const isCorrect = choice === decodedCorrectAnswer;
    const timeTaken = QUESTION_DURATION - timeLeft;

    setSelectedChoice(choice);
    setIsAnswered(true);
    onAnswerSelected(choice, isCorrect, timeTaken);
  };

  // Determine difficulty badge styling
  const getDifficultyBadge = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "medium":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "hard":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400";
      default:
        return "bg-white/5 border-white/10 text-muted-foreground";
    }
  };

  // Calculate timer bar progress percentage
  const timerPercentage = (timeLeft / QUESTION_DURATION) * 100;
  const timerColor =
    timeLeft > 10
      ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
      : timeLeft > 5
      ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
      : "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse";

  return (
    <motion.div
      key={questionIndex} // Trigger smooth fade between questions
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto glass-card rounded-[32px] p-6 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl flex flex-col gap-8"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header Information bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm font-black text-muted-foreground tracking-widest uppercase">
            Question <span className="text-white">{questionIndex + 1}</span> of {totalQuestions}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-xs font-bold text-purple-400 max-w-[150px] sm:max-w-none truncate">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest",
              getDifficultyBadge(question.difficulty)
            )}
          >
            {question.difficulty}
          </span>
          <Button
            variant="ghost"
            size="xs"
            onClick={onEndEarly}
            className="text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 font-bold text-[10px] tracking-widest uppercase px-2.5 h-7 rounded-full transition-colors cursor-pointer"
            title="End strike early and view results"
          >
            End Early
          </Button>
        </div>
      </div>

      {/* Visual Timer Indicator */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Timer className="w-4 h-4 text-primary" />
            <span>Time Left</span>
          </span>
          <span className={cn("font-mono text-sm", timeLeft <= 5 ? "text-rose-400" : "text-white")}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
          <motion.div
            className={cn("h-full rounded-full transition-all duration-1000 linear", timerColor)}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* Actual Question Header */}
      <div className="relative z-10 my-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug tracking-tight">
          {decodedQuestion}
        </h2>
      </div>

      {/* Choices Grid */}
      <div className="relative z-10 flex flex-col gap-3.5">
        {choices.map((choice, idx) => {
          const isSelected = selectedChoice === choice;
          const isCorrectAnswer = choice === decodedCorrectAnswer;

          // Determine highly dynamic border, fill, and text colors based on game logic state
          let optionStyle =
            "bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-white/10";
          let iconComponent = null;

          if (isAnswered) {
            if (isCorrectAnswer) {
              optionStyle =
                "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]";
              iconComponent = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            } else if (isSelected) {
              optionStyle =
                "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]";
              iconComponent = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            } else {
              optionStyle = "bg-white/5 border-white/5 text-muted-foreground/50 opacity-40";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectChoice(choice)}
              className={cn(
                "w-full min-h-[64px] p-4 rounded-xl border flex items-center justify-between gap-4 text-left font-bold text-sm md:text-base transition-all duration-300 relative overflow-hidden group cursor-pointer disabled:cursor-default",
                optionStyle
              )}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-muted-foreground group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{choice}</span>
              </div>
              {iconComponent}
            </button>
          );
        })}
      </div>

      {/* Interaction Footnote / Action Controls */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              {selectedChoice === null ? (
                <span className="flex items-center gap-1.5 text-rose-400">
                  <AlertCircle className="w-4 h-4" /> Time elapsed! The correct answer is displayed above.
                </span>
              ) : selectedChoice === decodedCorrectAnswer ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-black tracking-wide uppercase">
                  ✨ Perfect Strike! Spot on answer.
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-rose-400">
                  Missed strike. Better luck on the next parameter.
                </span>
              )}
            </div>

            <Button
              type="button"
              onClick={onNext}
              className="w-full sm:w-auto bg-gradient-primary glow-primary text-white font-black uppercase tracking-widest text-xs h-12 px-8 rounded-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            >
              <span>{isLastQuestion ? "VIEW FINAL RESULTS" : "NEXT QUESTION"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
