import { useEffect, useMemo, useState } from "react";
import "./BrandCatalogOverlay.css";
import ProductImage from "./ProductImage";
import { BRANDS, PRODUCTS, VEHICLE_TYPES } from "../data/products";
import { useI18n } from "../i18n/I18nContext";

function BrandCatalogOverlay({ initialBrand, initialVehicleType, onClose, onSelectProduct }) {
  const { t } = useI18n();
  const [brand, setBrand] = useState(initialBrand || "");
  const [search, setSearch] = useState("");
  const [tireSize, setTireSize] = useState("");
  const [vehicleType, setVehicleType] = useState(initialVehicleType || "");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const brandProducts = useMemo(
    () => PRODUCTS.filter((product) => !brand || product.brand === brand),
    [brand],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedSize = tireSize.trim().toLowerCase();

    return brandProducts.filter((product) => {
      const searchableText = [product.brand, product.model, ...(product.sizes || [])]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesSize =
        !normalizedSize ||
        (product.sizes || []).some((size) => size.toLowerCase().includes(normalizedSize));
      const matchesVehicle = !vehicleType || (product.vehicleTypes || []).includes(vehicleType);

      return matchesSearch && matchesSize && matchesVehicle;
    });
  }, [brandProducts, search, tireSize, vehicleType]);

  function resetFilters() {
    setSearch("");
    setTireSize("");
    setVehicleType("");
  }

  const count = filteredProducts.length;

  return (
    <div
      className="catalog-overlay-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="catalog-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-overlay-title"
      >
        <header className="catalog-overlay-header">
          <div>
            <span className="catalog-overlay-eyebrow">{t("catalog.eyebrow")}</span>

            <h2 id="catalog-overlay-title">
              {brand ? t("catalog.titleBrand", { brand }) : t("catalog.titleAll")}
            </h2>

            <p>{t("catalog.subtitle")}</p>
          </div>

          <button
            type="button"
            className="catalog-overlay-close"
            onClick={onClose}
            aria-label={t("catalog.close")}
          >
            ×
          </button>
        </header>

        <div className="catalog-brand-tabs" role="group" aria-label={t("brands.eyebrow")}>
          {["", ...BRANDS].map((name) => (
            <button
              key={name || "all"}
              type="button"
              className={`catalog-brand-tab ${brand === name ? "active" : ""}`}
              aria-pressed={brand === name}
              onClick={() => setBrand(name)}
            >
              {name || t("catalog.allBrands")}
            </button>
          ))}
        </div>

        <div className="catalog-overlay-filters">
          <label className="catalog-filter catalog-filter-search">
            <span>{t("catalog.search")}</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("catalog.searchPh")}
            />
          </label>

          <label className="catalog-filter">
            <span>{t("catalog.size")}</span>
            <input
              type="search"
              value={tireSize}
              onChange={(event) => setTireSize(event.target.value)}
              placeholder={t("catalog.sizePh")}
            />
          </label>

          <label className="catalog-filter">
            <span>{t("catalog.vehicle")}</span>
            <select value={vehicleType} onChange={(event) => setVehicleType(event.target.value)}>
              <option value="">{t("catalog.allVehicles")}</option>
              {VEHICLE_TYPES.map((vehicle) => (
                <option key={vehicle} value={vehicle}>
                  {t(`vehicle.${vehicle}`)}
                </option>
              ))}
            </select>
          </label>

          <button type="button" className="catalog-reset-button" onClick={resetFilters}>
            {t("catalog.reset")}
          </button>
        </div>

        <div className="catalog-overlay-results">
          <div className="catalog-results-heading">
            <h3>{t("catalog.heading")}</h3>
            <span>{count === 1 ? t("catalog.result", { n: count }) : t("catalog.results", { n: count })}</span>
          </div>

          {count > 0 ? (
            <div className="catalog-product-grid">
              {filteredProducts.map((product) => (
                <article className="catalog-product-card" key={product.id}>
                  <div className="catalog-product-visual">
                    <ProductImage product={product} />
                    <span className="catalog-product-brand">{product.brand}</span>
                  </div>

                  <div className="catalog-product-content">
                    <span className="catalog-product-label">{t("catalog.modelRef")}</span>

                    <h4>{product.model}</h4>

                    <p>{t(`desc.${product.kind}`)}</p>

                    <div className="catalog-product-spec">
                      <strong>{t("catalog.sizes")}:</strong>{" "}
                      {product.sizes?.length ? product.sizes.join(", ") : t("catalog.confirm")}
                    </div>

                    <div className="catalog-product-spec">
                      <strong>{t("catalog.fitment")}:</strong>{" "}
                      {product.vehicleTypes?.length
                        ? product.vehicleTypes.map((v) => t(`vehicle.${v}`)).join(", ")
                        : t("catalog.confirm")}
                    </div>

                    <button
                      type="button"
                      className="catalog-product-inquire"
                      onClick={() => onSelectProduct(product)}
                    >
                      {t("catalog.ask")} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state">
              <span className="catalog-empty-icon">⌕</span>

              <h3>{t("catalog.emptyTitle")}</h3>

              <p>
                {brandProducts.length === 0
                  ? t("catalog.emptyNoData", { brand: brand || "" })
                  : t("catalog.emptyFilter")}
              </p>

              <button type="button" className="catalog-reset-button" onClick={resetFilters}>
                {t("catalog.showAll")}
              </button>
            </div>
          )}

          <p className="catalog-overlay-disclaimer">{t("catalog.disclaimer")}</p>
        </div>
      </section>
    </div>
  );
}

export default BrandCatalogOverlay;
