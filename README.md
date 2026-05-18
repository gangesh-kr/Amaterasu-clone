# Amaterasu — Hero Section

A fullscreen, scroll-driven hero experience featuring a dark-to-light skin spotlight effect, layered typography, ambient UI elements, and smooth scroll interactions.

## Tech Stack

- **React 19** (Vite) — Component model, fast HMR
- **Lenis** — Silky smooth scroll interpolation
- **GSAP** — Animation ticker sync
- **HTML5 Canvas** — Pixel-level radial spotlight compositing
- **Tailwind CSS v4** — Utility-first styling
- **Inter** (Google Fonts) — Typography at weights 300, 400

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

The dev server runs at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── HeroSection.jsx      ← Top-level hero wrapper (sticky + scroll container)
│   ├── HeroCanvas.jsx       ← Canvas spotlight renderer (2-layer compositing)
│   ├── HeroNav.jsx          ← Transparent navigation bar
│   ├── HeroHeadline.jsx     ← Display headline + CTA button
│   ├── HeroCopy.jsx         ← Bottom-right paragraph text
│   └── HeroAmbient.jsx      ← Decorative dots, circles, scroll label, chevron
├── hooks/
│   ├── useSmoothScroll.js   ← Lenis initialisation + GSAP ticker sync
│   ├── useScrollProgress.js ← Normalised scroll value 0→1 (via ref, not state)
│   └── useSpotlight.js      ← Spotlight x/y/radius computation from scroll progress
├── assets/
│   └── hero-bg.png          ← Hero portrait photograph
├── styles/
│   └── globals.css          ← Reset, font imports, component styles
├── App.jsx
└── main.jsx
```

## How the Spotlight Works

1. The canvas draws the hero image with a dark overlay (65% opacity)
2. A radial gradient using `destination-out` compositing punches a soft hole in the overlay
3. The bright image is drawn behind using `destination-over` compositing
4. A subtle teal `screen` tint adds warmth to the spotlight region
5. All spotlight coordinates are derived from scroll progress via keyframe interpolation

## Performance

- All scroll-driven values use `useRef` (not `useState`) to avoid React re-renders
- Canvas render loop uses `requestAnimationFrame` for 60fps
- `ResizeObserver` handles canvas scaling with devicePixelRatio support
- `will-change` hints on animated text elements

## Image Asset

The hero image (`hero-bg.png`) is a profile portrait with teal ambient lighting, wearing a dark turtleneck. Ensure the image is high resolution (minimum 2400px wide) for best quality on retina displays.
