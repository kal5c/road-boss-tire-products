import ProductCard from "./ProductCard";
import "./ProductCatalog.css";
import { FEATURED_IDS, PRODUCTS } from "../data/products";
import { useI18n } from "../i18n/I18nContext";
import { openCatalog } from "../utils/events";

const featured = FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

function ProductCatalog() {
  const { t } = useI18n();

  return (
    <section className="product-catalog-section" id="products">
      <div className="product-catalog-container">
        <div className="product-catalog-heading">
          <div>
            <span className="product-catalog-eyebrow">{t("products.eyebrow")}</span>

            <h2>
              {t("products.title1")}
              <br />
              <span>{t("products.title2")}</span>
            </h2>
          </div>

          <p>{t("products.desc")}</p>
        </div>

        <div className="product-catalog-grid">
          {featured.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              number={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>

        <div className="product-catalog-more">
          <button type="button" className="product-catalog-all" onClick={() => openCatalog({})}>
            {t("products.browseAll")} <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="product-catalog-note">
          <span className="product-note-icon">i</span>

          <p>{t("products.noteText")}</p>

          <a href="#contact">
            {t("products.noteLink")} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProductCatalog;
