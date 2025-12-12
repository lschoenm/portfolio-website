import { useState, useEffect, useRef } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/lib/theme";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#cv", label: t("nav.cv") },
    { href: "#publications", label: t("nav.publications") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const languageOptions: { code: "en" | "de"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
  ];

  const navLinkClass = (isActive = false, isMobile = false) =>
    `font-medium ${
      isMobile ? "text-base" : isScrolled ? "text-base" : "text-lg"
    } text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all ${
      isActive ? "text-foreground after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className={`font-display font-semibold text-foreground hover:text-primary transition-all duration-300 ${
              isScrolled ? "text-2xl" : "text-3xl"
            }`}
          >
            {t("nav.brand")}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={navLinkClass(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2" aria-label={t("nav.toggleLabel")}>
              {languageOptions.map((option, index) => (
                <span key={option.code} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => i18n.changeLanguage(option.code)}
                    className={navLinkClass(i18n.language === option.code)}
                  >
                    {option.label}
                  </button>
                  {index < languageOptions.length - 1 && (
                    <span className="text-muted-foreground">/</span>
                  )}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t("nav.themeToggle")}
              className="p-2 rounded-full border border-border bg-card/80 text-foreground hover:bg-accent/60 transition-colors shadow-sm"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2" aria-label={t("nav.toggleLabel")}>
                {languageOptions.map((option, index) => (
                  <span key={option.code} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        i18n.changeLanguage(option.code);
                        handleNavClick();
                      }}
                      className={navLinkClass(i18n.language === option.code, true)}
                    >
                      {option.label}
                    </button>
                    {index < languageOptions.length - 1 && (
                      <span className="text-muted-foreground">/</span>
                    )}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  handleNavClick();
                }}
                aria-label={t("nav.themeToggle")}
                className="flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 text-foreground hover:bg-accent/60 transition-colors py-2"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-base font-medium text-muted-foreground">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
