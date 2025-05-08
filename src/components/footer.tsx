"use client";

import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full hidden md:flex items-center justify-center border-t py-6 md:py-0">
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
  );
}
