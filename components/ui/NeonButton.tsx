"use client";

import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "accent" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function NeonButton({
    children,
    className,
    variant = "primary",
    size = "md",
    ...props
}: NeonButtonProps) {
    const variants = {
        primary: "bg-blue-600/20 text-blue-400 border-blue-500/50 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        secondary: "bg-violet-600/20 text-violet-400 border-violet-500/50 hover:bg-violet-600/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]",
        accent: "bg-emerald-600/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-600/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]",
        ghost: "bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-white",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative rounded-lg border font-medium transition-colors duration-200 cursor-pointer active:scale-95",
                "flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
