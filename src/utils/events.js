// Small helpers so any component can open the catalog or start a quote
// without passing props through the whole page.

export function openCatalog({ brand = null, vehicleType = "" } = {}) {
  window.dispatchEvent(
    new CustomEvent("roadboss:open-catalog", { detail: { brand, vehicleType } }),
  );
}

export function requestQuote(product) {
  window.dispatchEvent(
    new CustomEvent("roadboss:quote-product", {
      detail: { brand: product.brand, model: product.model },
    }),
  );

  window.location.hash = "contact";
  window.setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}
