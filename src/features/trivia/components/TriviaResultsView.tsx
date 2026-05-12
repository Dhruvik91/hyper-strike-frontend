"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Award, CheckCircle2, XCircle, Clock, Zap, RefreshCw } from "lucide-react";
import { TriviaQuestion } from "@/constants/interface";
import { decodeHtmlEntities } from "../utils/decode";
import { cn } from "@/lib/utils";

export interface UserAnswer {
  questionIndex: number;
  selectedOption: string;
  isCorrect: boolean;
  timeTaken: number;
}

export interface TriviaResultsProps {
  questions: TriviaQuestion[];
  userAnswers: UserAnswer[];
  onPlayAgain: () => void;
  onResetToken: () => void;
  isResettingToken: boolean;
}

export function TriviaResultsView({
  questions,
  userAnswers,
  onPlayAgain,
  onResetToken,
  isResettingToken,
}: TriviaResultsProps) {
  // Compute final score metrics
  const totalQuestions = questions.length;
  const correctAnswers = userAnswers.filter((ans) => ans.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const totalTimeTaken = userAnswers.reduce((sum, ans) => sum + ans.timeTaken, 0);
  const avgTime = totalQuestions > 0 ? (totalTimeTaken / totalQuestions).toFixed(1) : "0";

  // Assign performance tiers
  const getPerformanceTier = () => {
    if (accuracy === 100) return { title: "UNSTOPPABLE STRIKE MASTER", color: "text-gradient-gold drop-shadow-[0_0_20px_rgba(255,181,71,0.5)]", glow: "glow-gold" };
    if (accuracy >= 80) return { title: "ELITE STRIKER", color: "text-purple-400 drop-shadow-[0_0_20px_rgba(161,0,255,0.5)]", glow: "glow-primary" };
    if (accuracy >= 50) return { title: "ADEPT COMPETITOR", color: "text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]", glow: "glow-amber" };
    return { title: "APPRENTICE STRIKER", color: "text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]", glow: "glow-rose" };
  };

  const tier = getPerformanceTier();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto glass-card rounded-[32px] p-6 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl flex flex-col gap-10"
    >
      {/* Absolute Dynamic Glow Ambient Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Results Showcase Banner */}
      <div className="relative z-10 text-center flex flex-col items-center gap-3">
        <div className={cn("w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center text-black font-black mb-2 animate-bounce ring-4 ring-amber-500/30", tier.glow)}>
          <Trophy className="w-8 h-8 text-black fill-black" />
        </div>

        <span className="text-xs font-black tracking-widest uppercase text-muted-foreground">
          Strike Mission Completed
        </span>

        <h1 className={cn("text-3xl md:text-5xl font-black uppercase tracking-tighter", tier.color)}>
          {tier.title}
        </h1>

        <p className="text-muted-foreground text-sm font-medium max-w-md mx-auto">
          Review authenticated evaluation statistics logged during your Open Trivia runtime query execution.
        </p>
      </div>

      {/* Numerical Analytics Overview Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-center relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <span className="text-2xl md:text-4xl font-black text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">{correctAnswers}</span>
          <div className="w-8 h-0.5 bg-emerald-500/50 my-1.5 rounded-full" />
          <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            Correct
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-primary/5 border border-primary/20 shadow-[0_0_15px_rgba(161,0,255,0.1)] text-center relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <span className="text-2xl md:text-4xl font-black text-primary drop-shadow-[0_0_12px_rgba(161,0,255,0.4)]">{accuracy}%</span>
          <div className="w-8 h-0.5 bg-primary/50 my-1.5 rounded-full" />
          <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            Accuracy
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] text-center relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="text-2xl md:text-4xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">{avgTime}s</span>
          <div className="w-8 h-0.5 bg-amber-500/50 my-1.5 rounded-full" />
          <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            Avg Time
          </span>
        </div>
      </div>

      {/* Full Audit Log Breakdown List */}
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 px-1">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Detailed Parameter Log</span>
          </span>
          <span className="text-[10px] font-bold text-muted-foreground">
            {totalQuestions} Queries Answered
          </span>
        </div>

        <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {questions.map((q, idx) => {
            const userAns = userAnswers.find((a) => a.questionIndex === idx);
            const decodedQText = decodeHtmlEntities(q.question);
            const decodedCorrect = decodeHtmlEntities(q.correct_answer);
            const isTimeout = userAns?.selectedOption === "[Time Out]";

            return (
              <div
                key={idx}
                className={cn(
                  "p-4 rounded-xl border flex flex-col gap-2.5 transition-colors",
                  userAns?.isCorrect
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-rose-500/5 border-rose-500/20"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-black text-white leading-relaxed">
                    <span className="text-muted-foreground mr-1.5">{idx + 1}.</span> {decodedQText}
                  </span>
                  {userAns?.isCorrect ? (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[9px] font-black tracking-wider uppercase shrink-0">
                      Correct
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 text-[9px] font-black tracking-wider uppercase shrink-0">
                      Missed
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-white/5 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-[10px]">Your Answer:</span>
                    <span
                      className={cn(
                        "font-bold truncate max-w-[180px] sm:max-w-xs",
                        userAns?.isCorrect ? "text-emerald-400" : isTimeout ? "text-rose-400 italic" : "text-rose-400 line-through"
                      )}
                    >
                      {userAns?.selectedOption || "[Skipped]"}
                    </span>
                  </div>

                  {!userAns?.isCorrect && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground text-[10px]">Correct:</span>
                      <span className="text-emerald-400 font-bold truncate max-w-[150px] sm:max-w-xs">
                        {decodedCorrect}
                      </span>
                    </div>
                  )}

                  <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                    {userAns?.timeTaken || 0}s
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Controller Suite */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
        <Button
          type="button"
          onClick={onPlayAgain}
          className="w-full sm:flex-1 h-14 bg-gradient-primary glow-primary text-white font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(161,0,255,0.4)]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>CONFIGURE NEW STRIKE</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onResetToken}
          disabled={isResettingToken}
          className="w-full sm:w-auto h-14 bg-transparent border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white font-bold uppercase tracking-wider text-xs px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className={cn("w-4 h-4", isResettingToken && "animate-spin")} />
          <span>RESET SESSION TOKEN</span>
        </Button>
      </div>
    </motion.div>
  );
}
