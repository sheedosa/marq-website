# MarQ — Branding Solutions

A single-page marketing site for **MarQ**, a Doha-based branding studio.
Built in the studio's *Modular Geometric Modernism* visual language — the brand's
own pattern system (circles, semicircles, triangles, quarter-tiles, M/Q glyphs)
drives every section, with a full-bleed animated hero, scroll motion, count-up
stats, and a bilingual **EN / ع** RTL toggle.

Plain HTML / CSS / JS — no build step.

## Structure

```
index.html            # the page
assets/
  marq.css            # design tokens (color, type, spacing) + buttons
  sections.css        # nav, hero, and all section styles
  pattern.js          # the geometric PatternTile system (SVG mosaics/strips)
  motion.js           # preloader, reveals, counters, nav, language toggle, hero video
  hero.mp4            # full-bleed hero background animation
server.js             # tiny static server for local preview
.nojekyll             # tells GitHub Pages to serve files as-is (no Jekyll build)
```

## Run locally

Any static server works. With Node:

```bash
node server.js          # → http://localhost:4317
```

Or with Python:

```bash
python3 -m http.server 4317
```

## Deployment (GitHub Pages)

This repo is served by **GitHub Pages** from the `main` branch root.
Pushing to `main` redeploys automatically within a minute or two.

Live URL: https://sheedosa.github.io/marq-website/

## Connecting a custom domain

When your domain is ready:

1. **Add a `CNAME` file** to the repo root containing just your domain, e.g.:
   ```
   www.yourdomain.com
   ```
   (Settings → Pages → "Custom domain" does this for you automatically.)
2. **Configure DNS** at your domain registrar:
   - For a subdomain (`www`): add a `CNAME` record →  `sheedosa.github.io`
   - For the apex/root (`yourdomain.com`): add `A` records to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and optionally an `AAAA` record set for IPv6).
3. In **Settings → Pages**, enter the domain and enable **Enforce HTTPS** once the
   certificate is issued (can take a few minutes to an hour).

All asset paths in the site are relative, so it works at both the
`/marq-website/` project path and at a root custom domain with no changes.
