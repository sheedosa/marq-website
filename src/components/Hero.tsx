import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Hero() {
  const { lang } = useLang();
  const c = CONTENT[lang].hero;
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* full-bleed video + plum wash */}
      <div className="absolute inset-0 -z-10">
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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-plum-900/95 via-brand-plum/85 to-brand-plum/55" />
        <div className="absolute inset-0 bg-brand-plum/30" />
      </div>

      {/* vertical rail */}
      <div className="absolute end-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-10 py-12 px-6 border-s border-brand-teal/20">
        <div className="rotate-90 origin-center whitespace-nowrap text-[10px] tracking-[0.4em] tracky uppercase font-bold opacity-50">{c.tagB}</div>
        <div className="w-px h-24 bg-gradient-to-b from-brand-teal to-transparent opacity-60" />
        <div className="flex flex-col gap-4">
          <div className="w-2 h-2 rounded-full bg-brand-gold" />
          <div className="w-2 h-2 rounded-full border border-white/30" />
          <div className="w-2 h-2 rounded-full border border-white/30" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] tracky py-1 px-2 border border-brand-gold/50 text-brand-gold font-bold">{c.tagA}</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] tracky py-1 px-2 text-white/50 font-bold">{c.tagB}</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="display text-[15vw] sm:text-7xl md:text-8xl lg:text-[140px] xl:text-[150px] leading-[0.85] font-black tracking-tighter italic uppercase font-display"
        >
          <span className="block">{c.head[0]}</span>
          <span className="block ms-[6%]">{c.head[1]}</span>
          <span className="block ms-[12%] text-brand-teal">{c.head[2]}<span className="text-brand-gold">.</span></span>
        </motion.h1>

        {/* meta row */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
        >
          <p className="md:col-span-5 text-sm leading-relaxed text-white/80 border-s-2 ps-4 border-brand-teal max-w-md">
            {c.sub}
          </p>

          <div className="md:col-span-3 flex flex-col gap-1">
            <div className="text-[10px] uppercase tracking-widest tracky text-white/50 font-bold">{c.locLabel}</div>
            <div className="text-lg font-bold">{c.locValue}</div>
            <div className="text-[11px] font-mono opacity-60">{c.coords}</div>
          </div>

          <div className="md:col-span-4 flex flex-row justify-between md:justify-end items-end gap-8 md:gap-12">
            <div className="flex flex-col md:items-end">
              <div className="text-4xl sm:text-5xl font-black text-brand-gold font-display">{c.statNum}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] tracky font-bold w-24 md:w-auto md:text-end">{c.statLabel}</div>
            </div>
            <a href="#services" className="group w-20 h-20 md:w-28 md:h-28 rounded-full border border-brand-gold flex items-center justify-center relative overflow-hidden shrink-0 hover:bg-brand-gold/10 transition-colors">
              <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter tracky text-center z-10">{c.scroll}</div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
