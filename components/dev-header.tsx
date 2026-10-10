"use client";

import { useTheme } from "./theme-provider";
import { Sun, Moon, Github, Shield, Terminal, Zap } from "lucide-react";

export function DevHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
                DevForge<span className="text-cyan-500">.</span>
              </span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                v1.0.0
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mr-2">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>100% Client-Side & Private</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="https://github.com/yhajizada/devforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3.5 text-xs font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <Github className="h-4 w-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
