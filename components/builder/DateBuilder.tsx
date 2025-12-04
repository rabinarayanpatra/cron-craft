"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { CronPartState, CronMode } from "@/hooks/useCron";
import { cn } from "@/lib/utils";

interface DateBuilderProps {
    dom: CronPartState;
    month: CronPartState;
    dow: CronPartState;
    onChange: (type: "dom" | "month" | "dow", newState: CronPartState) => void;
}

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DateBuilder({ dom, month, dow, onChange }: DateBuilderProps) {
    const [activeTab, setActiveTab] = useState<"dom" | "month" | "dow">("dom");

    const renderControls = (
        type: "dom" | "month" | "dow",
        state: CronPartState,
        maxVal: number,
        labels?: string[]
    ) => {
        const updateMode = (mode: CronMode) => {
            onChange(type, { ...state, mode });
        };

        const updateStep = (step: number) => {
            onChange(type, { ...state, step });
        };

        const updateSelected = (selected: number[]) => {
            onChange(type, { ...state, selected });
        };

        const updateRange = (range: { min: number; max: number }) => {
            onChange(type, { ...state, range });
        };

        return (
            <div className="space-y-6">
                <div className="flex gap-4 border-b border-white/10 pb-4">
                    {(["every", "step", "specific", "range"] as CronMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => updateMode(mode)}
                            className={cn(
                                "text-sm font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer active:scale-95",
                                state.mode === mode
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                    : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={state.mode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {state.mode === "every" && (
                            <p className="text-slate-400">
                                Runs every {type === "dom" ? "day of month" : type === "month" ? "month" : "day of week"}. (*)
                            </p>
                        )}

                        {state.mode === "step" && (
                            <div className="flex items-center gap-3">
                                <span className="text-slate-300">Every</span>
                                <input
                                    type="number"
                                    min={1}
                                    max={maxVal}
                                    value={state.step}
                                    onChange={(e) => updateStep(parseInt(e.target.value) || 1)}
                                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-20 text-center focus:border-blue-500 outline-none"
                                />
                                <span className="text-slate-300">
                                    {type === "dom" ? "day(s)" : type === "month" ? "month(s)" : "day(s)"}
                                </span>
                            </div>
                        )}

                        {state.mode === "specific" && (
                            <div className="space-y-2">
                                <p className="text-sm text-slate-400 mb-2">Select specific {type}:</p>
                                <ToggleGroup
                                    multiple
                                    options={
                                        labels
                                            ? labels.map((label, i) => ({
                                                value: type === "dom" || type === "month" ? i + 1 : i, // Adjust for 1-based vs 0-based
                                                label: label,
                                            }))
                                            : Array.from({ length: maxVal }, (_, i) => ({
                                                value: i + 1,
                                                label: (i + 1).toString(),
                                            }))
                                    }
                                    value={state.selected}
                                    onChange={(val) => updateSelected(val as number[])}
                                    className="max-h-48 overflow-y-auto pr-2 custom-scrollbar"
                                />
                            </div>
                        )}

                        {state.mode === "range" && (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-500">From</label>
                                    {labels ? (
                                        <select
                                            value={state.range.min}
                                            onChange={(e) => updateRange({ ...state.range, min: parseInt(e.target.value) })}
                                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 focus:border-blue-500 outline-none"
                                        >
                                            {labels.map((label, i) => (
                                                <option key={i} value={type === "dom" || type === "month" ? i + 1 : i}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="number"
                                            min={1}
                                            max={maxVal}
                                            value={state.range.min}
                                            onChange={(e) =>
                                                updateRange({ ...state.range, min: parseInt(e.target.value) || 1 })
                                            }
                                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-20 text-center focus:border-blue-500 outline-none"
                                        />
                                    )}
                                </div>
                                <span className="text-slate-500 mt-4">-</span>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-500">To</label>
                                    {labels ? (
                                        <select
                                            value={state.range.max}
                                            onChange={(e) => updateRange({ ...state.range, max: parseInt(e.target.value) })}
                                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 focus:border-blue-500 outline-none"
                                        >
                                            {labels.map((label, i) => (
                                                <option key={i} value={type === "dom" || type === "month" ? i + 1 : i}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="number"
                                            min={1}
                                            max={maxVal}
                                            value={state.range.max}
                                            onChange={(e) =>
                                                updateRange({ ...state.range, max: parseInt(e.target.value) || 1 })
                                            }
                                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-20 text-center focus:border-blue-500 outline-none"
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    };

    return (
        <GlassCard className="w-full" title="Date Configuration">
            <div className="flex gap-2 mb-6 bg-slate-900/50 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setActiveTab("dom")}
                    className={cn(
                        "px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer active:scale-95",
                        activeTab === "dom"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    Day of Month
                </button>
                <button
                    onClick={() => setActiveTab("month")}
                    className={cn(
                        "px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer active:scale-95",
                        activeTab === "month"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    Month
                </button>
                <button
                    onClick={() => setActiveTab("dow")}
                    className={cn(
                        "px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer active:scale-95",
                        activeTab === "dow"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    Weekday
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === "dom" && renderControls("dom", dom, 31)}
                    {activeTab === "month" && renderControls("month", month, 12, MONTHS)}
                    {activeTab === "dow" && renderControls("dow", dow, 7, DAYS)}
                </motion.div>
            </AnimatePresence>
        </GlassCard>
    );
}
