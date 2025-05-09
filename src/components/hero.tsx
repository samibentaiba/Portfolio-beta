"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useScroll } from "@/hooks/use-scroll";
import { Personal } from "@/types";
export default function Hero() {
  const { t, getPersonalData } = useLanguage();
  const { scrollToSection } = useScroll();
  const [personal, setPerosnal] = useState<Personal | null>(null);
  useEffect(() => {
    setPerosnal(getPersonalData())
  }, [getPersonalData])
  return (
    <div className="w-full h-screen items-center flex justify-center ">
      <div className="container px-4 md:px-6">
        <div className="flex space-y-12 flex-col items-center text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl">
              {t(personal?.name || "your name")}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-xl">
              {t(personal?.job || "your job")}
            </p>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4">
            <Button
              onClick={() => {
                scrollToSection("projects");
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              {t("hero.viewProjects")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Link href="/resume" rel="noopener noreferrer">
              <Button variant="outline" className="w-full sm:w-auto">
                {t("hero.resume")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
