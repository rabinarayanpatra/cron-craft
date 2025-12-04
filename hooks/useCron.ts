"use client";

import { useState, useEffect, useCallback } from "react";
// @ts-ignore
const cronParser = require("cron-parser");

export type CronMode = "every" | "step" | "specific" | "range";

export interface CronPartState {
    mode: CronMode;
    selected: number[]; // For specific
    step: number; // For step (every X)
    range: { min: number; max: number }; // For range
}

export interface CronState {
    minutes: CronPartState;
    hours: CronPartState;
    dom: CronPartState;
    month: CronPartState;
    dow: CronPartState;
}

const DEFAULT_PART_STATE: CronPartState = {
    mode: "every",
    selected: [],
    step: 1,
    range: { min: 0, max: 0 },
};

const INITIAL_STATE: CronState = {
    minutes: { ...DEFAULT_PART_STATE, range: { min: 0, max: 59 } },
    hours: { ...DEFAULT_PART_STATE, range: { min: 0, max: 23 } },
    dom: { ...DEFAULT_PART_STATE, range: { min: 1, max: 31 } },
    month: { ...DEFAULT_PART_STATE, range: { min: 1, max: 12 } },
    dow: { ...DEFAULT_PART_STATE, range: { min: 0, max: 6 } },
};

export function useCron(initialCron = "* * * * *") {
    const [cronString, setCronString] = useState(initialCron);
    const [cronState, setCronState] = useState<CronState>(INITIAL_STATE);
    const [error, setError] = useState<string | null>(null);

    // Parse cron string to state
    const parseCronString = useCallback((cron: string) => {
        try {
            // Basic validation (skipped for now due to import issues)
            // cronParser.parseExpression(cron);
            setError(null);

            const parts = cron.trim().split(/\s+/);
            if (parts.length !== 5) {
                // Handle non-standard cron lengths if necessary, but for now strict 5 parts
                return;
            }

            const [min, hour, dom, month, dow] = parts;

            const parsePart = (part: string, minVal: number, maxVal: number): CronPartState => {
                if (part === "*") return { ...DEFAULT_PART_STATE, mode: "every" };

                if (part.includes("/")) {
                    const [, step] = part.split("/");
                    return { ...DEFAULT_PART_STATE, mode: "step", step: parseInt(step, 10) };
                }

                if (part.includes("-")) {
                    const [start, end] = part.split("-");
                    return {
                        ...DEFAULT_PART_STATE,
                        mode: "range",
                        range: { min: parseInt(start, 10), max: parseInt(end, 10) }
                    };
                }

                if (part.includes(",") || !isNaN(parseInt(part))) {
                    const selected = part.split(",").map(n => parseInt(n, 10)).filter(n => !isNaN(n));
                    return { ...DEFAULT_PART_STATE, mode: "specific", selected };
                }

                return { ...DEFAULT_PART_STATE, mode: "every" }; // Fallback
            };

            setCronState({
                minutes: parsePart(min, 0, 59),
                hours: parsePart(hour, 0, 23),
                dom: parsePart(dom, 1, 31),
                month: parsePart(month, 1, 12),
                dow: parsePart(dow, 0, 6),
            });

        } catch (err) {
            console.error("Cron Parse Error:", err);
            setError("Invalid cron expression");
        }
    }, []);

    // Generate cron string from state
    const generateCronString = useCallback((state: CronState) => {
        const generatePart = (part: CronPartState) => {
            switch (part.mode) {
                case "every":
                    return "*";
                case "step":
                    return `*/${part.step}`;
                case "range":
                    return `${part.range.min}-${part.range.max}`;
                case "specific":
                    return part.selected.length > 0 ? part.selected.sort((a, b) => a - b).join(",") : "*";
                default:
                    return "*";
            }
        };

        const min = generatePart(state.minutes);
        const hour = generatePart(state.hours);
        const dom = generatePart(state.dom);
        const month = generatePart(state.month);
        const dow = generatePart(state.dow);

        return `${min} ${hour} ${dom} ${month} ${dow}`;
    }, []);

    // Sync string -> state (when user types)
    const updateCronString = (newString: string) => {
        setCronString(newString);
        parseCronString(newString);
    };

    // Sync state -> string (when user uses builder)
    const updateCronState = (newState: Partial<CronState>) => {
        const mergedState = { ...cronState, ...newState };
        setCronState(mergedState);
        const newString = generateCronString(mergedState);
        setCronString(newString);
        setError(null); // Generated strings should be valid
    };

    // Initialize
    useEffect(() => {
        parseCronString(initialCron);
    }, [initialCron, parseCronString]);

    return {
        cronString,
        cronState,
        error,
        updateCronString,
        updateCronState,
    };
}
