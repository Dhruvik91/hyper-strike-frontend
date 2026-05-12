"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function LandingHero() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center px-4 hero-glow overflow-hidden pb-12">
      {/* Animated Background Rings */}
      <motion.div
        style={{ rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square border-[1px] border-primary/10 rounded-full pointer-events-none"
      />
      <motion.div
        style={{ rotate: rotate, scale: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border-[1px] border-primary/5 rounded-full pointer-events-none"
      />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start order-2 lg:order-1"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-primary rounded-full shadow-[0_0_10px_oklch(0.6_0.25_295)]" />
            <span className="text-primary font-black tracking-[0.4em] text-[10px] md:text-xs uppercase italic">
              Play. Learn. Win.
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-[2.6rem] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            KNOWLEDGE <br /> IS POWER. <br />
            <span className="text-gradient-primary italic drop-shadow-[0_0_15px_rgba(161,0,255,0.4)]">HYPERSTRIKEX</span> <br /> IS THE FUTURE.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-bold">
            Compete in trivia. Climb the leaderboard. <br className="hidden sm:block" /> Earn epic rewards in the new tech era.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mt-4 w-full sm:w-auto">
            <Link href={FRONTEND_ROUTES.REGISTER} className="w-full sm:w-auto">
              <Button className="w-full bg-gradient-primary glow-primary text-white rounded-2xl h-16 md:h-18 px-12 text-sm md:text-base font-black tracking-widest group uppercase relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                JOIN NOW <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-full max-w-[340px] md:max-w-[600px] mx-auto lg:ml-auto order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[80px] md:blur-[120px] rounded-full" />
          {/* Static Visual Wrapper */}
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-h.png"
              alt="3D Visual"
              fill
              className="object-contain relative z-10 drop-shadow-[0_0_50px_rgba(161,0,255,0.6)]"
              priority
            />
          </div>
          {/* Podium Ring */}
          <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[80%] h-12 bg-primary/40 blur-[40px] rounded-full opacity-50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-2 bg-primary rounded-full shadow-[0_0_20px_oklch(0.6_0.25_295)]" />
        </motion.div>
      </div>
    </section>
  );
}
