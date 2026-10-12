# Wildbean Café — Dandenong South

Premium animated single-page React site for Wildbean Café at 533–551 Frankston–Dandenong Road, Dandenong South VIC 3175.

## Stack

- React + Vite (JavaScript)
- GSAP / ScrollTrigger / Flip / `@gsap/react`
- Lenis smooth scroll
- Lucide React icons
- CSS Modules

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Requires Node.js 22.13+.

Static output is written to `dist/` for DigitalOcean App Platform / Spaces static hosting.

## Data notes

- Business details: `src/data/business.js`
- Menu: `src/data/menu.js` — prices stay hidden until `priceVerified: true`
- Hours are not shown until independently verified
- Reviews fallback to editorial “Coffee moments” when no verified review text exists
- Imagery is licensed stock for atmosphere; not presented as photos of this branch
