import { Experience, Project, Skill } from "@/types";
import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";

// UI Configuration
const UI_CONFIG = {
  pageWidth: 600,
  pageHeight: 800,
  margin: 50,
  fontSize: 12,
  titleFontSize: 14,
  headerFontSize: 20,
  sectionSpacing: 40,
  lineSpacing: 20,
  color: rgb(0, 0, 0),
  headerColor: rgb(0, 0, 1),
  sectionTitleColor: rgb(0, 0, 1),
  fontFamily: StandardFonts.Helvetica,
  boldFontFamily: StandardFonts.HelveticaBold,
  maxTextWidth: 500,
  maxLinesPerPage: 30,
  borderColor: rgb(0.8, 0.8, 0.8),
};

function createNewPageIfNeeded(
  page: PDFPage,
  currentY: number,
  pdfDoc: PDFDocument
) {
  if (currentY <= UI_CONFIG.margin) {
    page = pdfDoc.addPage([UI_CONFIG.pageWidth, UI_CONFIG.pageHeight]);
    currentY = UI_CONFIG.pageHeight - UI_CONFIG.margin;
  }
  return { page, currentY };
}

function wrapText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  maxWidth: number,
  pdfDoc: PDFDocument,
  boldFont?: PDFFont,
  boldPrefix?: string
) {
  const lines: string[] = [];
  let currentLine = "";
  const words = text.split(/\s+|\n/);
  words.forEach((word) => {
    const lineTest = currentLine + (currentLine ? " " : "") + word;
    const testFont =
      boldPrefix && lineTest.startsWith(boldPrefix) ? boldFont || font : font;
    const wordWidth = testFont.widthOfTextAtSize(lineTest, size);

    if (wordWidth < maxWidth) {
      currentLine = lineTest;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  let currentY = y;
  lines.forEach((line) => {
    ({ page, currentY } = createNewPageIfNeeded(page, currentY, pdfDoc));

    if (boldFont && boldPrefix && line.startsWith(boldPrefix)) {
      const [prefix, ...rest] = line.split(":");
      page.drawText(prefix + ":", {
        x,
        y: currentY,
        font: boldFont,
        size,
        color: UI_CONFIG.color,
      });
      page.drawText(" " + rest.join(":"), {
        x: x + boldFont.widthOfTextAtSize(prefix + ":", size),
        y: currentY,
        font,
        size,
        color: UI_CONFIG.color,
      });
    } else {
      page.drawText(line, {
        x,
        y: currentY,
        font,
        size,
        color: UI_CONFIG.color,
      });
    }

    currentY -= UI_CONFIG.lineSpacing;
  });

  return { page, currentY };
}

function drawSectionHeader(
  page: PDFPage,
  title: string,
  currentY: number,
  font: PDFFont,
  fontSize: number,
  pdfDoc: PDFDocument
) {
  ({ page, currentY } = createNewPageIfNeeded(page, currentY, pdfDoc));

  page.drawText(title, {
    x: UI_CONFIG.margin,
    y: currentY,
    font,
    size: fontSize,
    color: UI_CONFIG.sectionTitleColor,
  });

  page.drawLine({
    start: { x: UI_CONFIG.margin, y: currentY - 5 },
    end: { x: UI_CONFIG.pageWidth - UI_CONFIG.margin, y: currentY - 5 },
    thickness: 1,
    color: UI_CONFIG.borderColor,
  });

  currentY -= UI_CONFIG.sectionSpacing;
  return { page, currentY };
}

// Updated: t is now a parameter
export async function generatePdf(
  data: {
    name: string;
    title: string;
    email: string;
    summary: string;
    skills: { name: string; experience: string; description: string }[];
    experiences: {
      role: string;
      company: string;
      period: string;
      location: string;
      description: string;
      projects: string[];
    }[];
    projects: {
      title: string;
      technologies: string;
      personalExperience: string;
      liveUrl?: string;
      githubUrl?: string;
    }[];
    educations: {
      degree: string;
      institution: string;
      startYear: number;
      endYear: number;
    }[];
  },
  t: (key: string) => string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([UI_CONFIG.pageWidth, UI_CONFIG.pageHeight]);

  const font = await pdfDoc.embedFont(UI_CONFIG.fontFamily);
  const boldFont = await pdfDoc.embedFont(UI_CONFIG.boldFontFamily);

  let currentY = UI_CONFIG.pageHeight - UI_CONFIG.margin;

  page.drawText(data.name, {
    x: UI_CONFIG.margin,
    y: currentY,
    font: boldFont,
    size: UI_CONFIG.headerFontSize,
    color: UI_CONFIG.headerColor,
  });
  currentY -= 30;

  page.drawText(`${data.title} · ${data.email}`, {
    x: UI_CONFIG.margin,
    y: currentY,
    font,
    size: UI_CONFIG.fontSize,
    color: UI_CONFIG.color,
  });
  currentY -= UI_CONFIG.sectionSpacing;

  ({ page, currentY } = drawSectionHeader(
    page,
    t("hero.resume") + ":",
    currentY,
    boldFont,
    UI_CONFIG.titleFontSize,
    pdfDoc
  ));
  ({ page, currentY } = wrapText(
    page,
    data.summary,
    UI_CONFIG.margin,
    currentY,
    font,
    UI_CONFIG.fontSize,
    UI_CONFIG.maxTextWidth,
    pdfDoc
  ));

  ({ page, currentY } = drawSectionHeader(
    page,
    t("skills.title") + ":",
    currentY,
    boldFont,
    UI_CONFIG.titleFontSize,
    pdfDoc
  ));
  data.skills.forEach((skill) => {
    const line = `${skill.name}: ${skill.experience} - ${skill.description}`;
    ({ page, currentY } = wrapText(
      page,
      line,
      UI_CONFIG.margin,
      currentY,
      font,
      UI_CONFIG.fontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc,
      boldFont,
      `${skill.name}:`
    ));
    currentY -= UI_CONFIG.lineSpacing;
  });

  ({ page, currentY } = drawSectionHeader(
    page,
    t("experiences.title") + ":",
    currentY,
    boldFont,
    UI_CONFIG.titleFontSize,
    pdfDoc
  ));
  data.experiences.forEach((exp) => {
    const titleLine = `${exp.role} ${t("resume.at")} ${exp.company} (${
      exp.period
    }) - ${exp.location}`;
    ({ page, currentY } = wrapText(
      page,
      titleLine,
      UI_CONFIG.margin,
      currentY,
      boldFont,
      UI_CONFIG.fontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc
    ));
    ({ page, currentY } = wrapText(
      page,
      exp.description,
      UI_CONFIG.margin,
      currentY,
      font,
      UI_CONFIG.fontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc
    ));

    exp.projects.forEach((project) => {
      ({ page, currentY } = wrapText(
        page,
        `• ${project}`,
        UI_CONFIG.margin,
        currentY,
        font,
        UI_CONFIG.fontSize,
        UI_CONFIG.maxTextWidth,
        pdfDoc
      ));
    });
    currentY -= UI_CONFIG.lineSpacing;
  });

  ({ page, currentY } = drawSectionHeader(
    page,
    t("projects.title") + ":",
    currentY,
    boldFont,
    UI_CONFIG.titleFontSize,
    pdfDoc
  ));
  data.projects.forEach((project) => {
    ({ page, currentY } = wrapText(
      page,
      `${project.title} (${project.technologies})`,
      UI_CONFIG.margin,
      currentY,
      font,
      UI_CONFIG.titleFontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc,
      boldFont,
      t("navigation.title") + ":"
    ));
    ({ page, currentY } = wrapText(
      page,
      `${project.personalExperience}`,
      UI_CONFIG.margin,
      currentY,
      font,
      UI_CONFIG.fontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc,
      boldFont,
      t("navigation.experience") + ":"
    ));
    ({ page, currentY } = wrapText(
      page,
      `${project.liveUrl}`,
      UI_CONFIG.margin,
      currentY,
      font,
      UI_CONFIG.fontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc,
      boldFont
    ));
    ({ page, currentY } = wrapText(
      page,
      `${project.githubUrl}`,
      UI_CONFIG.margin,
      currentY,
      font,
      UI_CONFIG.fontSize,
      UI_CONFIG.maxTextWidth,
      pdfDoc,
      boldFont
    ));
    currentY -= UI_CONFIG.sectionSpacing;
  });

  return await pdfDoc.save();
}

// Formatting functions using translations
export function formatPdfSummary(t: (key: string) => string) {
  return t("hero.subtitle");
}

export function formatPdfSkills(skills: Skill[], t: (key: string) => string) {
  return skills
    .map(
      (skill) =>
        `${t(skill.name)}: ${skill.experience} - ${t(skill.description)}`
    )
    .join("\n");
}

export function formatPdfExperiences(
  experiences: Experience[],
  translate: (key: string) => string
) {
  return experiences
    .map((experience) => {
      return `${translate(experience.role)} ${translate(
        "resume.at"
      )} ${translate(experience.company)}\n${translate(
        experience.description
      )}\n`;
    })
    .join("\n");
}

export function formatPdfProjects(
  projects: Project[],
  t: (key: string) => string
) {
  return projects
    .map((project) => {
      return `${t(project.title)} (${project.timeline})\n${t(
        "Tech Stack"
      )}: ${project.technologies.map((tech) => t(tech)).join(", ")}\n${t(
        project.personalExperience
      )}\n`;
    })
    .join("\n");
}
export function formatPdfEducation(
  projects: Project[],
  t: (key: string) => string
) {
  return projects
    .map((project) => {
      return `${t(project.title)} (${project.timeline})\n${t(
        "Education"
      )}: ${project.technologies.map((tech) => t(tech)).join(", ")}\n${t(
        project.personalExperience
      )}\n`;
    })
    .join("\n");
}
