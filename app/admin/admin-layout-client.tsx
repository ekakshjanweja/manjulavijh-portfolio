"use client";

import { useTheme } from "next-themes";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}
