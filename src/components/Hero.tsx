import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Hero() {
  const { lang } = useLang();
  const c = CONTENT[lang].hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('canplay', tryPlay, { once: true });
    const kick = () => tryPlay();
    window.addEventListener('pointerdown', kick, { once: true });
    window.addEventListener('scroll', kick, { once: true, passive: true });
    window.addEventListener('keydown', kick, { once: true });
    const onVis = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('keydown', kick);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <>
      {/* ═══ CINEMATIC HERO — full-screen video + headline only ═══ */}
      <section
        id="top"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* full-bleed video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline preload="auto"
          >
            <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
          </video>
          {/* very subtle vignette so the edges read against the video — NOT an overlay wash */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 120px 60px rgba(61,19,64,0.45)' }}
          />
        </div>

        {/* headline — centred, massive, cinematic */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="display font-display font-black italic uppercase tracking-tighter leading-[0.85] text-[16vw] sm:text-8xl md:text-9xl lg:text-[180px] xl:text-[210px] text-white hero-legible">
            {c.head[0]}{' '}
            <span className="text-brand-teal">{c.head[2]}</span>
            <span className="text-brand-gold">.</span>
          </h1>
          <p className="mt-4 md:mt-6 text-xs sm:text-sm uppercase tracking-[0.25em] tracky font-bold text-white/60 hero-legible">
            {c.tagA} — {c.tagB}
          </p>
        </motion.div>

        {/* scroll hint at the bottom */}
        <motion.a
          href="#info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] tracky font-bold">{c.scroll}</span>
          <span className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.a>
      </section>

      {/* ═══ INFO BAR — compact strip below the cinematic hero ═══ */}
      <section
        id="info"
        className="relative z-20 bg-brand-plum-900 border-t border-white/10 py-8 md:py-10 px-6 md:px-12 lg:px-24"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
        >
          {/* sub-copy */}
          <p className="md:col-span-5 text-sm leading-relaxed text-white/80 border-s-2 ps-4 border-brand-teal max-w-md">
            {c.sub}
          </p>

          {/* location */}
          <div className="md:col-span-3 flex flex-col gap-0.5">
            <div className="text-[10px] uppercase tracking-widest tracky text-white/40 font-bold">{c.locLabel}</div>
            <div className="text-base font-bold">{c.locValue}</div>
            <div className="text-[10px] font-mono text-white/50">{c.coords}</div>
          </div>

          {/* stat + CTA */}
          <div className="md:col-span-4 flex flex-row items-center justify-between md:justify-end gap-8 md:gap-12">
            <div className="flex flex-col md:items-end">
              <div className="text-3xl sm:text-4xl font-black text-brand-gold font-display">{c.statNum}</div>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] tracky font-bold text-white/60 md:text-end">{c.statLabel}</div>
            </div>
            <a
              href="#services"
              className="group shrink-0 text-[10px] uppercase tracking-[0.15em] tracky font-bold text-brand-gold border border-brand-gold/40 rounded-full px-6 py-3 hover:bg-brand-gold hover:text-brand-plum transition-colors"
            >
              {lang === 'ar' ? 'خدماتنا' : 'Explore'}
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
