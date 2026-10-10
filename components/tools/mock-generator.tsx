"use client";

import { useState } from "react";
import { generateMockData } from "@/lib/tools-core";
import { Copy, Check, RefreshCw, Users, ShoppingCart, Box } from "lucide-react";

export function MockGenerator() {
  const [dataType, setDataType] = useState<"users" | "products" | "orders">("users");
  const [count, setCount] = useState(3);
  const [data, setData] = useState(() => JSON.stringify(generateMockData("users", 3), null, 2));
  const [copied, setCopied] = useState(false);

  const handleGenerate = (type: "users" | "products" | "orders", num: number) => {
    setDataType(type);
    setCount(num);
    setData(JSON.stringify(generateMockData(type, num), null, 2));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleGenerate("users", count)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              dataType === "users"
                ? "bg-cyan-600 text-white shadow-sm"
                : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => handleGenerate("orders", count)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              dataType === "orders"
                ? "bg-cyan-600 text-white shadow-sm"
                : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => handleGenerate("products", count)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              dataType === "products"
                ? "bg-cyan-600 text-white shadow-sm"
                : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Box className="h-3.5 w-3.5" />
            <span>Products</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Count:</span>
            <select
              value={count}
              onChange={(e) => handleGenerate(dataType, parseInt(e.target.value, 10))}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy JSON"}</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <textarea
          readOnly
          rows={14}
          value={data}
          className="w-full bg-transparent font-mono text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
        />
      </div>
    </div>
  );
}
