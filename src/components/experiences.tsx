"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Experience } from "@/types";
export function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { t, getExperiencesData } = useLanguage();

  useEffect(() => {
    setExperiences(getExperiencesData());
  }, [getExperiencesData]);

  return (
    <section id="experiences" className="w-full scroll-mt-16 px-4 sm:px-0">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
            {t("experiences.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("experiences.subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {experiences.map((experience) => (
            <Link
              href={`/experiences/${experience.slug}`}
              key={experience.role}
            >
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4 sm:pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">
                        {experience.role}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {experience.company}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="self-start sm:self-auto"
                    >
                      {experience.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:pt-0">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      {experience.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      {experience.location}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                    {experience.summary}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
