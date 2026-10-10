# ROADBOSS Tires website (React + Vite)

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Where to edit things
| What | File |
|---|---|
| WhatsApp number, address, Google Maps location, opening hours | `src/config.js` |
| Tire catalog (27 models), sizes, photos | `src/data/products.js` |
| All text in English / Amharic / Chinese | `src/i18n/translations.js` |
| Colors for light and dark theme | `src/styles/theme.css` |
| Your real photos | `public/images/` |

## Important: replace the sample data
Model names come from public supplier listings, but **sizes and which models you
really stock are sample data**. Edit `src/data/products.js` with your real stock.

## Adding real tire photos
Photos for the catalog live in `public/images/products/` (named after the product id, e.g. `taitong-hs268.webp`).
1. Put the file in `public/images/products/` (no spaces in the name).
2. In `src/data/products.js` add `image: "/images/products/file.webp"` to that product.
   An online link (`https://...`) also works. If a photo fails to load, the built-in
   tire artwork is shown automatically.

## Map
Set the exact address / Google Maps place name in `src/config.js` (`mapQuery`).
Add more branches by copying the branch block; tabs appear automatically.

## Languages and theme
English, Amharic and Chinese, switch in the top bar. Light/dark theme button next to it.
Both choices are remembered. Please have native speakers review the Amharic and Chinese text.
