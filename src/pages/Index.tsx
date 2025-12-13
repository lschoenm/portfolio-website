import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { CVSection } from "@/components/CVSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollAnimator } from "@/components/ui/ScrollAnimator";

const Index = () => {
  return (
    <div className="min-h-dvh bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ScrollAnimator>
          <CVSection />
        </ScrollAnimator>
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
