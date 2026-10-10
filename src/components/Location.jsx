import { useState } from "react";
import "./Location.css";
import { SHOP } from "../config";
import { useI18n } from "../i18n/I18nContext";

const MAP_LANG = { en: "en", am: "am", zh: "zh-CN" };

function Location() {
  const { lang, t } = useI18n();
  const [activeId, setActiveId] = useState(SHOP.branches[0].id);

  const branch = SHOP.branches.find((b) => b.id === activeId) || SHOP.branches[0];
  const query = encodeURIComponent(branch.mapQuery);

  const embedUrl = `https://www.google.com/maps?q=${query}&hl=${MAP_LANG[lang] || "en"}&z=15&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section className="location-section" id="location">
      <div className="location-container">
        <div className="location-heading">
          <span className="location-eyebrow">{t("location.eyebrow")}</span>
          <h2>{t("location.title")}</h2>
          <p>{t("location.desc")}</p>
        </div>

        <div className="location-grid">
          <div className="location-card">
            {SHOP.branches.length > 1 && (
              <div className="location-tabs" role="tablist">
                {SHOP.branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    role="tab"
                    className="location-tab"
                    aria-selected={b.id === branch.id}
                    onClick={() => setActiveId(b.id)}
                  >
                    {b.name[lang] || b.name.en}
                  </button>
                ))}
              </div>
            )}

            <div className="location-detail">
              <h3>{t("location.address")}</h3>
              <p>{branch.address[lang] || branch.address.en}</p>
            </div>

            {SHOP.hours && (
              <div className="location-detail">
                <h3>{t("location.hours")}</h3>
                <p>{SHOP.hours[lang] || SHOP.hours.en}</p>
              </div>
            )}

            <div className="location-detail">
              <h3>{t("contact.whatsapp")}</h3>
              <p>{SHOP.phoneDisplay}</p>
            </div>

            <div className="location-actions">
              <a className="location-button location-button-primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                {t("location.directions")} <span aria-hidden="true">↗</span>
              </a>
              <a className="location-button location-button-secondary" href={openUrl} target="_blank" rel="noopener noreferrer">
                {t("location.open")}
              </a>
            </div>
          </div>

          <div className="location-map">
            <iframe
              key={`${branch.id}-${lang}`}
              title={t("location.mapTitle")}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
