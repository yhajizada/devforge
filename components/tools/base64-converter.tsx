"use client";

import { useState } from "react";
import { encodeBase64, decodeBase64 } from "@/lib/tools-core";
import { Copy, Check, ArrowDownUp } from "lucide-react";

export function Base64Converter() {
  const [plain, setPlain] = useState("Hello DevForge!");
  const [encoded, setEncoded] = useState(encodeBase64("Hello DevForge!"));
  const [copied, setCopied] = useState<string | null>(null);

  const handlePlainChange = (val: string) => {
    setPlain(val);
    try {
      setEncoded(encodeBase64(val));
    } catch {
      setEncoded("");
    }
  };

  const handleEncodedChange = (val: string) => {
    setEncoded(val);
    try {
      setPlain(decodeBase64(val));
    } catch {
      // invalid base64 in progress
    }
  };

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Plain Text (UTF-8)
            </label>
            <button
              onClick={() => handleCopy(plain, "plain")}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {copied === "plain" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          <textarea
            rows={8}
            value={plain}
            onChange={(e) => handlePlainChange(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Base64 String
            </label>
            <button
              onClick={() => handleCopy(encoded, "encoded")}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {copied === "encoded" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          <textarea
            rows={8}
            value={encoded}
            onChange={(e) => handleEncodedChange(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
