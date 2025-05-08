import { Experience, Project } from "@/types";
import { Paragraph, TextRun, HeadingLevel } from "docx";

// Define a type for the translate function
type TranslateFunction = (key: string) => string;

export const createSummarySection = (t: TranslateFunction) => [
  new Paragraph({
    children: [
      new TextRun({
        text: t("resume.summary") || "Summary:", // Fallback if translation fails
        bold: true,
        size: 26,
      }),
    ],
    spacing: { before: 400, after: 200 },
    heading: HeadingLevel.HEADING_1,
  }),
  new Paragraph({
    children: [new TextRun({ text: t("hero.subtitle") })],
    spacing: { after: 200 },
  }),
];

export const createSkillsSection = (
  skills: {
    category: string;
    items: { name: string; experience: string; description: string }[];
  }[],
  t: TranslateFunction
) => {
  const skillsParagraphs = skills.map((group) => [
    new Paragraph({
      children: [
        new TextRun({
          text: group.category,
          bold: true,
          size: 20,
        }),
      ],
      spacing: { before: 400, after: 200 },
      heading: HeadingLevel.HEADING_1,
    }),
    ...group.items.map(
      (item) =>
        new Paragraph({
          children: [
            new TextRun({
              text: `${item.name} (${item.experience})`,
              bold: true,
            }),
            new TextRun({ text: `: ${item.description}` }),
          ],
          spacing: { before: 200, after: 100 },
        })
    ),
  ]);

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: t("skills.title") || "Skills:", // Fallback if translation fails
          bold: true,
          size: 26,
        }),
      ],
      spacing: { before: 400, after: 200 },
      heading: HeadingLevel.HEADING_1,
    }),
    ...skillsParagraphs.flat(),
  ];
};

export const createExperienceSection = (
  experiences: Experience[],
  t: TranslateFunction
) => {
  const experienceParagraphs = experiences.flatMap((exp) => [
    new Paragraph({
      children: [new TextRun({ text: exp.role, bold: true })],
      spacing: { before: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `${exp.company}`, italics: true })],
    }),
    new Paragraph({
      children: [new TextRun({ text: `${exp.period} · ${exp.location}` })],
      spacing: { after: 100 },
    }),
    ...exp.projects.slice(0, 3).map(
      (project: string) =>
        new Paragraph({
          children: [new TextRun({ text: `• ${project}` })],
          spacing: { before: 80 },
        })
    ),
  ]);

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: t("experiences.title") || "Experience:", // Fallback if translation fails
          bold: true,
          size: 26,
        }),
      ],
      spacing: { before: 400, after: 200 },
      heading: HeadingLevel.HEADING_1,
    }),
    ...experienceParagraphs,
  ];
};

export const createProjectsSection = (
  projects: Project[],
  t: TranslateFunction
) => {
  const projectParagraphs = projects.map((project) => {
    return new Paragraph({
      children: [
        new TextRun({ text: project.title, bold: true }),
        new TextRun({ text: ` (${project.technologies})` }),
        new TextRun({ text: `: ${project.personalExperience}` }),
      ],
      spacing: { before: 200 },
    });
  });

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: t("projects.title") || "Projects:", // Fallback if translation fails
          bold: true,
          size: 26,
        }),
      ],
      spacing: { before: 400, after: 200 },
      heading: HeadingLevel.HEADING_1,
    }),
    ...projectParagraphs,
  ];
};

export const createEducationSection = () => [
  new Paragraph({
    children: [
      new TextRun({
        text: "Education",
        bold: true,
        size: 26,
      }),
    ],
    spacing: { before: 400, after: 200 },
    heading: HeadingLevel.HEADING_1,
  }),
  new Paragraph({
    children: [new TextRun({ text: "B.S. in Computer Science", bold: true })],
  }),
  new Paragraph("University of Technology · 2015-2019"),
];
