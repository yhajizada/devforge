"use client";

import { useState } from "react";
import { formatJson, minifyJson, jsonToTypeScript } from "@/lib/tools-core";
import { Copy, Check, FileCode, Minimize2, Sparkles, AlertCircle } from "lucide-react";

const SAMPLE_JSON = JSON.stringify(
  {
    name: "DevForge",
    stars: 1250,
    tags: ["developer-tools", "open-source", "offline-first"],
    settings: {
      theme: "dark",
      telemetry: false,
    },
  },
  null,
  2
);

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = (indent: number = 2) => {
    try {
      setOutput(formatJson(input, indent));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifyJson(input));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleToTypeScript = () => {
    try {
      setOutput(jsonToTypeScript(input, "ApiResponse"));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Format (2 spaces)</span>
          </button>
          <button
            onClick={handleMinify}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            <span>Minify</span>
          </button>
          <button
            onClick={handleToTypeScript}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Generate TypeScript Types</span>
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied!" : "Copy Result"}</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 p-3 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Raw JSON Input
          </label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Formatted Output
          </label>
          <textarea
            readOnly
            rows={12}
            value={output}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
