"use client";

import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {  useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScroll } from "@/hooks/use-scroll";
import MenuDrop from "@/components/mobile-drop";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { scrollToSection } = useScroll();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex flex-col items-center justify-center">
      <div className="flex w-full max-w-[1920px] h-14 sm:h-16 md:h-18 items-center px-3 sm:px-4 md:px-6 justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleNavClick("/")}
            className="cursor-pointer"
            aria-label="Go to top"
          >
            <BentaidevLogo />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-3 md:gap-6 ml-3 md:ml-6">
            <button
              onClick={() => handleNavClick("skills")}
              className={cn(
                "flex items-center text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/#skills" && "text-foreground"
              )}
            >
              {t("navigation.skills")}
            </button>
            <button
              onClick={() => handleNavClick("experiences")}
              className={cn(
                "flex items-center text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/#experiences" && "text-foreground"
              )}
            >
              {t("navigation.experiences")}
            </button>
            <button
              onClick={() => handleNavClick("projects")}
              className={cn(
                "flex items-center text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/#projects" && "text-foreground"
              )}
            >
              {t("navigation.projects")}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={cn(
                "flex items-center text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/#contact" && "text-foreground"
              )}
            >
              {t("navigation.contact")}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <LanguageToggle />

          {/* Mobile menu button */}
          <Button
            ref={buttonRef}
            variant="outline"
            className="md:hidden lg:hidden"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <MenuDrop
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        buttonRef={buttonRef} 
      />
    </header>
  );
}

const BentaidevLogo = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="text-2xl font-bold tracking-wider flex items-center">
        <span className="bg-foreground text-background rounded flex items-center justify-center h-6 w-0 mr-1 pr-[11] pl-[13]">
          B
        </span>
        <span>ENTAIDEV</span>
      </div>
    </div>
  );
};

export default BentaidevLogo;
