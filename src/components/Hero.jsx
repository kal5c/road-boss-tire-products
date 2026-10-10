import "./Hero.css";
import { useI18n } from "../i18n/I18nContext";

function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-label">{t("hero.label")}</span>

          <h1>
            {t("hero.title1")}
            <br />
            {t("hero.title2pre")}
            <span>{t("hero.title2")}</span>
          </h1>

          <p className="hero-description">{t("hero.desc")}</p>

          <div className="hero-buttons">
            <a href="#categories" className="hero-button hero-button-primary">
              {t("hero.explore")} <span aria-hidden="true">→</span>
            </a>

            <a href="#contact" className="hero-button hero-button-secondary">
              {t("hero.quote")}
            </a>
          </div>

          <div className="hero-note">
            <span className="hero-note-line"></span>
            <p>{t("hero.note")}</p>
          </div>
        </div>

        <div className="hero-visual">
          <img src="/images/roadboss.jpg" alt={t("hero.imgAlt")} className="hero-image" />

          <div className="hero-image-badge">
            <span className="hero-badge-icon">✓</span>
            <div>
              <strong>{t("hero.badgeTitle")}</strong>
              <p>{t("hero.badgeSub")}</p>
            </div>
          </div>

          <div className="hero-orange-shape"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
