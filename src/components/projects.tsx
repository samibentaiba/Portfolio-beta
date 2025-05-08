"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ExternalLink } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { useLanguage } from "@/components/language-provider";
import { Project } from "@/types";

import { Skill } from "./skill";
export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  
  const router = useRouter();
  const { t, getProjectsData } = useLanguage();

  useEffect(() => {
    setProjects(getProjectsData());
  
  }, [getProjectsData]);

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  return (
    <section id="projects" className="w-full scroll-mt-16 px-4 sm:px-0">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
            {t("projects.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("projects.subtitle")}
            Showcasing my work and contributions
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col cursor-pointer"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 sm:pb-3">
                <CardTitle className="text-lg sm:text-xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {project.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:pt-0 flex-1">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                  {project.technologies.map((tech) => (
                    <Skill key={tech} tech={tech} />
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t p-3 sm:p-4">
                {project.liveUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        project.liveUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground flex items-center"
                  >
                    <ExternalLink className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />{" "}
                    {t("navigation.live")}
                  </button>
                )}
                {project.githubUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        project.githubUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground flex items-center       "
                  >
                    <LuGithub className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Code
                  </button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
