"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";

interface SkillProps {
  tech: string;
}

export const Skill = ({ tech }: SkillProps) => {
  const { getSkillsData } = useLanguage();
  const skills = getSkillsData();

  const matchedSkill = skills
    .flatMap((category) => category.items)
    .find((item) => item.name.toLowerCase() === tech.toLowerCase());

  const slug = matchedSkill?.slug || tech.toLowerCase();

  const badge = (
    <Badge
      variant="outline"
      className={`text-xs ${matchedSkill ? "hover:bg-muted cursor-pointer" : "opacity-50"}`}
    >
      {tech}
    </Badge>
  );

  if (matchedSkill) {
    return (
      <span onClick={(e) => e.stopPropagation()}>
        <Link href={`/skills/${slug}`}>{badge}</Link>
      </span>
    );
  }

  return <span>{badge}</span>;
};
