"use client";

import { motion } from "framer-motion";
import { MessageSquare, Briefcase, Users, ArrowUpRight } from "lucide-react";

interface Department {
  title: string;
  email: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}

const departments: Department[] = [
  {
    title: "For User Support & Reward Queries",
    email: "support@hyperstrikex.co.uk",
    icon: MessageSquare,
    gradient: "from-primary/20 via-primary/5 to-transparent",
    iconColor: "text-primary",
  },
  {
    title: "For Brand Partnerships & Advertising",
    email: "partners@hyperstrikex.co.uk",
    icon: Briefcase,
    gradient: "from-accent/20 via-accent/5 to-transparent",
    iconColor: "text-accent",
  },
  {
    title: "For Career Opportunities & Team Applications",
    email: "careers@hyperstrikex.co.uk",
    icon: Users,
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    iconColor: "text-purple-400",
  },
];

export function ContactDepartments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-xl mx-auto glass-card rounded-[32px] p-5 sm:p-6 md:p-10 relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Background ambient blurs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />

      <div>
        <div className="relative z-10 mb-6 sm:mb-8 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase mb-2">
            Contact Departments
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">
            Reach out directly to our dedicated teams for specific inquiries.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.a
                key={dept.email}
                href={`mailto:${dept.email}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group relative flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden hover:scale-[1.02]"
                aria-label={`Email ${dept.title} at ${dept.email}`}
              >
                {/* Subtle gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${dept.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Icon wrapper */}
                <div className="relative z-10 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${dept.iconColor}`} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-black text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1 leading-snug pointer-events-none">
                    {dept.title}
                  </p>
                  <span className="block text-xs sm:text-sm md:text-base font-bold text-white tracking-wide truncate group-hover:text-gradient-primary group-hover:underline transition-all">
                    {dept.email}
                  </span>
                </div>

                {/* External link icon */}
                <div className="relative z-10 shrink-0 p-1 sm:p-1.5 rounded-lg group-hover:bg-white/10 text-muted-foreground group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Decorative / reassurance footer inside the card */}
      <div className="relative z-10 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-muted-foreground text-center sm:text-left">
        <span>Response time: &lt; 24 hours</span>
        <span className="text-primary font-bold">Secure & Encrypted</span>
      </div>
    </motion.div>
  );
}

