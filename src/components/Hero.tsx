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
    // force muted as a DOM property (React's muted attr can be silently dropped → blocks autoplay)
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;

    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };

    // play immediately + on every readiness event
    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('canplay', tryPlay, { once: true });

    // fallback: first user interaction kicks it off (some browsers block even muted autoplay)
    const kick = () => tryPlay();
    window.addEventListener('pointerdown', kick, { once: true });
    window.addEventListener('scroll', kick, { once: true, passive: true });
    window.addEventListener('keydown', kick, { once: true });

    // if the tab was backgrounded and the video paused, resume on focus
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
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* full-bleed hero video — z-0, content sits above at z-10 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
        </video>
      </div>

      {/* vertical rail */}
      <div className="absolute end-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-10 py-12 px-6 border-s border-brand-teal/20 z-10 bg-brand-plum/60 backdrop-blur-sm rounded-s-xl">
        <div className="rotate-90 origin-center whitespace-nowrap text-[10px] tracking-[0.4em] tracky uppercase font-bold opacity-50">{c.tagB}</div>
        <div className="w-px h-24 bg-gradient-to-b from-brand-teal to-transparent opacity-60" />
        <div className="flex flex-col gap-4">
          <div className="w-2 h-2 rounded-full bg-brand-gold" />
          <div className="w-2 h-2 rounded-full border border-white/30" />
          <div className="w-2 h-2 rounded-full border border-white/30" />
        </div>
      </div>

      {/* content — individual inline backdrops per element so video shows through the gaps */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] tracky py-1.5 px-3 bg-brand-plum/70 backdrop-blur-sm rounded-md border border-brand-gold/50 text-brand-gold font-bold">{c.tagA}</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] tracky py-1.5 px-3 bg-brand-plum/50 backdrop-blur-sm rounded-md text-white/70 font-bold">{c.tagB}</span>
        </motion.div>

        {/* headline — each line gets its own inline backdrop */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="display text-[15vw] sm:text-7xl md:text-8xl lg:text-[140px] xl:text-[150px] leading-[0.85] font-black tracking-tighter italic uppercase font-display flex flex-col items-start gap-2"
        >
          <span className="inline-block bg-brand-plum/70 backdrop-blur-sm rounded-lg px-4 py-1">{c.head[0]}</span>
          <span className="inline-block bg-brand-plum/70 backdrop-blur-sm rounded-lg px-4 py-1 ms-[6%]">{c.head[1]}</span>
          <span className="inline-block bg-brand-plum/70 backdrop-blur-sm rounded-lg px-4 py-1 ms-[12%] text-brand-teal">{c.head[2]}<span className="text-brand-gold">.</span></span>
        </motion.h1>

        {/* meta row — each cell gets its own backdrop */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
        >
          <p className="md:col-span-5 text-sm leading-relaxed text-white/90 border-s-2 ps-4 border-brand-teal max-w-md bg-brand-plum/65 backdrop-blur-sm rounded-lg py-3 pe-4">
            {c.sub}
          </p>

          <div className="md:col-span-3 flex flex-col gap-1 bg-brand-plum/65 backdrop-blur-sm rounded-lg px-4 py-3">
            <div className="text-[10px] uppercase tracking-widest tracky text-white/60 font-bold">{c.locLabel}</div>
            <div className="text-lg font-bold">{c.locValue}</div>
            <div className="text-[11px] font-mono opacity-70">{c.coords}</div>
          </div>

          <div className="md:col-span-4 flex flex-row justify-between md:justify-end items-end gap-6 md:gap-10">
            <div className="flex flex-col md:items-end bg-brand-plum/65 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-4xl sm:text-5xl font-black text-brand-gold font-display">{c.statNum}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] tracky font-bold w-24 md:w-auto md:text-end">{c.statLabel}</div>
            </div>
            <a href="#services" className="group w-20 h-20 md:w-28 md:h-28 rounded-full border border-brand-gold bg-brand-plum/60 backdrop-blur-sm flex items-center justify-center relative overflow-hidden shrink-0 hover:bg-brand-gold/20 transition-colors">
              <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter tracky text-center z-10">{c.scroll}</div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
