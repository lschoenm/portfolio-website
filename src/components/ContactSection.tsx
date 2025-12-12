import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-secondary/10">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("contact.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form
            action="https://formspree.io/f/mdkqyywr"
            method="POST"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={t("contact.name")}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("contact.email")}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {t("contact.message")}
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                placeholder={t("contact.message")}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                <Send className="mr-2 h-5 w-5" />
                {t("contact.send")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
