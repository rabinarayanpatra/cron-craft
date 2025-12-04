"use client";

import { useCron } from "@/hooks/useCron";
import { TimeBuilder } from "@/components/builder/TimeBuilder";
import { DateBuilder } from "@/components/builder/DateBuilder";
import { CronPreview } from "@/components/preview/CronPreview";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "motion/react";
import { Sparkles, Zap } from "lucide-react";

const PRESETS = [
  { label: "Every Minute", value: "* * * * *" },
  { label: "Hourly", value: "0 * * * *" },
  { label: "Daily at Midnight", value: "0 0 * * *" },
  { label: "Weekly (Sun)", value: "0 0 * * 0" },
  { label: "Monthly (1st)", value: "0 0 1 * *" },
  { label: "Weekdays (9am)", value: "0 9 * * 1-5" },
];

export default function Home() {
  const { cronString, cronState, error, updateCronString, updateCronState } =
    useCron();

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                Cron Hub
              </h1>
              <p className="text-slate-500 text-sm">
                Visual Cron Expression Generator
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <NeonButton variant="ghost" size="sm" onClick={() => window.open('https://github.com', '_blank')}>
              GitHub
            </NeonButton>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Builder Area */}
          <div className="lg:col-span-8 space-y-8">
            <CronPreview
              cronString={cronString}
              error={error}
              onCronChange={updateCronString}
            />

            <TimeBuilder
              minutes={cronState.minutes}
              hours={cronState.hours}
              onChange={(type, newState) =>
                updateCronState({ [type]: newState })
              }
            />

            <DateBuilder
              dom={cronState.dom}
              month={cronState.month}
              dow={cronState.dow}
              onChange={(type, newState) =>
                updateCronState({ [type]: newState })
              }
            />
          </div>

          {/* Sidebar / Presets */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard title="Quick Presets">
              <div className="grid grid-cols-1 gap-3">
                {PRESETS.map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileHover={{ x: 4 }}
                    onClick={() => updateCronString(preset.value)}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all group text-left"
                  >
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                      {preset.label}
                    </span>
                    <Zap className="w-4 h-4 text-yellow-500/50 group-hover:text-yellow-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-violet-900/20 to-blue-900/20 border-violet-500/20">
              <h3 className="text-lg font-semibold text-white mb-2">
                Pro Tip
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                You can type directly into the cron input box above! The visual
                builder will update automatically to match your expression.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-600 text-sm pt-8 border-t border-white/5">
          <p>© {new Date().getFullYear()} Cron Hub. Built with Next.js 16 & Tailwind v4.</p>
        </footer>
      </div>
    </main>
  );
}
