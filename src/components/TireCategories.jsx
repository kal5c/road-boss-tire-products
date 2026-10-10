import { useState } from "react";
import "./TireCategories.css";
import TireArt from "./TireArt";
import { useI18n } from "../i18n/I18nContext";
import { openCatalog } from "../utils/events";

const categories = [
  { number: "01", key: "car", className: "passenger", pattern: "fine", vehicleType: "passengerCar" },
  { number: "02", key: "suv", className: "suv", pattern: "allseason", vehicleType: "suv" },
  { number: "03", key: "truck", className: "truck", pattern: "block", vehicleType: "truck" },
];

// Photos go in public/images/categories/ and are named car, suv and truck.
// Any of these file types works: car.webp, car.jpg, car.jpeg, car.png, car.avif
const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];

// Tries each file type in turn. If no photo is found, the drawn tire is shown.
function CategoryImage({ category }) {
  const [index, setIndex] = useState(0);

  if (index >= EXTENSIONS.length) {
    return <TireArt kind={category.key} pattern={category.pattern} />;
  }

  return (
    <img
      src={`/images/categories/${category.key}.${EXTENSIONS[index]}`}
      alt=""
      loading="lazy"
      onError={() => setIndex(index + 1)}
    />
  );
}

function TireCategories() {
  const { t } = useI18n();

  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">
        <div className="categories-heading">
          <span className="categories-eyebrow">{t("cat.eyebrow")}</span>

          <h2>
            {t("cat.title1")}
            <br />
            <span>{t("cat.title2")}</span>
          </h2>

          <p>{t("cat.desc")}</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <article
              className={`category-card category-${category.className}`}
              key={category.number}
            >
              <div className="category-card-top">
                <span className="category-number">{category.number}</span>

                <span className="category-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className={`category-visual visual-${category.className}`} aria-hidden="true">
                <CategoryImage category={category} />
                <span className="vehicle-label">{t(`cat.${category.key}.label`)}</span>
              </div>

              <div className="category-card-content">
                <h3>{t(`cat.${category.key}.name`)}</h3>

                <p>{t(`cat.${category.key}.desc`)}</p>

                <button
                  type="button"
                  className="category-link category-open"
                  onClick={() => openCatalog({ vehicleType: category.vehicleType })}
                >
                  {t("cat.link")} <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="categories-help">
          <div>
            <h3>{t("cat.helpTitle")}</h3>
            <p>{t("cat.helpDesc")}</p>
          </div>

          <a href="#contact" className="categories-help-button">
            {t("cat.helpButton")} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TireCategories;
