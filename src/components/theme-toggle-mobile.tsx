"use client";

import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Laptop } from "lucide-react";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export function ThemeToggleMobile() {
  const { theme = "system", handleThemeChange } = useThemeToggle();

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
        <Sun className="h-4 w-4" />
        <span className="text-sm font-medium">Theme</span>
      </div>
      <div className="flex flex-col gap-1">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleThemeChange(value)}
            className={`flex items-center justify-between px-2 py-1 rounded text-sm text-left hover:bg-accent ${
              theme === value ? "bg-muted font-medium" : ""
            }`}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </span>
            {theme === value && <span>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
