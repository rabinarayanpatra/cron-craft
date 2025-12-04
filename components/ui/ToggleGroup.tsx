"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ToggleOption {
    value: string | number;
    label: string;
}

interface ToggleGroupProps {
    options: ToggleOption[];
    value: string | number | (string | number)[];
    onChange: (value: any) => void;
    multiple?: boolean;
    className?: string;
}

export function ToggleGroup({
    options,
    value,
    onChange,
    multiple = false,
    className,
}: ToggleGroupProps) {
    const isSelected = (optionValue: string | number) => {
        if (multiple && Array.isArray(value)) {
            return value.includes(optionValue);
        }
        return value === optionValue;
    };

    const handleSelect = (optionValue: string | number) => {
        if (multiple && Array.isArray(value)) {
            if (value.includes(optionValue)) {
                onChange(value.filter((v) => v !== optionValue));
            } else {
                onChange([...value, optionValue]);
            }
        } else {
            onChange(optionValue);
        }
    };

    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {options.map((option) => {
                const selected = isSelected(option.value);
                return (
                    <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                            "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer active:scale-95 border",
                            selected
                                ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                                : "bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200"
                        )}
                    >
                        {option.label}
                    </motion.button>
                );
            })}
        </div>
    );
}
