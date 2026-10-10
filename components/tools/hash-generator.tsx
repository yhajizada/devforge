"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Hash } from "lucide-react";

export function HashGenerator() {
  const [text, setText] = useState("DevForge rocks!");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    async function calculateHashes() {
      if (!text) {
        setSha256("");
        setSha512("");
        return;
      }
      const msgUint8 = new TextEncoder().encode(text);

      // SHA-256
      const hash256Buffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hash256Array = Array.from(new Uint8Array(hash256Buffer));
      const hash256Hex = hash256Array.map((b) => b.toString(16).padStart(2, "0")).join("");
      setSha256(hash256Hex);

      // SHA-512
      const hash512Buffer = await crypto.subtle.digest("SHA-512", msgUint8);
      const hash512Array = Array.from(new Uint8Array(hash512Buffer));
      const hash512Hex = hash512Array.map((b) => b.toString(16).padStart(2, "0")).join("");
      setSha512(hash512Hex);
    }

    calculateHashes();
  }, [text]);

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Plain Text Input
        </label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="space-y-4">
        {/* SHA-256 */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              SHA-256 Checksum (256-bit)
            </span>
            <button
              onClick={() => handleCopy(sha256, "sha256")}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {copied === "sha256" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied === "sha256" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="font-mono text-xs bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl break-all select-all text-zinc-800 dark:text-zinc-200">
            {sha256 || "—"}
          </div>
        </div>

        {/* SHA-512 */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              SHA-512 Checksum (512-bit)
            </span>
            <button
              onClick={() => handleCopy(sha512, "sha512")}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {copied === "sha512" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied === "sha512" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="font-mono text-xs bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl break-all select-all text-zinc-800 dark:text-zinc-200">
            {sha512 || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
