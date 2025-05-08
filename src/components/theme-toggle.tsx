"use client";

import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export function ThemeToggle() {
  const { theme = "system", handleThemeChange } = useThemeToggle();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:flex lg:flex" asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["light", "dark", "system"].map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => handleThemeChange(t)}
            className={
              theme === t
                ? "bg-sidebar-ring/50 hover:bg-secondary"
                : "hover:bg-accent"
            }
          >
            {t[0].toUpperCase() + t.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
