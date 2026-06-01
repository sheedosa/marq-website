/* ============================================================
   MarQ — Motion & behavior
   Fills pattern containers, runs the pre-loader, nav, reveals,
   counters, marquee, QR, language toggle. Exposes window.MarQ.
   ============================================================ */
(function () {
  const P = window.MarQPattern;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // tweakable state
  const state = {
    density: 1,      // pattern fill multiplier
    motion: reduceMotion ? 0 : 1,
    hero: document.body.getAttribute("data-hero") || "a",
  };

  /* ---------------- Pattern filling ---------------- */
  function setSVG(el, svg) { if (el) el.innerHTML = svg; }

  function fr(base) { return Math.min(0.95, base * state.density); }

  function fillPatterns() {
    if (!P) return;
    const heroM = $("#heroMosaic");
    if (heroM) {
      const cfg = { a: [5, 6, 8], b: [8, 6, 9], c: [4, 7, 11] }[state.hero] || [5, 6, 8];
      setSVG(heroM, P.mosaic(cfg[0], cfg[1], {
        seed: cfg[2], mode: "vivid", fillRatio: fr(0.78), bgChance: 0.74,
        sheenCount: 2, glyphs: true, gap: 0, radius: 0, canvas: "#FAF7FA",
      }));
    }
    setSVG($("#heroBg"), P.scatter(14, 9, { seed: 3, tone: "soft", fillRatio: fr(0.34) }));

    // hero floaters
    const fl = $("#heroFloaters");
    if (fl) {
      const tiles = [
        { s: "circle", c: P.COLORS.gold700, x: -6, y: 8, sz: 64, sheen: true },
        { s: "quarter", c: P.COLORS.teal700, x: 92, y: 2, sz: 80 },
        { s: "triangle", c: P.COLORS.plum700, x: 96, y: 70, sz: 58 },
        { s: "semi", c: P.COLORS.gold700, x: 2, y: 84, sz: 52 },
      ];
      fl.innerHTML = tiles.map((t, i) =>
        `<span class="floater" data-depth="${(i % 3) + 1}" style="left:${t.x}%;top:${t.y}%;width:${t.sz}px;height:${t.sz}px;">${P.tile(t.s, { fg: t.c, rot: i * 90, sheen: t.sheen, size: t.sz })}</span>`
      ).join("");
    }

    setSVG($("#whyStripTop"), P.strip(18, { seed: 9, mode: "soft", fillRatio: 0.9 }));
    setSVG($("#statsPattern"), P.mosaic(4, 7, { seed: 14, mode: "soft", fillRatio: fr(0.7), bgChance: 0.5, glyphs: true }));
    setSVG($("#ctaPattern"), P.mosaic(5, 8, { seed: 21, mode: "vivid", fillRatio: fr(0.82), bgChance: 0.8, sheenCount: 2, glyphs: true, gap: 0, radius: 0 }));
    setSVG($("#footerEdge"), P.strip(24, { seed: 30, mode: "vivid", fillRatio: 0.95 }));
    setSVG($("#mobileMenuPattern"), P.scatter(6, 5, { seed: 12, mode: "vivid", fillRatio: fr(0.5) }));

    // service card thumbs
    $$(".svc-card__thumb").forEach((el) => {
      const seed = +el.dataset.seed || 7;
      setSVG(el, P.mosaic(7, 3, { seed, mode: "vivid", fillRatio: fr(0.8), bgChance: 0.85, sheenCount: 0, glyphs: true, gap: 0 }));
    });

    // case study placeholders
    $$(".case").forEach((el) => {
      const seed = +el.dataset.seed || 7;
      const big = el.classList.contains("case--lg");
      const art = $(".case__art", el);
      setSVG(art, P.mosaic(big ? 6 : 4, big ? 4 : 3, { seed, mode: "vivid", fillRatio: fr(0.82), bgChance: 0.9, sheenCount: 1, glyphs: true, gap: 0 }));
    });

    // QR (placeholder)
    setSVG($("#footerQr"), makeQR(25, 7));
  }

  /* ---------------- Fake QR ---------------- */
  function makeQR(n, seed) {
    const rng = P.rngFrom(seed);
    let cells = "";
    const isFinder = (x, y) => {
      const inBox = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
      return inBox(0, 0) || inBox(n - 7, 0) || inBox(0, n - 7);
    };
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (isFinder(x, y)) continue;
        if (rng() < 0.46) cells += `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.46"/>`;
      }
    }
    const finder = (ox, oy) =>
      `<rect x="${ox}" y="${oy}" width="7" height="7" rx="2.4"/>` +
      `<rect x="${ox + 1}" y="${oy + 1}" width="5" height="5" rx="1.7" fill="#fff"/>` +
      `<rect x="${ox + 2}" y="${oy + 2}" width="3" height="3" rx="1.1" fill="#581D5A"/>`;
    return `<svg viewBox="-0.5 -0.5 ${n + 1} ${n + 1}" fill="#581D5A" aria-hidden="true">${cells}${finder(0, 0)}${finder(n - 7, 0)}${finder(0, n - 7)}</svg>`;
  }

  /* ---------------- Pre-loader ---------------- */
  function runPreloader() {
    const pre = $("#preloader");
    const stage = $("#preloaderStage");
    if (!pre || !stage) return finishPre(pre);
    if (reduceMotion || sessionStorage.getItem("marq-seen")) {
      return finishPre(pre, true);
    }
    document.body.classList.add("preloading");
    // 12 tiles assembling into an M (3x4 grid silhouette)
    const cols = 3, rows = 4, n = cols * rows;
    const shapes = ["circle", "quarter", "semi", "triangle", "circle", "quarter", "semi", "triangle", "dot", "quarter", "semi", "circle"];
    const cols3 = [P.COLORS.plum700, P.COLORS.teal700, P.COLORS.gold700];
    const w = 100 / cols, h = 100 / rows;
    let html = "";
    for (let i = 0; i < n; i++) {
      const c = i % cols, r = (i / cols) | 0;
      const col = i % 7 === 6 ? cols3[2] : (i % 4 === 3 ? cols3[1] : cols3[0]);
      html += `<span class="preloader__tile" data-i="${i}" style="left:${c * w}%;top:${r * h}%;width:${w}%;height:${h}%;padding:3px;">${P.tile(shapes[i % shapes.length], { fg: col, rot: (i * 90) % 360, sheen: i === 4 })}</span>`;
    }
    stage.innerHTML = html;
    const tiles = $$(".preloader__tile", stage);
    tiles.forEach((t, i) => {
      t.animate(
        [
          { opacity: 0, transform: "translateY(-40px) rotate(-90deg) scale(.4)" },
          { opacity: 1, transform: "translateY(0) rotate(0) scale(1)" },
        ],
        { duration: 520, delay: 40 + i * 48, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "both" }
      );
    });
    setTimeout(() => finishPre(pre), 40 + n * 48 + 520 + 260);
  }
  function finishPre(pre, instant) {
    if (!pre) return;
    sessionStorage.setItem("marq-seen", "1");
    const go = () => {
      pre.classList.add("is-done");
      document.body.classList.remove("preloading");
      setTimeout(() => pre.remove(), 800);
      startHeroIntro();
    };
    instant ? (pre.style.display = "none", document.body.classList.remove("preloading"), startHeroIntro()) : go();
  }

  function startHeroIntro() {
    // reveal hero elements
    $$("#hero .reveal").forEach((el) => el.classList.add("in"));
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    const nav = $("#nav");
    const burger = $("#navBurger");
    const menu = $("#mobileMenu");
    // At the top the nav sits over the dark full-bleed hero video → light theme;
    // once scrolled it gets the solid off-white bar → dark theme. The mobile menu
    // (plum overlay) always wants the light theme.
    const setNavTheme = () => {
      const menuOpen = menu.classList.contains("is-open");
      const solid = window.scrollY > 40;
      nav.classList.toggle("is-solid", solid && !menuOpen);
      nav.classList.toggle("is-dark", !solid || menuOpen);
    };
    window.addEventListener("scroll", setNavTheme, { passive: true });
    setNavTheme();

    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menu.setAttribute("aria-hidden", String(!open));
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
      setNavTheme();
    });
    $$(".mobile-menu__links a, .mobile-menu__cta").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open"); nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        setNavTheme();
      })
    );
  }

  /* ---------------- Hero video ---------------- */
  function initHeroVideo() {
    const v = $("#heroVideo");
    if (!v) return;
    if (reduceMotion) {
      // honor reduced-motion: hold a static frame instead of playing/looping
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* ---------------- Reveals ---------------- */
  function initReveals() {
    if (reduceMotion) { $$(".reveal").forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach((el) => { if (!el.closest("#hero")) io.observe(el); });
  }

  /* ---------------- Process line ---------------- */
  function initProcessLine() {
    const fill = $("#processLineFill");
    const track = $("#processTrack");
    if (!fill || !track) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { fill.style.width = "100%"; io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(track);
  }

  /* ---------------- Counters ---------------- */
  function initCounters() {
    const figs = $$(".stat__fig");
    if (reduceMotion) { figs.forEach((f) => f.textContent = (f.dataset.count || "") + (f.dataset.suffix || "")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.count, suf = el.dataset.suffix || "";
        const dur = 1600, t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    figs.forEach((f) => io.observe(f));
  }

  /* ---------------- Marquee ---------------- */
  function initMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const names = ["Tikkan", "Yalla", "Noor", "Layla", "Falcon", "Cedar", "Mirage", "Qasr", "Atlas", "Bloom"];
    const item = (n) => `<span class="marquee__logo"><span class="dot"></span>${n}</span>`;
    const set = names.map(item).join("");
    track.innerHTML = set + set; // duplicate for seamless loop
  }

  /* ---------------- Hero parallax floaters ---------------- */
  function initParallax() {
    if (state.motion === 0) return;
    const floaters = $$("#heroFloaters .floater");
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        floaters.forEach((f) => {
          const d = +f.dataset.depth || 1;
          f.style.transform = `translateY(${y * d * 0.06 * state.motion}px) rotate(${y * d * 0.02 * state.motion}deg)`;
        });
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Scroll-driven hero mosaic recompose ---------------- */
  function initMosaicDrift() {
    if (state.motion === 0) return;
    const m = $("#heroMosaic svg");
    if (!m) return;
    let raf = null;
    window.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        m.style.transform = `scale(${1 + Math.min(y, 600) / 4000}) translateY(${y * 0.04 * state.motion}px)`;
        raf = null;
      });
    }, { passive: true });
  }

  /* ---------------- Language toggle (EN / AR + RTL) ---------------- */
  function applyLang(lang) {
    const html = document.documentElement;
    const isAr = lang === "ar";
    // store english originals once
    $$("[data-ar]").forEach((el) => {
      const hasChildren = el.children.length > 0;
      // for elements with child elements (e.g. a button + arrow span), translate
      // only the first significant text node — never the whole textContent, or the
      // child's text would be folded into data-en and duplicated on revert.
      const tn = hasChildren
        ? Array.from(el.childNodes).find((n) => n.nodeType === 3 && n.textContent.trim())
        : null;
      if (!el.hasAttribute("data-en")) {
        el.setAttribute("data-en", hasChildren ? (tn ? tn.textContent : "") : el.textContent);
      }
      const next = isAr ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (!hasChildren) {
        el.textContent = next;
      } else if (tn) {
        tn.textContent = next;
      }
    });
    html.lang = isAr ? "ar" : "en";
    html.dir = isAr ? "rtl" : "ltr";
    $$(".lang-toggle__opt").forEach((o) => o.classList.toggle("is-on", o.dataset.lang === lang));
    localStorage.setItem("marq-lang", lang);
  }
  function initLang() {
    const btn = $("#langToggle");
    if (btn) btn.addEventListener("click", () => {
      const cur = document.documentElement.lang === "ar" ? "ar" : "en";
      applyLang(cur === "ar" ? "en" : "ar");
    });
    const saved = localStorage.getItem("marq-lang");
    if (saved === "ar") applyLang("ar");
  }

  /* ---------------- Tweaks bridge ---------------- */
  window.MarQ = {
    applyTweaks(t) {
      if (!t) return;
      const root = document.documentElement;
      // palette emphasis
      if (t.palette && Array.isArray(t.palette)) {
        root.style.setProperty("--plum-700", t.palette[0]);
        root.style.setProperty("--teal-700", t.palette[1]);
        root.style.setProperty("--gold-700", t.palette[2]);
        if (P) { P.COLORS.plum700 = t.palette[0]; P.COLORS.teal700 = t.palette[1]; P.COLORS.gold700 = t.palette[2]; }
      }
      // font
      if (t.displayFont) {
        const map = {
          "Montserrat": '"Montserrat", system-ui, sans-serif',
          "Archivo Black": '"Archivo Black", "Montserrat", sans-serif',
        };
        root.style.setProperty("--font-display", map[t.displayFont] || map["Montserrat"]);
      }
      if (t.keywordFont) {
        const map = {
          "Montserrat": '"Montserrat", sans-serif',
          "Archivo Black": '"Archivo Black", "Montserrat", sans-serif',
        };
        const kw = $("#hero .hero__keyword");
        const ck = $(".cta__keyword");
        const fam = map[t.keywordFont] || map["Montserrat"];
        if (kw) kw.style.fontFamily = fam;
        if (ck) ck.style.fontFamily = fam;
      }
      // motion
      if (typeof t.motion === "number") { state.motion = reduceMotion ? 0 : t.motion; }
      // hero keyword text
      if (t.heroKeyword != null) {
        const kw = $("#hero .hero__keyword");
        if (kw) {
          const period = kw.querySelector(".hero__period");
          kw.firstChild && (kw.firstChild.textContent = t.heroKeyword);
          if (period) kw.appendChild(period);
        }
      }
      // hero variant
      if (t.heroVariant && t.heroVariant !== state.hero) {
        state.hero = t.heroVariant;
        document.body.setAttribute("data-hero", t.heroVariant);
      }
      // density
      let needsRefill = false;
      if (typeof t.density === "number" && t.density !== state.density) { state.density = t.density; needsRefill = true; }
      if (t.heroVariant) needsRefill = true;
      if (t.palette) needsRefill = true;
      if (needsRefill) fillPatterns();
    },
    refill: fillPatterns,
  };

  /* ---------------- Boot ---------------- */
  function boot() {
    fillPatterns();
    initNav();
    initHeroVideo();
    initReveals();
    initProcessLine();
    initCounters();
    initMarquee();
    initParallax();
    initMosaicDrift();
    initLang();
    runPreloader();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
