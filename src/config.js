// ============================================================
//  SHOP SETTINGS  -  edit this file to change shop details
// ============================================================

export const SHOP = {
  name: "ROADBOSS Tires",

  // WhatsApp number in international format, digits only (no + or spaces).
  whatsapp: "251985681722",
  // How the number is shown on the website.
  phoneDisplay: "+251 985 681 722",

  // Locations shown in the "Visit Us" map section.
  // - mapQuery: what Google Maps searches for. Use your exact shop address,
  //   or the business name exactly as it appears on Google Maps.
  // - Add more branches by copying one block. With 2+ branches, tabs appear.
  branches: [
    {
      id: "main",
      name: { en: "Main shop", am: "ዋና ሱቅ", zh: "总店" },
      address: {
        en: "Addis Ababa, Ethiopia",
        am: "አዲስ አበባ፣ ኢትዮጵያ",
        zh: "埃塞俄比亚 亚的斯亚贝巴",
      },
      mapQuery: "Addis Ababa, Ethiopia",
    },
  ],

  // Optional opening hours. Leave as null to hide.
  // Example: { en: "Mon-Sat 8:30 AM - 6:00 PM", am: "...", zh: "..." }
  hours: null,
};
