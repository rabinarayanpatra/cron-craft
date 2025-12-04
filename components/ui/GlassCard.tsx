"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export function GlassCard({ children, className, title }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            {title && (
                <h3 className="text-lg font-semibold text-white/90 mb-4 tracking-wide">
                    {title}
                </h3>
            )}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
