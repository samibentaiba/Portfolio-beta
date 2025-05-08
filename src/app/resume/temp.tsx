"use client";

import { useResume } from "./use-resume";
import { useResumePagination } from "./use-resume-pagination";
import { ResumeSection } from "./resume-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { FileIcon } from "lucide-react";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { Experience, Project, SkillCategory } from "@/types";



interface Props {
  t: (key: string) => string;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  isGenerating: boolean;
  handleDownload: () => void;
  handlePdfDownload: () => void;
}

export default function ResumePage() {
  const resume = useResume();
  return <ResumeContent {...resume} />;
}

function ResumeContent({
  t,
  experiences,
  projects,
  skills,
  isGenerating,
  handleDownload,
  handlePdfDownload,
}: Props) {
  const [resumeSections, setResumeSections] = useState<ReactElement[]>([]);

  useEffect(() => {
    const sections: ReactElement[] = [];

    // Header
    sections.push(
      <div key="header" className="space-y-2">
        <h1 className="text-3xl font-bold">John Doe</h1>
        <p className="text-muted-foreground">
          {t("hero.title")} · johndoe@example.com
        </p>
      </div>
    );

    // Summary
    sections.push(
      <div key="summary" className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold">
          {t("resume.summary") || "Summary"}:
        </h2>
        <p className="text-sm text-muted-foreground">{t("hero.subtitle")}</p>
      </div>
    );

    // Experiences (kept grouped as is)
    experiences.forEach((exp, i) => {
      sections.push(
        <ResumeSection
          key={`exp-${i}`}
          title={i === 0 ? t("experiences.title") || "Experience" : undefined}
        >
          <div className="space-y-1">
            <p className="font-medium">
              {exp.role} - {exp.company}
            </p>
            <p className="text-xs text-muted-foreground">
              {exp.period} · {exp.location}
            </p>
            <ul className="list-disc ml-5 text-xs">
              {exp.projects.map((project, idx) => (
                <li key={idx}>{project}</li>
              ))}
            </ul>
          </div>
        </ResumeSection>
      );
    });

    // Projects: 1 section per project
    projects.forEach((project, i) => {
      sections.push(
        <ResumeSection key={`project-${i}`} title={project.title}>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              {project.timeline} · {project.technologies.join(", ")}
            </p>
            <p className="text-sm">{project.description}</p>
            {project.collaborators?.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {t("projects.collaborators") || "Collaborators"}:{" "}
                {project.collaborators.join(", ")}
              </p>
            )}
          </div>
        </ResumeSection>
      );
    });

    // Skills: 1 section per skill item
    skills.forEach((group) => {
      group.items.forEach((skill, idx) => {
        sections.push(
          <ResumeSection key={`skill-${group.slug}-${idx}`} title={skill.name}>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {group.category} · {skill.experience}
              </p>
              <p className="text-xs text-muted-foreground">
                {skill.description}
              </p>
            </div>
          </ResumeSection>
        );
      });
    });

    // Education
    sections.push(
      <div key="education" className="space-y-2">
        <h2 className="text-xl font-semibold">
          {t("resume.education") || "Education"}
        </h2>
        <div>
          <p className="font-medium">B.S. in Computer Science</p>
          <p className="text-sm text-muted-foreground">
            University of Technology · 2015-2019
          </p>
        </div>
      </div>
    );

    setResumeSections(sections);
  }, [t, experiences, projects, skills]);

  const {
    containerRef,
    measureRef,
    currentPage,
    totalPages,
    currentPageContent,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
  } = useResumePagination({
    content: resumeSections,
    pageHeight: 650,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [resumeSections, setCurrentPage]);

  return (
    <main className="container py-8 sm:py-12 px-4 sm:px-6 flex justify-center items-center min-h-screen">
      <div className="max-w-2xl w-full flex flex-col gap-6 mx-auto">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-primary hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("navigation.backToHome") || "Back to Home"}
          </Link>
        </div>

        <Card className="p-8 flex flex-col shadow-lg">
          {/* Visible resume content */}
          <div
            ref={containerRef}
            className="space-y-6 min-h-[650px] max-h-[650px] overflow-hidden"
          >
            {currentPageContent.map((section, index) => (
              <div key={index}>{section}</div>
            ))}
          </div>

          {/* Hidden measurement container */}
          <div
            ref={measureRef}
            className="invisible absolute top-0 left-0 w-full pointer-events-none"
          >
            {resumeSections.map((section, index) => (
              <div key={index}>{section}</div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("navigation.previous")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                {t("navigation.next")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} {t("navigation.of")} {totalPages}
            </span>
          </div>

          {/* Download buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 flex-1"
              disabled={isGenerating}
            >
              <FileText className="h-4 w-4" />
              {isGenerating
                ? t("resume.generating") || "Generating..."
                : t("resume.downloadDocx") || "Download as DOCX"}
            </Button>

            <Button
              onClick={handlePdfDownload}
              className="flex items-center gap-2 flex-1"
              variant="outline"
              disabled={isGenerating}
            >
              <FileIcon className="h-4 w-4" />
              {isGenerating
                ? t("resume.generating") || "Generating..."
                : t("resume.downloadPdf") || "Download as PDF"}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
