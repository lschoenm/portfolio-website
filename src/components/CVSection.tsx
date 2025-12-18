import { Download, Briefcase, GraduationCap, Code, BookOpen } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export function CVSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const handleSkillsAreaInteraction = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const target = event.target as HTMLElement;
    const isSkillButton = target.dataset?.skillButton === "true";

    if (!isSkillButton && openTooltip) {
      setOpenTooltip(null);
    }
  };

  useEffect(() => {
    const handleInteractionOutside = (event: MouseEvent | TouchEvent) => {
      if (
        openTooltip &&
        skillsRef.current &&
        !skillsRef.current.contains(event.target as Node)
      ) {
        setOpenTooltip(null);
      }
    };

    const handleScroll = () => {
      if (openTooltip) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleInteractionOutside);
    document.addEventListener("touchstart", handleInteractionOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleInteractionOutside);
      document.removeEventListener("touchstart", handleInteractionOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openTooltip]);

  return (
    <section id="cv" className="py-24 bg-secondary/10">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("cv.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            {t("cv.description")}
          </p>
        </div>

          {/* Skills */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {t("cv.skillsHeading")}
              </h3>
            </div>
            <TooltipProvider delayDuration={isMobile ? 0 : 200}>
              <div
                className="flex flex-wrap gap-3"
                ref={skillsRef}
                onClick={handleSkillsAreaInteraction}
                onTouchStart={handleSkillsAreaInteraction}
              >
                {t("cv.skills", { returnObjects: true }).map(
                  (skill) => (
                    <Tooltip
                      key={skill.name}
                      open={
                        openTooltip === skill.name ||
                        hoveredTooltip === skill.name
                      }
                    >
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                          data-skill-button="true"
                          onClick={() =>
                            setOpenTooltip(
                              openTooltip === skill.name ? null : skill.name,
                            )
                          }
                          onMouseEnter={
                            !isMobile
                              ? () => setHoveredTooltip(skill.name)
                              : undefined
                          }
                          onMouseLeave={
                            !isMobile
                              ? () => setHoveredTooltip(null)
                              : undefined
                          }
                        >
                          {skill.name}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        className="border-primary max-w-sm text-base p-4"
                        side={isMobile ? "bottom" : "top"}
                      >
                        <p>{skill.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ),
                )}
              </div>
            </TooltipProvider>
          </div>

        <div className="grid gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {t("cv.experienceHeading")}
              </h3>
            </div>
            <div className="space-y-8">
              {t("cv.experience", { returnObjects: true }).map(
                (job) => (
                  <div
                    key={job.title}
                    className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                    <h4 className="text-lg font-semibold text-foreground">
                      {job.title}
                    </h4>
                    <p className="text-primary font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {job.period}
                    </p>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {t("cv.educationHeading")}
              </h3>
            </div>
            <div className="space-y-6">
              {t("cv.education", { returnObjects: true }).map(
                (edu) => (
                  <div
                    key={edu.degree}
                    className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                    <h4 className="text-lg font-semibold text-foreground">
                      {edu.degree}
                    </h4>
                    <p className="text-primary font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.period}
                    </p>
                    {edu.distinction && (
                      <p className="text-sm text-muted-foreground italic">
                        {edu.distinction}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Publications */}
          <div id="publications">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {t("cv.publicationsHeading")}
              </h3>
            </div>
            <ol className="space-y-6 list-decimal list-inside text-muted-foreground">
              {t("cv.publications", { returnObjects: true }).map((publication) => (
                <li key={publication.title} className="leading-relaxed">
                  <div className="font-semibold text-foreground">
                    {publication.title}
                  </div>
                  <p>{publication.citation}</p>
                  {publication.link && (
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a href={publication.link} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        {t("cv.viewDocument")}
                      </a>
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
