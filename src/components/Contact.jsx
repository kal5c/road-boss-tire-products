import { useEffect, useState } from "react";
import "./Contact.css";
import { SHOP } from "../config";
import { useI18n } from "../i18n/I18nContext";

const VEHICLE_KEYS = ["car", "suv", "pickup", "truck", "bus", "industrial", "agri", "other"];

function Contact() {
  const { t } = useI18n();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleType: "",
    tireSize: "",
    quantity: "1",
    message: "",
  });

  const [error, setError] = useState("");

  // Receive the selected tire from the catalog / product cards.
  useEffect(() => {
    const handleQuoteProduct = (event) => {
      const { brand, model } = event.detail || {};
      if (!brand || !model) return;

      setForm((previousForm) => ({
        ...previousForm,
        message: t("form.prefill", { brand, model }),
      }));
    };

    window.addEventListener("roadboss:quote-product", handleQuoteProduct);
    return () => window.removeEventListener("roadboss:quote-product", handleQuoteProduct);
  }, [t]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      // Permit digits and common phone-number formatting only.
      const cleanedInput = value.replace(/[^\d+\s()-]/g, "");
      setForm((previousForm) => ({ ...previousForm, phone: cleanedInput }));
      setError("");
      return;
    }

    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setError("");
  };

  const isValidEthiopianPhone = (phone) => {
    const normalizedPhone = phone.replace(/[\s()-]/g, "");
    return /^(?:\+251|251|0)?(?:9|7)\d{8}$/.test(normalizedPhone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError(t("form.errName"));
      return;
    }

    if (!form.phone.trim()) {
      setError(t("form.errPhone"));
      return;
    }

    if (!isValidEthiopianPhone(form.phone)) {
      setError(t("form.errPhoneInvalid"));
      return;
    }

    if (!/^\d{10,15}$/.test(SHOP.whatsapp)) {
      setError(t("form.errConfig"));
      return;
    }

    const vehicleLabel = form.vehicleType ? t(`form.v.${form.vehicleType}`) : t("form.notSpecified");

    const message = [
      t("form.msgHello"),
      "",
      `${t("form.msgName")}: ${form.name.trim()}`,
      `${t("form.msgPhone")}: ${form.phone.trim()}`,
      `${t("form.msgVehicle")}: ${vehicleLabel}`,
      `${t("form.msgSize")}: ${form.tireSize.trim() || t("form.notSpecified")}`,
      `${t("form.msgQty")}: ${form.quantity || "1"}`,
      `${t("form.msgDetails")}: ${form.message.trim() || t("form.none")}`,
    ].join("\n");

    const whatsappURL = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <p className="contact-eyebrow">{t("contact.eyebrow")}</p>
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.desc")}</p>

          <div className="contact-detail">
            <h3>{t("contact.whatsapp")}</h3>
            <p>{SHOP.phoneDisplay}</p>
          </div>

          <div className="contact-detail">
            <h3>{t("contact.includeTitle")}</h3>
            <p>{t("contact.includeDesc")}</p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>{t("form.title")}</h2>
          <p>{t("form.desc")}</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">{t("form.name")}</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("form.namePh")}
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t("form.phone")}</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t("form.phonePh")}
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="tel"
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "contact-error" : undefined}
              />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">{t("form.vehicle")}</label>
              <select id="vehicleType" name="vehicleType" value={form.vehicleType} onChange={handleChange}>
                <option value="">{t("form.vehiclePh")}</option>
                {VEHICLE_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t(`form.v.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tireSize">{t("form.size")}</label>
              <input
                id="tireSize"
                name="tireSize"
                type="text"
                placeholder={t("form.sizePh")}
                value={form.tireSize}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">{t("form.qty")}</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t("form.details")}</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder={t("form.detailsPh")}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="form-error" id="contact-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="contact-submit-button">
              {t("form.submit")}
            </button>

            <p className="form-note">{t("form.note")}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
