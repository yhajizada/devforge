"use client";

import { useState } from "react";
import { generateUuid, generateSecret } from "@/lib/tools-core";
import { Copy, Check, RefreshCw, KeyRound, Shield } from "lucide-react";

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUuid(), generateUuid(), generateUuid()]);
  const [secret, setSecret] = useState(generateSecret(32));
  const [secretLen, setSecretLen] = useState(32);
  const [copied, setCopied] = useState<string | null>(null);

  const handleRefreshUuids = () => {
    setUuids([generateUuid(), generateUuid(), generateUuid()]);
  };

  const handleRefreshSecret = () => {
    setSecret(generateSecret(secretLen));
  };

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* UUID Section */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              UUID v4 Generator (RFC 4122)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Cryptographically secure pseudo-random identifiers
            </p>
          </div>
          <button
            onClick={handleRefreshUuids}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Generate New</span>
          </button>
        </div>

        <div className="space-y-2 pt-2">
          {uuids.map((uuid, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-2.5"
            >
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200 select-all">
                {uuid}
              </span>
              <button
                onClick={() => handleCopy(uuid, `uuid-${idx}`)}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 ml-4"
              >
                {copied === `uuid-${idx}` ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Secret / Key Generator */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Cryptographic Secret / Key Generator
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Suitable for JWT secrets, API tokens, and encryption salts
            </p>
          </div>
          <button
            onClick={handleRefreshSecret}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Regenerate</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 select-all overflow-x-auto">
            {secret}
          </div>
          <button
            onClick={() => handleCopy(secret, "secret")}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-4 py-3 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors shadow-sm"
          >
            {copied === "secret" ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
            <span>Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
