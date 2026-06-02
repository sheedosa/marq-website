# MarQ — Branding Solutions, Libya

A single-page marketing site for **MarQ**, a Libya-based branding studio — built in a
bold, brutalist-editorial style (massive italic display type, full-section colour-blocking
in plum / teal / gold) with a full-bleed animated video hero and a **bilingual EN / ع**
toggle (RTL-aware).

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, brand tokens in `src/index.css`)
- **Motion** (Framer Motion) for entrance/scroll animation — respects `prefers-reduced-motion`
- **lucide-react** icons
- Fonts: Space Grotesk (display) · Inter (body) · Cairo / Tajawal (Arabic)

## Structure

```
index.html             # Vite entry
public/hero.mp4         # full-bleed hero background video
src/
  main.tsx              # mounts <App/> inside <LanguageProvider/>
  index.css            # Tailwind + @theme brand tokens + Arabic overrides
  i18n.tsx             # EN/ع language context (dir + persistence)
  content.ts           # all bilingual copy (EN + warm-MSA Arabic)
  App.tsx
  components/          # Navigation · Hero · Services · Work · Footer
```

## Develop

```bash
npm install
npm run dev      # http://localhost:4317
npm run build    # production build → dist/
```

## Deploy

Pushing to `main` triggers **GitHub Actions** (`.github/workflows/deploy.yml`), which builds
the site and publishes `dist/` to **GitHub Pages**.

- Live: https://sheedosa.github.io/marq-website/
- `vite.config.ts` sets `base` to `/marq-website/` for the build (project Pages path);
  dev/preview serve from `/`.

## Pending real content

Case studies, client logos, and any testimonials are placeholders — swap in the real
Libyan client names, sectors, and imagery (and project images under `public/`) when ready.
