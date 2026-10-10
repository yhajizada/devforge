"use client";

import { useState } from "react";
import { formatSql } from "@/lib/tools-core";
import { Copy, Check, Sparkles } from "lucide-react";

const SAMPLE_SQL =
  "SELECT u.id, u.name, o.amount FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.amount > 100 AND u.active = true ORDER BY o.amount DESC LIMIT 50;";

export function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE_SQL);
  const [output, setOutput] = useState(formatSql(SAMPLE_SQL));
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setOutput(formatSql(input));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleFormat}
          className="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Format SQL Query</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied!" : "Copy SQL"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Raw SQL Query
          </label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Clean Formatted Output
          </label>
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
