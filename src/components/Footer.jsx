import "./Footer.css";
import { SHOP } from "../config";
import { BRANDS } from "../data/products";
import { useI18n } from "../i18n/I18nContext";

function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();
  const address = SHOP.branches[0].address[lang] || SHOP.branches[0].address.en;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">
            ROAD<span>BOSS</span>
          </span>
          <p>{t("footer.desc")}</p>
        </div>

        <div className="footer-column">
          <h3>{t("footer.quick")}</h3>
          <a href="#home">{t("nav.home")}</a>
          <a href="#about">{t("nav.about")}</a>
          <a href="#brands">{t("nav.brands")}</a>
          <a href="#categories">{t("nav.categories")}</a>
          <a href="#products">{t("nav.products")}</a>
          <a href="#location">{t("nav.location")}</a>
          <a href="#contact">{t("nav.contact")}</a>
        </div>

        <div className="footer-column">
          <h3>{t("footer.brands")}</h3>
          {BRANDS.map((brand) => (
            <a href="#brands" key={brand}>
              {brand}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <h3>{t("footer.contact")}</h3>
          <p>{address}</p>
          <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noopener noreferrer">
            {t("footer.whatsapp")}: {SHOP.phoneDisplay}
          </a>
          <a href="#contact" className="footer-cta">
            {t("footer.quote")} ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} {SHOP.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
