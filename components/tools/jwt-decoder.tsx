"use client";

import { useState } from "react";
import { parseJwt, JwtDecoded } from "@/lib/tools-core";
import { Key, Copy, Check, AlertCircle, RefreshCw } from "lucide-react";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggTW9yZ2FuIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODMxNjIzOTAyfQ.2fJ1N591rTqZk21b4v2q-example";

export function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [decoded, setDecoded] = useState<JwtDecoded | null>(() => {
    try {
      return parseJwt(SAMPLE_JWT);
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleDecode = (val: string) => {
    setToken(val);
    if (!val.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }
    try {
      const res = parseJwt(val);
      setDecoded(res);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JWT format");
      setDecoded(null);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Encoded JWT Token
          </label>
          <button
            onClick={() => handleDecode(SAMPLE_JWT)}
            className="flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Load Sample Token</span>
          </button>
        </div>
        <textarea
          rows={4}
          value={token}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="Paste JWT token here (eyJhbGciOi...)"
          className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3.5 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 p-3 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {decoded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <span className="font-semibold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Header: Algorithm & Token Type
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), "header")}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {copied === "header" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <pre className="text-xs font-mono text-zinc-800 dark:text-zinc-200 overflow-x-auto p-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <span className="font-semibold text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Payload: Claims & Data
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), "payload")}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {copied === "payload" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <pre className="text-xs font-mono text-zinc-800 dark:text-zinc-200 overflow-x-auto p-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>

            {decoded.expiresAt && (
              <div className="text-[11px] pt-2 text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80">
                <span>Expiration Status:</span>
                <span
                  className={`font-semibold ${
                    decoded.isExpired ? "text-rose-500" : "text-emerald-500"
                  }`}
                >
                  {decoded.isExpired ? "EXPIRED" : "VALID & ACTIVE"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
