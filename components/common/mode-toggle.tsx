"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  isHero?: boolean;
}

export function ModeToggle({ isHero = false }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`bg-transparent! hover:bg-pink-200/20! dark:hover:bg-pink-200/20! px-4 py-1.5 rounded-full text-sm font-bold transition duration-300 ${
        isHero ? "mix-blend-difference text-white" : "text-foreground!"
      }`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
