// ============================================================
//  TIRE CATALOG
//
//  IMPORTANT: model/pattern names come from public supplier listings
//  for these brands, but the SIZES and which models you actually
//  stock are SAMPLE information. Replace them with your real stock list.
//
//  Fields
//   id            unique, no spaces
//   brand         "ROADBOSS" | "TAITONG" | "KAPSEN"
//   model         name shown to customers
//   kind          "car" | "suv" | "truck"   (controls artwork + wording)
//   pattern       tread look: block | lug | slant | zigzag | fine | sport | allseason
//   vehicleTypes  any of: passengerCar, suv, truck, bus, other
//   sizes         list of tire sizes (leave [] if unknown)
//   image         OPTIONAL real photo. Either "/images/file.jpg" (put the file in
//                 public/images) or a full https:// link. If the photo is missing
//                 or fails to load, the built-in tire artwork is shown instead.
// ============================================================

export const BRANDS = ["ROADBOSS", "TAITONG", "KAPSEN"];

// Real brand photos (in public/images). Used on the brand cards and catalog header.
export const BRAND_PHOTOS = {
  ROADBOSS: "/images/roadboss.jpg",
  TAITONG: "/images/TAITONG.webp",
  KAPSEN: "/images/kapsen.png",
};

const truck = ["truck", "bus"];
const car = ["passengerCar"];
const carSuv = ["passengerCar", "suv"];

export const PRODUCTS = [
  // ---------------- ROADBOSS ----------------
  { id: "roadboss-rm911g", brand: "ROADBOSS", model: "RM911G", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["11R22.5", "12R22.5", "315/80R22.5"] },
  { id: "roadboss-rl503g", brand: "ROADBOSS", model: "RL503G", kind: "truck", pattern: "zigzag", vehicleTypes: truck, sizes: ["295/80R22.5", "315/80R22.5"], image: "/images/products/roadboss-rl503g.webp" },
  { id: "roadboss-rl601g", brand: "ROADBOSS", model: "RL601G", kind: "truck", pattern: "lug", vehicleTypes: truck, sizes: ["12R22.5"], image: "/images/roadboss.jpg" },
  { id: "roadboss-hs268", brand: "ROADBOSS", model: "HS268", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["1000R20", "1100R20", "1200R20", "11R22.5", "13R22.5"], image: "/images/products/roadboss-hs268.webp" },
  { id: "roadboss-or106", brand: "ROADBOSS", model: "OR106", kind: "truck", pattern: "lug", vehicleTypes: truck, sizes: ["12R22.5", "315/80R22.5"], image: "/images/products/roadboss-or106.webp" },
  { id: "roadboss-or306xleco", brand: "ROADBOSS", model: "OR306 XL ECO", kind: "truck", pattern: "slant", vehicleTypes: truck, sizes: ["295/80R22.5", "315/80R22.5"], image: "/images/products/roadboss-or306xleco.webp" },
  { id: "roadboss-ut652", brand: "ROADBOSS", model: "UT652", kind: "truck", pattern: "zigzag", vehicleTypes: truck, sizes: ["11R22.5", "12R22.5"], image: "/images/products/roadboss-ut652.webp" },

  // ---------------- TAITONG ----------------
  { id: "taitong-hs101", brand: "TAITONG", model: "HS101", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["11R22.5", "295/80R22.5", "315/80R22.5"], image: "/images/products/taitong-hs101.webp" },
  { id: "taitong-hs102", brand: "TAITONG", model: "HS102", kind: "truck", pattern: "slant", vehicleTypes: truck, sizes: ["315/80R22.5"], image: "/images/products/taitong-hs102.webp" },
  { id: "taitong-hs201", brand: "TAITONG", model: "HS201", kind: "truck", pattern: "zigzag", vehicleTypes: truck, sizes: ["315/70R22.5"], image: "/images/products/taitong-hs201.webp" },
  { id: "taitong-hs202", brand: "TAITONG", model: "HS202", kind: "truck", pattern: "lug", vehicleTypes: truck, sizes: ["315/70R22.5"], image: "/images/products/taitong-hs202.webp" },
  { id: "taitong-hs203", brand: "TAITONG", model: "HS203", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["315/80R22.5"], image: "/images/products/taitong-hs203.webp" },
  { id: "taitong-hs205", brand: "TAITONG", model: "HS205", kind: "truck", pattern: "slant", vehicleTypes: truck, sizes: ["295/75R22.5"], image: "/images/products/taitong-hs205.webp" },
  { id: "taitong-hs219", brand: "TAITONG", model: "HS219", kind: "truck", pattern: "zigzag", vehicleTypes: truck, sizes: ["11R22.5", "295/75R22.5"], image: "/images/products/taitong-hs219.webp" },
  { id: "taitong-hs268", brand: "TAITONG", model: "HS268", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["825R20", "900R20", "1000R20", "1100R20", "1200R20", "1200R24"], image: "/images/products/taitong-hs268.webp" },
  { id: "taitong-or106", brand: "TAITONG", model: "OR106", kind: "truck", pattern: "lug", vehicleTypes: truck, sizes: ["11R22.5", "12R22.5"] },

  // ---------------- KAPSEN ----------------
  { id: "kapsen-hd918", brand: "KAPSEN", model: "HD918", kind: "suv", pattern: "allseason", vehicleTypes: carSuv, sizes: ["215/65R16", "215/70R16", "225/70R16", "235/70R16"] },
  { id: "kapsen-hp7", brand: "KAPSEN", model: "HP7", kind: "car", pattern: "fine", vehicleTypes: car, sizes: ["205/55R16", "225/55R16", "225/60R16"] },
  { id: "kapsen-k737", brand: "KAPSEN", model: "K737", kind: "car", pattern: "sport", vehicleTypes: car, sizes: ["205/55R16", "215/65R16"], image: "/images/products/kapsen-k737.webp" },
  { id: "kapsen-sportmax-s2000", brand: "KAPSEN", model: "Sportmax S2000", kind: "car", pattern: "sport", vehicleTypes: car, sizes: ["225/55R16", "235/60R16"], image: "/images/products/kapsen-sportmax-s2000.webp" },
  { id: "kapsen-a4-all-season", brand: "KAPSEN", model: "A4 All Season", kind: "car", pattern: "allseason", vehicleTypes: carSuv, sizes: ["215/65R16", "225/60R16", "235/60R16"] },
  { id: "kapsen-hs203", brand: "KAPSEN", model: "HS203", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["315/80R22.5"], image: "/images/products/kapsen-hs203.webp" },
  { id: "kapsen-hs268", brand: "KAPSEN", model: "HS268", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["11R22.5", "13R22.5", "315/80R22.5"] },
  { id: "kapsen-hs101", brand: "KAPSEN", model: "HS101", kind: "truck", pattern: "lug", vehicleTypes: truck, sizes: ["295/80R22.5", "315/80R22.5"], image: "/images/products/taitong-hs101.webp" },
  { id: "kapsen-hs202", brand: "KAPSEN", model: "HS202", kind: "truck", pattern: "zigzag", vehicleTypes: truck, sizes: ["315/70R22.5"], image: "/images/products/taitong-hs202.webp" },
  { id: "kapsen-hs219", brand: "KAPSEN", model: "HS219", kind: "truck", pattern: "slant", vehicleTypes: truck, sizes: ["11R22.5", "295/75R22.5"] },
  { id: "kapsen-hs205", brand: "KAPSEN", model: "HS205", kind: "truck", pattern: "block", vehicleTypes: truck, sizes: ["295/75R22.5"], image: "/images/products/taitong-hs205.webp" },
];

// Shown in the "Find Your Next Set of Tires" section (use product ids).
export const FEATURED_IDS = [
  "roadboss-rm911g",
  "roadboss-rl503g",
  "roadboss-rl601g",
  "taitong-hs268",
  "kapsen-hd918",
  "kapsen-a4-all-season",
];

export const VEHICLE_TYPES = ["passengerCar", "suv", "truck", "bus", "other"];

export function countByBrand(brand) {
  return PRODUCTS.filter((p) => p.brand === brand).length;
}
