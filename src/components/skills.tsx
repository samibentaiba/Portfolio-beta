"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Skill, SkillCategory } from "@/types"

export function Skills() {
  const [skills, setSkills] = useState<SkillCategory[]>([])
  const { t, getSkillsData } = useLanguage()

  useEffect(() => {
    setSkills(getSkillsData())
  }, [getSkillsData])

  return (
    <section id="skills" className="w-full scroll-mt-16 px-4 sm:px-0">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">{t("skills.title")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t("skills.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <Card key={category.category} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="p-4 sm:pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">{category.category}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:pt-0">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {category.items.map((skill: Skill) => (
                    <Link href={`/skills/${skill.slug}`} key={skill.name}>
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                        {skill.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-xs sm:text-sm text-primary flex items-center hover:underline"
                >
                  {t("skills.learnMore")} {category.category.toLowerCase()}
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
