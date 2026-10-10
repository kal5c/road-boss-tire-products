import { useCallback, useEffect, useState } from "react";
import BrandCatalogOverlay from "./BrandCatalogOverlay";
import { requestQuote } from "../utils/events";

// Listens for "open catalog" requests from anywhere on the page
// (brand cards, category cards, featured products...).
export default function CatalogHost() {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      const { brand = null, vehicleType = "" } = event.detail || {};
      setRequest({ brand, vehicleType, key: Date.now() });
    };
    window.addEventListener("roadboss:open-catalog", handler);
    return () => window.removeEventListener("roadboss:open-catalog", handler);
  }, []);

  const close = useCallback(() => setRequest(null), []);

  const handleSelectProduct = useCallback(
    (product) => {
      setRequest(null);
      requestQuote(product);
    },
    [],
  );

  if (!request) return null;

  return (
    <BrandCatalogOverlay
      key={request.key}
      initialBrand={request.brand}
      initialVehicleType={request.vehicleType}
      onClose={close}
      onSelectProduct={handleSelectProduct}
    />
  );
}
