"use client";

import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ThemeToggle } from "./theme-toggle";
import { useScroll } from "@/hooks/use-scroll";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { LanguageToggleMobile } from "./language-toggle-mobile";
import { ThemeToggleMobile } from "./theme-toggle-mobile";
import { Separator } from "./ui/separator";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { scrollToSection } = useScroll();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex flex-col items-center justify-center">
      <div className=" flex w-full max-w-[1920px] h-14  sm:h-16 md:h-18 items-center  px-3 sm:px-4 md:px-6 justify-between">
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
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col justify-center items-center max-w-[500px] px-6">
          <Separator className="w-screen flex justify-center items-center" />
          <nav className="container flex flex-col py-4 px-6">
            <button
              onClick={() => {
                scrollToSection("skills");
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left",
                pathname === "/#skills" && "text-foreground"
              )}
            >
              {t("navigation.skills")}
            </button>
            <button
              onClick={() => {
                scrollToSection("experiences");
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left",
                pathname === "/#experiences" && "text-foreground"
              )}
            >
              {t("navigation.experiences")}
            </button>
            <button
              onClick={() => {
                scrollToSection("projects");
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left",
                pathname === "/#projects" && "text-foreground"
              )}
            >
              {t("navigation.projects")}
            </button>
            <button
              onClick={() => {
                scrollToSection("contact");
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left",
                pathname === "/#contact" && "text-foreground"
              )}
            >
              {t("navigation.contact")}
            </button>
          </nav>

          <Separator className="w-screen flex justify-center items-center" />

          <div className="container px-6 py-2">
            <LanguageToggleMobile />
            <ThemeToggleMobile />
          </div>
          <Separator className="w-screen flex justify-center items-center" />
          <footer className="w-full flex items-center justify-center  py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 sm:px-6">
              <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Sami Bentaiba. {t("footer.rights")}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LuGithub className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LuLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      )}
    </header>
  );
}

const BentaidevLogo = () => {
  return (
    <div className=" inline-flex items-center justify-center">
      <div className=" text-2xl font-bold tracking-wider flex items-center">
        <span className=" bg-foreground text-background rounded flex items-center justify-center h-6 w-0 mr-1 pr-[11] pl-[13]  ">
          B
        </span>
        <span>ENTAIDEV</span>
      </div>
    </div>
  );
};

export default BentaidevLogo;
