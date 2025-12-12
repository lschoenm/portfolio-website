import { Github, ExternalLink, Package, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimator } from "./ui/ScrollAnimator";
import { useTranslation } from "react-i18next";

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("projects.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t("projects.description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {(t("projects.items", { returnObjects: true })).map(
            (project, index) => (
              <ScrollAnimator
                key={project.title}
                className="[animation-delay:calc(var(--stagger-delay)*${index})]"
                style={{ "--stagger-delay": "100ms" }}
              >
                <article className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-primary hover:text-primary"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {t("projects.code")}
                      </a>
                    </Button>
                    {project.cratesio && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-primary hover:text-primary"
                      >
                        <a
                          href={project.cratesio}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          {t("projects.crates")}
                        </a>
                      </Button>
                    )}
                    {project.docs && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-primary hover:text-primary"
                      >
                        <a
                          href={project.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {t("projects.docs")}
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("projects.demo")}
                        </a>
                      </Button>
                    )}
                  </div>
                </article>
              </ScrollAnimator>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
