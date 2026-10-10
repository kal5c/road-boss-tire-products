import { useState } from "react";
import TireArt from "./TireArt";
import { useI18n } from "../i18n/I18nContext";

// Shows a real photo when product.image works,
// otherwise the built-in tire artwork for that model.
export default function ProductImage({ product, className = "" }) {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);
  const alt = t("catalog.tireAlt", { brand: product.brand, model: product.model });

  if (product.image && !failed) {
    return (
      <img
        src={product.image}
        alt={alt}
        className={`product-photo ${className}`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <TireArt
      kind={product.kind}
      pattern={product.pattern}
      brand={product.brand}
      model={product.model}
      size={product.sizes?.[0] || ""}
      title={alt}
    />
  );
}
