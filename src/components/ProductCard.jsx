import "./ProductCard.css";
import ProductImage from "./ProductImage";
import { useI18n } from "../i18n/I18nContext";
import { requestQuote } from "../utils/events";

function ProductCard({ product, number }) {
  const { t } = useI18n();

  return (
    <article className="product-card">
      <div className="product-card-image">
        <ProductImage product={product} />

        <span className="product-brand-label">{product.brand}</span>

        <span className="product-number">{number}</span>
      </div>

      <div className="product-card-content">
        <span className="product-category">{t("catalog.modelRef")}</span>

        <h3>{product.model}</h3>

        <p>{t(`desc.${product.kind}`)}</p>

        {product.sizes?.length > 0 && (
          <div className="product-sizes">
            <strong>{t("catalog.sizes")}:</strong> {product.sizes.slice(0, 4).join(", ")}
          </div>
        )}

        <button type="button" className="product-inquiry-link" onClick={() => requestQuote(product)}>
          {t("catalog.ask")}
          <span aria-hidden="true"> →</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
