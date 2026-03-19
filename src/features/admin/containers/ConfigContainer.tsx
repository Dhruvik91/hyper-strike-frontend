"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { PlatformConfigForm } from "../components/PlatformConfigForm";

export function ConfigContainer() {
    return (
        <div className="space-y-10 pb-16">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-md">
                        <Settings className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80">System Configuration</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl">
                    Platform Settings
                </h1>
                <p className="text-zinc-500 font-medium mt-1">
                    Configure global platform parameters, pricing, and commission structures.
                </p>
            </motion.div>

            {/* Config Form */}
            <PlatformConfigForm />
        </div>
    );
}
