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
import { formatPdfSummary, generatePdf } from "@/lib/pdf-generator";
import { Experience, Project, SkillCategory, Education } from "@/types";
interface SkillItem {
  name: string;
  experience: string;
  description: string;
}

export function useResume() {
  const {
    language,
    t,
    getSkillsData,
    getExperiencesData,
    getProjectsData,
    getEducationsData,
    getPersonalsData,
  } = useLanguage();
  const [personals, setPersonals] = useState<Personals | null>(null);
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
    setPersonals(getPerosnalsData());
  }, [
    getSkillsData,
    getExperiencesData,
    getProjectsData,
    getPorsonalsData,
    language,
  ]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const skillsData = skills.map((group) => ({
        category: group.category,
        items: group.items.map(
          (item: {
            name: string;
            experience: string;
            description: string;
          }) => ({
            name: item.name,
            experience: item.experience,
            description: item.description,
          })
        ),
      }));

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "John Doe", bold: true, size: 32 }),
                ],
                spacing: { after: 200 },
                heading: HeadingLevel.TITLE,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${t(
                      "hero.title"
                    )} · johndoe@example.com · +1 (555) 123-4567`,
                  }),
                ],
                spacing: { after: 400 },
              }),
              ...createSummarySection(t),
              ...createSkillsSection(skillsData, t),
              ...createExperienceSection(experiences, t),
              ...createProjectsSection(projects, t),
              ...createEducationSection(educations, t),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `resume_${language}.docx`);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  /*   function normalize(section: Paragraph | Paragraph[] | undefined): Paragraph[] {
    if (!section) return [];
    return Array.isArray(section) ? section : [section];
  } */

  const handlePdfDownload = async () => {
    setIsGenerating(true);
    try {
      const pdfData = {
        name: "John Doe",
        title: t("hero.title"),
        email: "johndoe@example.com",
        summary: formatPdfSummary(t),
        skills: skills.flatMap((group) =>
          group.items.map((item: SkillItem) => ({
            name: item.name,
            experience: item.experience,
            description: item.description,
          }))
        ),
        experiences: experiences.map((experience) => ({
          role: experience.role,
          company: experience.company,
          period: experience.period,
          location: experience.location,
          description: experience.description,
          projects: experience.projects,
        })),
        projects: projects.map((project) => ({
          title: project.title,
          technologies: project.technologies.join(", "),
          personalExperience: project.personalExperience,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
        })),
        educations: educations.map((education) => ({
          degree: education.degree,
          institution: education.institution,
          startYear: education.startYear,
          endYear: education.endYear,
        })),
      };

      const pdfBytes = await generatePdf(pdfData, t);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `resume_${language}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
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
    handleDownload,
    handlePdfDownload,
  };
}
