"use client";

import { useState, useEffect } from "react";
import { useCron } from "@/hooks/useCron";
import { TimeBuilder } from "@/components/builder/TimeBuilder";
import { DateBuilder } from "@/components/builder/DateBuilder";
import { CronPreview } from "@/components/preview/CronPreview";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Switch } from "@/components/ui/Switch";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command";
import { motion } from "motion/react";
import { Sparkles, Zap, Search, Command as CommandIcon } from "lucide-react";

const PRESETS = [
  { label: "Every Minute", value: "* * * * *" },
  { label: "Hourly", value: "0 * * * *" },
  { label: "Daily at Midnight", value: "0 0 * * *" },
  { label: "Weekly (Sun)", value: "0 0 * * 0" },
  { label: "Monthly (1st)", value: "0 0 1 * *" },
  { label: "Weekdays (9am)", value: "0 9 * * 1-5" },
  { label: "Every 5 Minutes", value: "*/5 * * * *" },
  { label: "Every 15 Minutes", value: "*/15 * * * *" },
  { label: "Every 30 Minutes", value: "*/30 * * * *" },
  { label: "Every 2 Hours", value: "0 */2 * * *" },
  { label: "Every 6 Hours", value: "0 */6 * * *" },
  { label: "Every 12 Hours", value: "0 */12 * * *" },
  { label: "Every Second (High Load)", value: "* * * * * *" },
  { label: "Every 10 Seconds", value: "*/10 * * * * *" },
  { label: "Every 30 Seconds", value: "*/30 * * * * *" },
];

export default function Home() {
  const {
    cronString,
    cronState,
    includeSeconds,
    error,
    updateCronString,
    updateCronState,
    toggleSeconds,
  } = useCron();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handlePresetSelect = (value: string) => {
    updateCronString(value);
    setOpen(false);
  };

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
          <div className="flex gap-2 items-center">
            <NeonButton
              variant="secondary"
              size="sm"
              onClick={() => setOpen(true)}
              className="hidden md:flex"
            >
              <Search className="w-4 h-4" />
              Search Presets
              <span className="ml-2 text-xs text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </span>
            </NeonButton>
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

            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Enable Seconds</h3>
                  <p className="text-xs text-slate-500">
                    Allow 6-part cron expressions
                  </p>
                </div>
              </div>
              <Switch
                checked={includeSeconds}
                onCheckedChange={toggleSeconds}
              />
            </div>

            <TimeBuilder
              seconds={cronState.seconds}
              minutes={cronState.minutes}
              hours={cronState.hours}
              includeSeconds={includeSeconds}
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
                {PRESETS.slice(0, 8).map((preset) => (
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
                <button
                  onClick={() => setOpen(true)}
                  className="w-full mt-2 text-xs text-center text-slate-500 hover:text-blue-400 transition-colors"
                >
                  View all presets (⌘K)
                </button>
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

        {/* Command Dialog */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search presets (e.g., 'every minute', 'daily')..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Common Presets">
              {PRESETS.map((preset) => (
                <CommandItem
                  key={preset.value}
                  onSelect={() => handlePresetSelect(preset.value)}
                >
                  <CommandIcon className="mr-2 h-4 w-4" />
                  <span>{preset.label}</span>
                  <span className="ml-auto text-xs text-slate-500 font-mono">
                    {preset.value}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </main>
  );
}
