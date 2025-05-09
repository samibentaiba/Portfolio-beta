import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { useLanguage } from "@/components/language-provider";
import {
  createSummarySection,
  createSkillsSection,
  createExperienceSection,
  createProjectsSection,
  createEducationSection,
} from "@/lib/docx-generator";

import {
  Experience,
  Project,
  SkillCategory,
  Education,
  Personal,
} from "@/types";

/* interface SkillItem {
  name: string;
  experience: string;
  description: string;
} */

export function useResume() {
  const {
    language,
    t,
    getSkillsData,
    getExperiencesData,
    getProjectsData,
    getEducationsData,
    getPersonalData,
  } = useLanguage();

  const [personal, setPersonal] = useState<Personal | null>(null);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setSkills(getSkillsData());
    setExperiences(getExperiencesData());
    setProjects(getProjectsData());
    setEducations(getEducationsData());
    setPersonal(getPersonalData());
  }, [
    getSkillsData,
    getExperiencesData,
    getProjectsData,
    getEducationsData,
    getPersonalData,
    language,
  ]);

  const generateAndDownload = async (format: "docx" | "pdf") => {
    setIsGenerating(true);
    try {
      const skillsData = skills.map((group) => ({
        category: group.category,
        items: group.items.map((item) => ({
          name: item.name,
          experience: item.experience,
          description: item.description,
        })),
      }));

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: personal?.name || "",
                    bold: true,
                    size: 32,
                  }),
                ],
                spacing: { after: 200 },
                heading: HeadingLevel.TITLE,
              }),
              new Paragraph({
                children: [
                  new TextRun(
                    `${personal?.email ?? ""} · ${personal?.phone ?? ""}`
                  ),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [new TextRun(`${personal?.website ?? ""}`)],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [new TextRun(`${personal?.github ?? ""}`)],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [new TextRun(`${personal?.linkedin ?? ""}`)],
                spacing: { after: 400 },
              }),
              ...createSummarySection(personal, t),
              ...createSkillsSection(skillsData, t),
              ...createExperienceSection(experiences, t),
              ...createProjectsSection(projects, t),
              ...createEducationSection(educations, t),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);

      if (format === "docx") {
        saveAs(blob, `resume_${language}.docx`);
      } else {
        const formData = new FormData();
        formData.append("file", blob, "resume.docx");

        const res = await fetch("/api/convert-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("PDF conversion failed");

        const pdfBlob = await res.blob();
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `resume_${language}.pdf`;
        link.click();
      }
    } catch (error) {
      console.error(`Error generating ${format.toUpperCase()}:`, error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    t,
    skills,
    experiences,
    projects,
    isGenerating,
    educations,
    personal,
    handleDownload: () => generateAndDownload("docx"),
    handleDownloadPdf: () => generateAndDownload("pdf"),
  };
}
