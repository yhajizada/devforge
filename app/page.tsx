"use client";

import { useState } from "react";
import { DevHeader } from "@/components/dev-header";
import { JwtDecoder } from "@/components/tools/jwt-decoder";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { HashGenerator } from "@/components/tools/hash-generator";
import { Base64Converter } from "@/components/tools/base64-converter";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { MockGenerator } from "@/components/tools/mock-generator";
import { SqlFormatter } from "@/components/tools/sql-formatter";
import { 
  Key, 
  FileCode, 
  Hash, 
  ArrowLeftRight, 
  Fingerprint, 
  Database, 
  Terminal, 
  Container, 
  Sparkles, 
  Search,
  CheckCircle2,
  Lock
} from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  component: React.ComponentType;
}

const TOOLS: ToolItem[] = [
  {
    id: "jwt",
    name: "JWT Debugger & Decoder",
    category: "Security",
    description: "Decode and inspect JSON Web Tokens without sending data to third parties.",
    icon: Key,
    component: JwtDecoder,
  },
  {
    id: "json",
    name: "JSON Formatter & TypeScript",
    category: "Formatters",
    description: "Prettify, minify, validate JSON and generate TypeScript interfaces in 1 click.",
    icon: FileCode,
    component: JsonFormatter,
  },
  {
    id: "hash",
    name: "Crypto Hash Generator",
    category: "Security",
    description: "Instant browser-native SHA-256 and SHA-512 cryptographic checksums.",
    icon: Hash,
    component: HashGenerator,
  },
  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    category: "Converters",
    description: "Bidirectional UTF-8 text to Base64 encoder and decoder.",
    icon: ArrowLeftRight,
    component: Base64Converter,
  },
  {
    id: "uuid",
    name: "UUID & Secret Generator",
    category: "Generators",
    description: "Cryptographically secure RFC4122 UUID v4 and JWT secret keys.",
    icon: Fingerprint,
    component: UuidGenerator,
  },
  {
    id: "mock",
    name: "Mock Data Synthesizer",
    category: "Generators",
    description: "Generate mock Users, Orders, and Products in JSON format for quick prototyping.",
    icon: Sparkles,
    component: MockGenerator,
  },
  {
    id: "sql",
    name: "SQL Query Beautifier",
    category: "Formatters",
    description: "Clean, indent, and format complex SQL statements.",
    icon: Database,
    component: SqlFormatter,
  },
];

export default function DevForgeApp() {
  const [activeToolId, setActiveToolId] = useState("jwt");
  const [search, setSearch] = useState("");

  const filteredTools = TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const activeTool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];
  const ActiveComponent = activeTool.component;

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      <DevHeader />

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Top Hero / Tagline Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Offline-First & Zero Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              The Developer's Swiss Army Knife
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              All essential tools engineered in one fast, private interface. Available via Web, CLI, and Docker.
            </p>
          </div>

          {/* Quick CLI pill */}
          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono text-zinc-300 shadow-sm">
            <Terminal className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>npx devforge &lt;command&gt;</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search utilities (Ctrl+K)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-10 pr-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
              />
            </div>

            {/* Tool Nav List */}
            <div className="space-y-1">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <div className="truncate">{tool.name}</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">{tool.category}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Active Tool Workspace */}
          <main className="lg:col-span-3">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
              <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                    <activeTool.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {activeTool.name}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {activeTool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Runs 100% in Browser</span>
                </div>
              </div>

              {/* Render Selected Tool Component */}
              <ActiveComponent />
            </div>

            {/* CLI & Docker Quick Reference Box */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="h-4 w-4 text-cyan-500" />
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Run via Terminal (CLI)
                  </h3>
                </div>
                <pre className="font-mono text-xs bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl text-zinc-800 dark:text-zinc-200 overflow-x-auto">
                  npx devforge uuid 3{`\n`}npx devforge hash "hello" sha256{`\n`}npx devforge jwt &lt;token&gt;
                </pre>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Container className="h-4 w-4 text-indigo-500" />
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Self-Host via Docker
                  </h3>
                </div>
                <pre className="font-mono text-xs bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl text-zinc-800 dark:text-zinc-200 overflow-x-auto">
                  docker run -p 3000:3000 yhajizada/devforge
                </pre>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} DevForge. Open source under MIT License.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yhajizada/devforge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              ⭐ Star on GitHub
            </a>
            <span>·</span>
            <span>Zero Tracking / No Analytics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
