"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Menu, Search, Bell, ArrowRight, ChevronRight, Trophy, 
  Users, Code, Star, Zap, Lightbulb, Gamepad2, Gift, Crown,
  Home as HomeIcon, Navigation, Music, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Subtle parallax for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white overflow-x-hidden pb-24 md:pb-0 font-sans selection:bg-primary/30">
      {/* Premium Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-18 px-4 flex items-center justify-between backdrop-blur-2xl bg-black/40 border-b border-white/5 z-[100]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 rounded-xl border border-white/5">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 glow-primary rounded-full border border-primary/50 p-1 bg-black">
              <Image src="/images/hero-h.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none italic">HYPER<span className="text-gradient-gold">STRIKEX</span></span>
              <span className="text-[8px] tracking-[0.3em] text-muted-foreground font-black uppercase">Tech • Trivia • Community</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/5 rounded-xl">
            <Search className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/5 rounded-xl">
              <Bell className="w-5 h-5" />
            </Button>
            <span className="absolute top-2 right-2 w-4.5 h-4.5 bg-primary text-[9px] font-black flex items-center justify-center rounded-full border-2 border-[#050505] shadow-[0_0_10px_rgba(161,0,255,0.8)]">3</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/40 overflow-hidden relative glow-primary ml-1 ring-4 ring-primary/5">
            <Image src="/images/hero-h.png" alt="Profile" fill className="object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
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
                <Button className="bg-gradient-primary glow-primary text-white rounded-2xl h-16 md:h-18 px-12 text-sm md:text-base font-black tracking-widest group uppercase relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  JOIN NOW <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button variant="outline" className="border-primary/30 bg-white/5 text-white rounded-2xl h-16 md:h-18 px-12 text-sm md:text-base font-black tracking-widest hover:bg-primary/10 transition-all w-full sm:w-auto uppercase group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  EXPLORE <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
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

        {/* Stats Strip */}
        <section className="px-4 py-8 md:py-12 bg-black border-y border-white/5">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Users, label: "Active Members", value: "25K+" },
              { icon: Trophy, label: "Trivia Played", value: "10K+" },
              { icon: Code, label: "Tech Articles", value: "5K+" },
              { icon: Star, label: "Expert Contributors", value: "100+" },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex items-center gap-3 p-4 rounded-3xl bg-[#0A0A0F]/50 border border-white/5 glass-card"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(161,0,255,0.2)]">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">{stat.value}</span>
                  <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black mt-1">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* VIP Subscription Section */}
        <section className="container mx-auto px-4 mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[40px] p-8 md:p-14 relative overflow-hidden glow-border-purple group"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[40%] h-[150%] bg-primary/20 blur-[120px] -rotate-45 pointer-events-none" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[50%] h-full bg-primary/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              {/* Left: VIP Badge Visual */}
              <div className="relative w-48 h-64 md:w-56 md:h-72 shrink-0 hidden md:block">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B4E] to-black rounded-3xl border border-primary/40 shadow-2xl rotate-[-6deg] flex flex-col items-center justify-center">
                    <div className="relative mb-4">
                       <Crown className="w-20 h-20 text-accent drop-shadow-[0_0_20px_oklch(0.8_0.2_80)]" />
                       <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full blur-[2px] opacity-50" />
                    </div>
                    <span className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">VIP</span>
                    <div className="mt-4 flex gap-1">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                       ))}
                    </div>
                 </div>
                 {/* Floating Particles */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                    className="absolute -top-4 -right-4"
                 >
                    <Sparkles className="w-8 h-8 text-accent opacity-40 blur-[1px]" />
                 </motion.div>
              </div>

              {/* Center: Content */}
              <div className="flex-1 text-center lg:text-left">
                <span className="text-primary font-black tracking-[0.5em] text-[10px] md:text-xs uppercase italic mb-4 block">VIP SUBSCRIPTION</span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
                   <span className="text-white">JUST</span> <br className="hidden sm:block" />
                   <span className="text-gradient-primary text-glow-primary uppercase">£1 / MONTH</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-lg font-bold mb-10 max-w-xl mx-auto lg:mx-0">
                  Unlock premium features, exclusive rewards, and early access to all tech articles.
                </p>

                {/* Features Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
                   {[
                     { icon: Zap, text: "Ad-Free" },
                     { icon: Gift, text: "Exclusives" },
                     { icon: Trophy, text: "Leaderboard" },
                     { icon: Crown, text: "Priority" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 justify-center lg:justify-start group/item">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/item:bg-primary/30 transition-colors">
                           <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black text-white/80 uppercase tracking-widest">{item.text}</span>
                     </div>
                   ))}
                </div>

                <Button className="w-full lg:w-auto h-16 md:h-18 px-16 bg-gradient-primary glow-primary text-white font-black tracking-[0.2em] text-sm rounded-2xl relative overflow-hidden group uppercase">
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                   JOIN VIP NOW <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              {/* Right: Circular CTA Badge */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 flex items-center justify-center">
                 <div className="absolute inset-0 border-[1px] border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
                 <div className="absolute inset-4 border-[1px] border-white/5 rounded-full" />
                 <div className="absolute inset-8 bg-gradient-to-b from-primary/20 to-transparent blur-[40px] rounded-full" />
                 
                 <div className="text-center relative z-10">
                    <div className="text-5xl md:text-7xl font-black text-gradient-gold text-glow-gold leading-none">£1</div>
                    <div className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] uppercase mt-2 italic">ONLY</div>
                 </div>
                 
                 {/* Orbiting Icon */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0"
                 >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-primary/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(161,0,255,0.4)]">
                       <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                 </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Rewards Section */}
        <section className="py-20 md:py-32 px-4 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="flex items-end justify-between mb-12 md:mb-16">
              <div className="flex flex-col gap-2">
                <span className="text-primary font-black tracking-[0.4em] text-[10px] uppercase italic">Curated Loot</span>
                <h2 className="text-3xl md:text-5xl font-black text-gradient-gold uppercase leading-none">Win Epic Rewards</h2>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-black tracking-widest uppercase mb-1">
                <span>Swipe to Explore</span>
                <div className="flex gap-1">
                   <ChevronRight className="w-4 h-4 rotate-180 opacity-30" />
                   <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>
            </div>

            {/* Reward Cards Carousel */}
            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {/* Reward Card 01 */}
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col min-w-[88vw] sm:min-w-[400px] md:min-w-0 snap-center h-[580px] md:h-[720px] glow-border-purple group"
              >
                <div className="absolute top-8 left-8 bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-muted-foreground tracking-widest">01</div>
                <div className="mt-12 mb-6 flex flex-col items-center text-center">
                   <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-2">Welcome Bonus</span>
                   <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-gradient-gold text-glow-gold">5 POINTS</h3>
                </div>
                <div className="relative flex-1 w-full mb-10">
                   <Image src="/images/points.png" alt="Reward" fill className="object-contain drop-shadow-[0_0_30px_rgba(255,181,71,0.4)]" />
                </div>
                {/* Podium */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-accent/20 blur-[30px] rounded-full" />
                
                <p className="text-muted-foreground text-xs md:text-sm text-center mb-10 font-bold leading-relaxed px-6 italic">
                  Kickstart your journey with 5 free points!
                </p>
                <Button variant="ghost" className="w-full text-white font-black tracking-widest text-[11px] uppercase bg-white/5 border border-white/10 rounded-2xl h-16 hover:bg-primary/20 transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  CLAIM NOW <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>

              {/* Reward Card 02 (Featured) */}
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col min-w-[88vw] sm:min-w-[400px] md:min-w-0 snap-center h-[580px] md:h-[720px] border-2 border-primary shadow-[0_0_80px_-10px_rgba(161,0,255,0.4)] bg-gradient-to-b from-primary/10 to-black/20 group"
              >
                <div className="absolute top-8 left-8 bg-primary border border-white/20 px-4 py-2 rounded-xl text-[10px] font-black text-white tracking-widest">02</div>
                <div className="mt-12 mb-6 flex flex-col items-center text-center">
                   <span className="text-[10px] font-black text-primary-foreground tracking-[0.3em] uppercase mb-2">Weekly Win</span>
                   <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-gradient-primary text-glow-primary">AIRPODS PRO 2</h3>
                </div>
                <div className="relative flex-1 w-full mb-10">
                   <Image src="/images/airpods.png" alt="Reward" fill className="object-contain scale-125 drop-shadow-[0_0_40px_rgba(161,0,255,0.6)]" />
                   <div className="absolute top-0 right-10 opacity-30">
                     <Music className="w-8 h-8 text-primary blur-[2px]" />
                   </div>
                </div>
                {/* Podium */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[80%] h-12 podium-glow rounded-full" />
                
                <p className="text-muted-foreground text-xs md:text-sm text-center mb-10 font-bold leading-relaxed px-6 italic">
                  Play this week and win Apple AirPods Pro 2!
                </p>
                <Button className="w-full bg-gradient-primary text-white font-black tracking-widest text-[11px] uppercase rounded-2xl h-18 shadow-[0_20px_40px_-10px_rgba(161,0,255,0.6)] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                   PLAY NOW <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>

              {/* Reward Card 03 */}
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-[40px] p-8 relative overflow-hidden flex flex-col min-w-[88vw] sm:min-w-[400px] md:min-w-0 snap-center h-[580px] md:h-[720px] glow-border-purple group"
              >
                <div className="absolute top-8 left-8 bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-muted-foreground tracking-widest">03</div>
                <div className="mt-12 mb-6 flex flex-col items-center text-center">
                   <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-2">VIP Club</span>
                   <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">WIN IPHONE <br /> 15 PRO MAX</h3>
                </div>
                <div className="relative flex-1 w-full mb-10">
                   <Image src="/images/iphone.png" alt="Reward" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
                   <div className="absolute bottom-10 right-4 bg-accent/20 backdrop-blur-xl border border-accent/40 px-3 py-1 rounded-lg flex items-center gap-1">
                      <Crown className="w-3 h-3 text-accent" />
                      <span className="text-[8px] font-black text-accent uppercase tracking-tighter">VIP ONLY</span>
                   </div>
                </div>
                {/* Podium Shadow */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-white/5 blur-[25px] rounded-full" />
                
                <p className="text-muted-foreground text-xs md:text-sm text-center mb-10 font-bold leading-relaxed px-10 italic">
                  Join the VIP Club and win iPhone 15 Pro Max & luxury prizes!
                </p>
                <Button variant="ghost" className="w-full text-white font-black tracking-widest text-[11px] uppercase bg-white/5 border border-white/10 rounded-2xl h-16 hover:bg-white/10 transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  JOIN VIP <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="pb-32 pt-10 px-4 relative">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {[
              { icon: Zap, label: "Cutting Edge Tech", desc: "Latest innovation." },
              { icon: Lightbulb, label: "Fun Trivia", desc: "Win daily prizes." },
              { icon: Users, label: "Strong Community", desc: "Worldwide network." },
              { icon: Trophy, label: "Leaderboards", desc: "Become the champion." },
              { icon: Gift, label: "Exclusive Rewards", desc: "Unlock VIP benefits." },
            ].map((feature, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex flex-col items-center text-center gap-4 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] bg-[#0A0A0F] border border-white/5 flex items-center justify-center shadow-lg group-hover:border-primary/50 group-hover:glow-primary transition-all duration-500">
                  <feature.icon className="w-7 h-7 md:w-9 md:h-9 text-primary drop-shadow-[0_0_8px_rgba(161,0,255,0.5)]" />
                </div>
                <div className="flex flex-col gap-1.5 px-2">
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white leading-tight">{feature.label}</h4>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground leading-tight hidden sm:block font-bold">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-22 bg-[#050505]/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-2 md:hidden z-[200] rounded-t-[32px]">
        {[
          { icon: HomeIcon, label: "Home", active: true },
          { icon: Gamepad2, label: "Trivia" },
          { icon: Navigation, label: "Community" },
          { icon: Gift, label: "Rewards" },
          { icon: Crown, label: "VIP Club" },
        ].map((item, i) => (
          <button key={i} className={`flex flex-col items-center gap-2 transition-all w-16 relative ${item.active ? 'text-white' : 'text-muted-foreground/50'}`}>
            {item.active && (
              <motion.div 
                layoutId="nav-active"
                className="absolute top-[-15px] w-12 h-12 bg-primary/20 blur-[15px] rounded-full -z-10"
              />
            )}
            <item.icon className={`w-6 h-6 ${item.active ? 'text-primary drop-shadow-[0_0_12px_rgba(161,0,255,0.8)] scale-110' : ''} transition-all`} />
            <span className={`text-[8px] font-black uppercase tracking-widest ${item.active ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
            {item.active && <div className="w-1 h-1 bg-primary rounded-full mt-0.5 shadow-[0_0_5px_rgba(161,0,255,1)]" />}
          </button>
        ))}
      </footer>
    </div>
  );
}
