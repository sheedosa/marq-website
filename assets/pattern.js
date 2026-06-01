/* ============================================================
   MarQ — Pattern system
   The reusable geometric atom + composers (strip / mosaic / scatter).
   All tiles live on a 100x100 unit cell. Colors honor the 7:2:1
   plum : teal : gold ratio.
   Exposes window.MarQPattern
   ============================================================ */
(function () {
  const C = {
    plum900: "#3D1340",
    plum700: "#581D5A",
    plum500: "#7B4A7D",
    plum300: "#A98BAB",
    plum100: "#E7DEE8",
    teal700: "#00ABBD",
    teal500: "#4FC5D2",
    gold700: "#C39909",
    gold500: "#D4B23E",
    white:   "#FFFFFF",
    offwhite:"#FAF7FA",
    ink:     "#211B22",
  };

  // ---- shape primitives: inner markup for a 0..100 cell, given fill ----
  function shapePath(shape, fill, opts = {}) {
    const sw = opts.stroke || 15;
    switch (shape) {
      case "circle":
        return `<circle cx="50" cy="50" r="50" fill="${fill}"/>`;
      case "dot":
        return `<circle cx="50" cy="50" r="26" fill="${fill}"/>`;
      case "ring":
        return `<circle cx="50" cy="50" r="${50 - sw / 2}" fill="none" stroke="${fill}" stroke-width="${sw}"/>`;
      case "semi":
        // dome rising from the bottom edge
        return `<path d="M0,100 A50,50 0 0 1 100,100 Z" fill="${fill}"/>`;
      case "quarter":
        // quarter disk, right angle at top-left corner
        return `<path d="M0,0 L100,0 A100,100 0 0 1 0,100 Z" fill="${fill}"/>`;
      case "quarter-ring":
        return `<path d="M${sw},${sw} L100,${sw} M${sw},${sw} L${sw},100" fill="none"/><path d="M0,0 L100,0 A100,100 0 0 1 0,100 L0,0 Z M${sw},${sw} L${sw},${88} A${100 - sw},${100 - sw} 0 0 0 ${88},${sw} Z" fill="${fill}" fill-rule="evenodd"/>`;
      case "triangle":
        // right triangle, right angle at bottom-left
        return `<path d="M0,0 L0,100 L100,100 Z" fill="${fill}"/>`;
      case "leaf":
        // two opposing quarter arcs (eye / vesica)
        return `<path d="M0,100 A100,100 0 0 1 100,0 A100,100 0 0 1 0,100 Z" fill="${fill}"/>`;
      case "bar":
        return `<rect x="0" y="36" width="100" height="28" fill="${fill}"/>`;
      case "M": {
        // brand M-tile: solid block with a triangular notch cut from the top centre
        return `<path d="M0,0 L37,0 L50,31 L63,0 L100,0 L100,100 L0,100 Z" fill="${fill}"/>`;
      }
      case "Q": {
        // brand Q-tile: solid disc with a small triangular tail toward bottom-right
        return `<circle cx="46" cy="46" r="44" fill="${fill}"/>` +
               `<path d="M64,64 L99,99 L60,90 Z" fill="${fill}"/>`;
      }
      default:
        return "";
    }
  }

  // weighted color pick honoring 7:2:1 (plum:teal:gold)
  function pickColor(rng, mode = "vivid") {
    const r = rng();
    if (mode === "vivid") {
      if (r < 0.70) return rng() < 0.5 ? C.plum700 : (rng() < 0.5 ? C.plum900 : C.plum500);
      if (r < 0.90) return C.teal700;
      return C.gold700;
    }
    if (mode === "soft") {
      if (r < 0.70) return rng() < 0.5 ? C.plum300 : C.plum100;
      if (r < 0.90) return C.teal300 || C.teal500;
      return C.gold300 || C.gold500;
    }
    // mono (single-tone, for scatter texture)
    return mode;
  }

  function contrastFor(bg) {
    // choose a foreground that reads against bg
    if (bg === C.plum700 || bg === C.plum900 || bg === C.plum500) {
      const opts = [C.teal700, C.gold700, C.offwhite, C.plum100];
      return opts;
    }
    if (bg === C.teal700) return [C.plum900, C.gold700, C.white];
    if (bg === C.gold700) return [C.plum900, C.white, C.teal700];
    return [C.plum700, C.teal700, C.gold700];
  }

  // seeded RNG (mulberry32)
  function rngFrom(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const SHAPES = ["circle", "semi", "quarter", "triangle", "dot", "ring", "leaf", "M", "Q", "bar"];

  // ---- single tile (full svg) ----
  function tile(shape, { fg, bg, rot = 0, sheen = false, size = 100 } = {}) {
    fg = fg || C.gold700; bg = bg || "transparent";
    const inner = shapePath(shape, fg);
    const defs = sheen ? sheenDefs("s" + Math.random().toString(36).slice(2, 7)) : "";
    const sheenRect = "";
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${defs}<rect width="100" height="100" fill="${bg}"/><g transform="rotate(${rot} 50 50)">${inner}</g>${sheenRect}</svg>`;
  }

  function sheenDefs(id) {
    return `<defs><radialGradient id="${id}" cx="36%" cy="30%" r="75%"><stop offset="0%" stop-color="rgba(255,255,255,.55)"/><stop offset="42%" stop-color="rgba(255,255,255,.08)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>`;
  }

  /* ---- mosaic: cols x rows grid of cells. options:
       seed, mode ('vivid'|'soft'), fillRatio (chance a cell has a shape),
       bgChance (chance a cell has a solid color block vs canvas),
       sheenCount (number of glossy focal tiles),
       glyphs (allow M/Q glyph tiles) ---- */
  function mosaic(cols, rows, opts = {}) {
    const {
      seed = 7,
      mode = "vivid",
      fillRatio = 0.72,
      bgChance = 0.66,
      sheenCount = 1,
      glyphs = false,
      gap = 0,
      radius = 0,
      canvas = "transparent",
    } = opts;
    const rng = rngFrom(seed);
    const W = cols * 100, H = rows * 100;
    const cells = [];
    const sheenIds = [];
    let placedSheen = 0;
    const total = cols * rows;
    const sheenSlots = new Set();
    while (sheenSlots.size < Math.min(sheenCount, total)) {
      sheenSlots.add(Math.floor(rng() * total));
    }

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++, idx++) {
        const x = c * 100, y = r * 100;
        const hasBg = rng() < bgChance;
        const bg = hasBg ? pickColor(rng, mode) : canvas;
        let cell = `<rect x="${x + gap / 2}" y="${y + gap / 2}" width="${100 - gap}" height="${100 - gap}" rx="${radius}" fill="${bg}"/>`;
        // shape?
        if (rng() < fillRatio) {
          let pool = SHAPES.slice(0, glyphs ? SHAPES.length : 8); // exclude M/Q unless glyphs
          // bias away from bar so it's rarer
          const shape = pool[Math.floor(rng() * pool.length)];
          const fgOpts = hasBg ? contrastFor(bg) : [pickColor(rng, mode)];
          const fg = fgOpts[Math.floor(rng() * fgOpts.length)];
          const rot = 90 * Math.floor(rng() * 4);
          let inner = shapePath(shape, fg);
          let sheenMarkup = "";
          if (sheenSlots.has(idx) && placedSheen < sheenCount) {
            const id = "sh" + seed + "_" + idx;
            sheenIds.push(sheenDefs(id));
            sheenMarkup = `<rect width="100" height="100" fill="url(#${id})"/>`;
            placedSheen++;
          }
          cell += `<g transform="translate(${x},${y})"><g transform="rotate(${rot} 50 50)">${inner}</g>${sheenMarkup}</g>`;
        }
        cells.push(cell);
      }
    }
    return `<svg class="mq-mosaic" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">${sheenIds.join("")}${cells.join("")}</svg>`;
  }

  /* ---- horizontal strip: 1 row, used as dividers and edges ---- */
  function strip(cols, opts = {}) {
    return mosaic(cols, 1, Object.assign({ fillRatio: 0.85, bgChance: 0.8, sheenCount: 0 }, opts));
  }

  /* ---- scatter: low-contrast sparse texture, transparent bg ---- */
  function scatter(cols, rows, opts = {}) {
    return mosaic(cols, rows, Object.assign({
      bgChance: 0,
      fillRatio: 0.34,
      mode: opts.tone || "soft",
      sheenCount: 0,
    }, opts));
  }

  window.MarQPattern = { tile, mosaic, strip, scatter, shapePath, COLORS: C, SHAPES, rngFrom };
})();
