"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwicth() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // Avoid rendering on the server
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const isDark = theme === "dark";
  return (
    <div className="flex items-center gap-2 text-foreground">
      <Sun size={18} />
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <Moon size={18} />
    </div>
  );
}
