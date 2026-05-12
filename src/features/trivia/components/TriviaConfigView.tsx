"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Brain, Trophy, Flame, HelpCircle } from "lucide-react";
import { TriviaCategory } from "@/constants/interface";
import { cn } from "@/lib/utils";

export interface TriviaConfigProps {
  categories: TriviaCategory[];
  isLoadingCategories: boolean;
  selectedCategory: number | undefined;
  onSelectCategory: (id: number | undefined) => void;
  selectedDifficulty: string;
  onSelectDifficulty: (difficulty: string) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
  onStart: () => void;
  isLoadingQuestions: boolean;
  globalCount?: {
    total: number;
    verified: number;
  };
}

const AMOUNTS = [5, 10, 15, 20, 30, 50];
const DIFFICULTIES = [
  {
    label: "Any Difficulty",
    value: "any",
    color: "border-white/10 hover:border-white/20 text-muted-foreground hover:text-white dark:hover:bg-white/5",
    selectedColor: "bg-white dark:bg-white text-black dark:text-black font-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-[1.02] ring-2 ring-white/50"
  },
  {
    label: "Easy",
    value: "easy",
    color: "border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10",
    selectedColor: "bg-emerald-500 dark:bg-emerald-500 text-black dark:text-black font-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-[1.02] ring-2 ring-emerald-400/50"
  },
  {
    label: "Medium",
    value: "medium",
    color: "border-amber-500/30 hover:border-amber-500/60 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 dark:hover:bg-amber-500/10",
    selectedColor: "bg-amber-500 dark:bg-amber-500 text-black dark:text-black font-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-[1.02] ring-2 ring-amber-400/50"
  },
  {
    label: "Hard",
    value: "hard",
    color: "border-rose-500/30 hover:border-rose-500/60 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 dark:hover:bg-rose-500/10",
    selectedColor: "bg-rose-500 dark:bg-rose-500 text-black dark:text-black font-black border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-[1.02] ring-2 ring-rose-400/50"
  },
];

const TYPES = [
  { label: "Any Type", value: "any" },
  { label: "Multiple Choice", value: "multiple" },
  { label: "True / False", value: "boolean" },
];

export function TriviaConfigView({
  categories,
  isLoadingCategories,
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  selectedType,
  onSelectType,
  selectedAmount,
  onSelectAmount,
  onStart,
  isLoadingQuestions,
  globalCount,
}: TriviaConfigProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto glass-card rounded-[32px] p-6 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Knowledge Arena</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-3">
          Configure Your <span className="text-gradient-gold">Strike</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl mx-auto">
          Customize parameters to pull authenticated questions directly from the global Open Trivia Database repository.
        </p>

        {/* Global Stats Badge */}
        {globalCount && (
          <div className="mt-4 inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1.5 text-white">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              {globalCount.verified.toLocaleString()} Verified DB Questions
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        {/* Category Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span>Select Category</span>
          </label>

          {isLoadingCategories ? (
            <div className="w-full h-24 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground font-bold">Synchronizing categories...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              <Button
                variant="outline"
                type="button"
                onClick={() => onSelectCategory(undefined)}
                className={cn(
                  "flex items-center justify-center text-center p-3 h-auto whitespace-normal rounded-xl border text-xs font-bold transition-all duration-200",
                  selectedCategory === undefined
                    ? "bg-gradient-primary border-primary text-white dark:text-white shadow-[0_0_20px_rgba(161,0,255,0.6)] scale-[1.02] ring-2 ring-primary/50 font-black hover:text-white dark:hover:text-white"
                    : "bg-white/5 dark:bg-white/5 border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/10"
                )}
              >
                ⚡ Any Category
              </Button>
              {categories.map((cat) => (
                <Button
                  variant="outline"
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={cn(
                    "flex items-center justify-center text-center p-3 h-auto whitespace-normal rounded-xl border text-xs font-bold transition-all duration-200 line-clamp-2 leading-snug",
                    selectedCategory === cat.id
                      ? "bg-gradient-primary border-primary text-white dark:text-white shadow-[0_0_20px_rgba(161,0,255,0.6)] scale-[1.02] ring-2 ring-primary/50 font-black hover:text-white dark:hover:text-white"
                      : "bg-white/5 dark:bg-white/5 border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/10"
                  )}
                  title={cat.name}
                >
                  {cat.name.replace("Entertainment: ", "").replace("Science: ", "")}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Select Difficulty</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DIFFICULTIES.map((item) => (
              <Button
                variant="outline"
                key={item.value}
                type="button"
                onClick={() => onSelectDifficulty(item.value)}
                className={cn(
                  "flex items-center justify-center p-3.5 h-auto whitespace-normal rounded-xl border font-black text-xs uppercase tracking-wider transition-all duration-200",
                  selectedDifficulty === item.value
                    ? item.selectedColor
                    : cn("bg-white/5 dark:bg-white/5 text-muted-foreground", item.color)
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Question Type Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Question Type</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TYPES.map((item) => (
              <Button
                variant="outline"
                key={item.value}
                type="button"
                onClick={() => onSelectType(item.value)}
                className={cn(
                  "flex items-center justify-center p-3.5 h-auto whitespace-normal rounded-xl border font-bold text-xs transition-all duration-200",
                  selectedType === item.value
                    ? "bg-gradient-primary border-primary text-white dark:text-white shadow-[0_0_20px_rgba(161,0,255,0.6)] scale-[1.02] ring-2 ring-primary/50 font-black hover:text-white dark:hover:text-white"
                    : "bg-white/5 dark:bg-white/5 border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Number of Questions */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center justify-between pl-1">
            <span>Number of Questions</span>
            <span className="text-primary font-black">{selectedAmount} Questions</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {AMOUNTS.map((amt) => (
              <Button
                variant="outline"
                key={amt}
                type="button"
                onClick={() => onSelectAmount(amt)}
                className={cn(
                  "flex-1 min-w-[60px] py-3 h-auto rounded-xl border font-black text-xs transition-all duration-200 cursor-pointer",
                  selectedAmount === amt
                    ? "bg-gradient-gold text-black dark:text-black border-transparent shadow-[0_0_20px_rgba(255,181,71,0.6)] scale-105 ring-2 ring-accent/50 font-black hover:text-black dark:hover:text-black"
                    : "bg-white/5 dark:bg-white/5 border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                )}
              >
                {amt}
              </Button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          type="button"
          onClick={onStart}
          disabled={isLoadingQuestions}
          className="w-full h-16 mt-4 bg-gradient-primary glow-primary text-white font-black text-sm md:text-base uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_0_30px_rgba(161,0,255,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {isLoadingQuestions ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>INITIALIZING DATABASE STRIKE...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 text-amber-300 animate-bounce" />
              <span>LAUNCH TRIVIA STRIKE</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
