import { useState } from "react";
import "./Navbar.css";
import { LANGUAGES } from "../i18n/translations";
import { useI18n } from "../i18n/I18nContext";
import { useTheme } from "../theme/ThemeContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-brand" onClick={closeMenu} aria-label="ROADBOSS home">
          <span className="brand-name">
            ROAD<span>BOSS</span>
          </span>
          <span className="brand-tagline">TIRES THAT MOVE YOU</span>
        </a>

        <nav
          id="navbar-menu"
          className={`navbar-menu ${menuOpen ? "active" : ""}`}
          aria-label={t("nav.main")}
        >
          <a href="#home" onClick={closeMenu}>{t("nav.home")}</a>
          <a href="#about" onClick={closeMenu}>{t("nav.about")}</a>
          <a href="#brands" onClick={closeMenu}>{t("nav.brands")}</a>
          <a href="#categories" onClick={closeMenu}>{t("nav.categories")}</a>
          <a href="#products" onClick={closeMenu}>{t("nav.products")}</a>
          <a href="#location" onClick={closeMenu}>{t("nav.location")}</a>
          <a href="#contact" onClick={closeMenu}>{t("nav.contact")}</a>
          <a href="#contact" className="navbar-cta" onClick={closeMenu}>
            {t("nav.quote")}
            <span aria-hidden="true"> ↗</span>
          </a>
        </nav>

        <div className="navbar-tools">
          <div className="lang-switch" role="group" aria-label={t("nav.language")}>
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                lang={item.htmlLang}
                title={item.label}
                aria-pressed={lang === item.code}
                onClick={() => setLang(item.code)}
              >
                {item.short}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("nav.toLight") : t("nav.toDark")}
            title={theme === "dark" ? t("nav.toLight") : t("nav.toDark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <button
          className="navbar-toggle"
          type="button"
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
