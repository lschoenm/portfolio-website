import { Github, Linkedin, Mail, FileText, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ParticleField } from "./ParticleField";
import { useTranslation } from "react-i18next";

import portraitImage from "../../assets/portrait.png";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center pt-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(53, 148, 236, 0.12), transparent 35%), " +
              "radial-gradient(circle at 80% 10%, rgba(47, 109, 255, 0.15), transparent 32%), " +
              "radial-gradient(circle at 50% 70%, rgba(8, 119, 223, 0.12), transparent 40%)",
          }}
          aria-hidden
        />
        <ParticleField className="mix-blend-screen" />
      </div>
      <div className="section-container py-20">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          {/* Avatar/Initials */}
          <div className="mb-8 flex justify-center">
            <Avatar className="h-48 w-48 border-2 border-primary bg-primary/10 shadow-md z-10">
              <AvatarImage
                src={portraitImage}
                alt={t("hero.portraitAlt")}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 font-display text-3xl font-bold text-primary">
                LS
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name & Role */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t("hero.name")}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            {t("hero.role")}
          </p>

          {/* Summary */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            {t("hero.summary")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              <a href="#cv">
                <FileText className="mr-2 h-5 w-5" />
                {t("hero.viewCv")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 font-medium"
            >
              <a href="#projects">
                <FolderOpen className="mr-2 h-5 w-5" />
                {t("hero.seeProjects")}
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/lukas-schoenmann"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-lg"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/lschoenm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-lg"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:lukas.schoenmann@outlook.com"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-lg"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
