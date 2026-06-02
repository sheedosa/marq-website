/* ============================================================
   MarQ — Custom geometric line-icon set
   Thin (2px) rounded strokes on a 24x24 grid, stroke="currentColor"
   so color follows context. At most ONE gold "spark" per icon
   (the brand accent). Social marks are simplified recognisable glyphs.
   Exposes window.MarQIcons = { init, ICONS }.
   ============================================================ */
(function () {
  var GOLD = "#C39909";

  // shared SVG shell — geometric line style
  function svg(inner) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      inner +
      "</svg>"
    );
  }
  // gold accent dot — the rare brand spark
  function spark(cx, cy, r) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r || 1.6) + '" fill="' + GOLD + '" stroke="none"/>';
  }

  var ICONS = {
    /* ---- UI ---- */
    arrow: svg('<line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19.5 12 13 18"/>'),

    /* ---- Services (6) — distinct silhouettes, gold spark on the focal point ---- */
    // Brand Strategy — concentric target + aim
    strategy: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.4"/>' + spark(12, 12, 1.7)),
    // Identity & Design — overlapping circle + triangle (marks & systems)
    identity: svg('<circle cx="9.5" cy="12.5" r="6"/><path d="M15 6 L21 18.5 L9 18.5 Z"/>' + spark(12.5, 13, 1.4)),
    // Digital — screen / viewport
    digital: svg('<rect x="3" y="5" width="18" height="13" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="15" y2="21"/>' + spark(5.6, 7, 1)),
    // Communication — speech bubble with message lines
    communication: svg('<path d="M5 4 H19 a3 3 0 0 1 3 3 V13 a3 3 0 0 1 -3 3 H10 l-4 4 v-4 H5 a3 3 0 0 1 -3 -3 V7 a3 3 0 0 1 3 -3 Z"/><line x1="7.5" y1="8.5" x2="16.5" y2="8.5"/><line x1="7.5" y1="12" x2="13" y2="12"/>' + spark(15.4, 12, 1)),
    // Production — stacked sheets / layers
    production: svg('<rect x="8" y="3.5" width="11.5" height="11.5" rx="2"/><rect x="4.5" y="9" width="11.5" height="11.5" rx="2"/>' + spark(16, 9, 1.3)),
    // Brand Care (retainer) — shield + cradle arc
    care: svg('<path d="M12 3 L20 6 V12 C20 17 16.5 19.8 12 21 C7.5 19.8 4 17 4 12 V6 Z"/><path d="M8.8 12.5 A3.2 3.2 0 0 0 15.2 12.5"/>' + spark(12, 6.4, 1.4)),

    /* ---- Process (4) ---- */
    discover: svg('<circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/>' + spark(10, 10, 1.5)),
    define: svg('<path d="M4 8 V4 H8"/><path d="M16 4 H20 V8"/><path d="M20 16 V20 H16"/><path d="M8 20 H4 V16"/>' + spark(12, 12, 1.7)),
    design: svg('<path d="M12 6 L7 19"/><path d="M12 6 L17 19"/><line x1="9.4" y1="13" x2="14.6" y2="13"/>' + spark(12, 5, 1.5)),
    deliver: svg('<path d="M22 3 L2 10.5 L10 13.5 L13 21 Z"/><line x1="10" y1="13.5" x2="22" y2="3"/>' + spark(22, 3, 1.3)),

    /* ---- Contact (2) — no gold, keep the spark rare ---- */
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3.5 7 12 13 20.5 7"/>'),
    phone: svg('<path d="M5 4 H9 L11 9 L8.5 11 A11 11 0 0 0 13 15.5 L15 13 L20 15 V19 A2 2 0 0 1 18 21 A16 16 0 0 1 3 6 A2 2 0 0 1 5 4 Z"/>'),

    /* ---- Social — simplified recognisable marks ---- */
    instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.3"/>' + spark(16.6, 7.4, 1.4)),
    linkedin: svg('<rect x="3" y="3" width="18" height="18" rx="4"/><line x1="7.5" y1="10.5" x2="7.5" y2="16.5"/><circle cx="7.5" cy="7.8" r="0.6" fill="currentColor" stroke="none"/><path d="M11 16.5 V10.8 M11 13.2 a2.6 2.6 0 0 1 5.2 0 V16.5"/>'),
    behance: svg('<path d="M3 7 H7.8 a2.4 2.4 0 0 1 0 4.8 H3 Z"/><path d="M3 11.8 H8.4 a2.6 2.6 0 0 1 0 5.2 H3 Z"/><line x1="15" y1="8.5" x2="21" y2="8.5"/><path d="M14 15 a3.4 3.4 0 1 1 3.4 3.4 H14 Z"/>'),
  };

  function init(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-ico]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.getAttribute("data-ico-done") === "1") continue;
      var markup = ICONS[el.getAttribute("data-ico")];
      if (!markup) continue;
      el.innerHTML = markup;          // replaces any text fallback (e.g. the "→")
      el.setAttribute("data-ico-done", "1");
    }
  }

  window.MarQIcons = { init: init, ICONS: ICONS };
})();
