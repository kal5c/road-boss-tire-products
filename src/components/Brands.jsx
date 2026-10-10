import "./Brands.css";
import { BRANDS, BRAND_PHOTOS, countByBrand } from "../data/products";
import { useI18n } from "../i18n/I18nContext";
import { openCatalog } from "../utils/events";

function Brands() {
  const { t } = useI18n();

  return (
    <section className="brand-browser" id="brands">
      <div className="brand-browser-container">
        <div className="brand-browser-heading">
          <span className="brand-browser-eyebrow">{t("brands.eyebrow")}</span>

          <h2>
            {t("brands.title1")}
            <br />
            <span>{t("brands.title2")}</span>
          </h2>

          <p>{t("brands.desc")}</p>
        </div>

        <div className="brand-browser-grid">
          {BRANDS.map((brand, index) => (
            <button
              key={brand}
              type="button"
              className="brand-browser-card"
              onClick={() => openCatalog({ brand })}
              aria-label={`${t("brands.explore")}: ${brand}`}
            >
              <span className="brand-browser-photo">
                <img src={BRAND_PHOTOS[brand]} alt="" loading="lazy" />
                <span className="brand-browser-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="brand-browser-count">
                  {t("brands.models", { n: countByBrand(brand) })}
                </span>
              </span>

              <span className="brand-browser-body">
                <span className="brand-browser-name">{brand}</span>
                <span className="brand-browser-description">{t(`brands.${brand}`)}</span>
                <span className="brand-browser-action">
                  {t("brands.explore")} <span aria-hidden="true">↗</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="brand-browser-footer">
          <p className="brand-browser-note">{t("brands.note")}</p>

          <a className="brand-browser-contact" href="#contact">
            {t("brands.contact")} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Brands;
