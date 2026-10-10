import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "DevForge — The Ultimate Open-Source Developer Swiss-Army Knife",
  description:
    "Fast, private, client-side developer utilities: JWT debugger, JSON formatter, Hash generator, Base64 converter, UUID generator, and SQL beautifier. Web + CLI + Docker.",
  keywords: [
    "developer tools",
    "jwt debugger",
    "json formatter",
    "base64 encoder",
    "hash generator",
    "uuid generator",
    "sql formatter",
    "cli",
    "open source",
  ],
  authors: [{ name: "Yusif Hajizada" }],
  openGraph: {
    title: "DevForge — The Developer's Swiss Army Knife",
    description: "Every developer utility you need in one unified, 100% private workspace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased selection:bg-cyan-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
