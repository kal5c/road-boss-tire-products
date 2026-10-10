import "./About.css";
import { useI18n } from "../i18n/I18nContext";

const highlights = [
  { icon: "◎", key: "h1" },
  { icon: "✓", key: "h2" },
  { icon: "↗", key: "h3" },
];

function About() {
  const { t } = useI18n();

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <span className="about-eyebrow">{t("about.eyebrow")}</span>

          <h2>
            {t("about.title1")}
            <br />
            <span>{t("about.title2")}</span>
          </h2>

          <p className="about-lead">{t("about.lead")}</p>

          <p>{t("about.body")}</p>

          <a href="#contact" className="about-button">
            {t("about.button")} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="about-side">
          <div className="about-image-card">
            <img src="/images/TAITONG.webp" alt={t("about.imgAlt")} className="about-image" />
            <span className="about-image-label">{t("about.imgLabel")}</span>
          </div>

          <div className="about-highlights">
            {highlights.map((item) => (
              <div className="about-highlight" key={item.key}>
                <span className="about-highlight-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3>{t(`about.${item.key}.title`)}</h3>
                  <p>{t(`about.${item.key}.text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
