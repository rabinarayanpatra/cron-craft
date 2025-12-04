"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import cronstrue from "cronstrue";
import { getNextRuns } from "@/app/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Copy, Clock, Calendar } from "lucide-react";

interface CronPreviewProps {
    cronString: string;
    error: string | null;
    onCronChange: (newCron: string) => void;
}

export function CronPreview({ cronString, error, onCronChange }: CronPreviewProps) {
    const [description, setDescription] = useState<string>("");
    const [nextRuns, setNextRuns] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (error) {
            setDescription("Invalid cron expression");
            setNextRuns([]);
            return;
        }

        // Handle Description (Client-side)
        try {
            const desc = cronstrue.toString(cronString, { verbose: true });
            setDescription(desc);
        } catch (err) {
            setDescription("Invalid cron expression");
        }

        // Handle Next Runs (Server-side)
        const fetchNextRuns = async () => {
            const runs = await getNextRuns(cronString);
            setNextRuns(runs);
        };
        fetchNextRuns();

    }, [cronString, error]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cronString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <GlassCard className="relative overflow-hidden">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Cron Expression
                    </label>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={cronString}
                            onChange={(e) => onCronChange(e.target.value)}
                            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-xl font-mono text-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                        <NeonButton onClick={handleCopy} variant="secondary">
                            <Copy className="w-4 h-4" />
                            {copied ? "Copied!" : "Copy"}
                        </NeonButton>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard title="Human Readable">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-slate-200">
                                {description}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                                Based on current configuration
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard title="Next 5 Runs">
                    <div className="space-y-3">
                        {nextRuns.length > 0 ? (
                            nextRuns.map((run, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-sm text-slate-300 border-b border-white/5 pb-2 last:border-0 last:pb-0"
                                >
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-xs font-mono text-slate-500">
                                        {i + 1}
                                    </span>
                                    {new Date(run).toLocaleString()}
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-slate-500 italic">No scheduled runs</p>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
