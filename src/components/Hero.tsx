import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import { fadeUpSm, stagger, viewport, EASE } from '../motion';

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
    const tryPlay = () => { v.play().catch(() => {}); };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('canplay', tryPlay, { once: true });
    const kick = () => tryPlay();
    window.addEventListener('pointerdown', kick, { once: true });
    window.addEventListener('scroll', kick, { once: true, passive: true });
    const onVis = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('scroll', kick);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <>
      {/* ═══ CINEMATIC HERO ═══ */}
      <section id="top" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* video bg */}
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
            <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
          </video>
          {/* inset vignette frame */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 140px 80px rgba(61,19,64,0.5)' }} />
          {/* seamless layered scrim: strong centre darkening behind the headline (no box seam) +
             grounding top/bottom fades — keeps the video visible at the edges while the type pops */}
          <div className="absolute inset-0 z-[5] pointer-events-none" style={{
            background: 'radial-gradient(ellipse 72% 68% at 50% 44%, rgba(61,19,64,0.9) 0%, rgba(61,19,64,0.58) 40%, rgba(61,19,64,0.2) 72%, transparent 100%), linear-gradient(to top, rgba(61,19,64,0.72) 0%, transparent 42%), linear-gradient(to bottom, rgba(61,19,64,0.5) 0%, transparent 26%)',
          }} />
        </div>

        {/* centred headline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } } }}
          className="relative z-10 text-center px-6 max-w-6xl"
        >
          {/* framed eyebrow — hidden on mobile so the headline owns the screen */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="hidden sm:flex items-center justify-center gap-3 sm:gap-4 mb-6 md:mb-8"
          >
            <span className="h-px w-6 sm:w-10 bg-brand-gold/60" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.35em] tracky font-bold text-brand-gold drop-shadow-[0_2px_8px_rgba(61,19,64,0.6)] whitespace-nowrap">
              {c.tagA} · {c.tagB}
            </span>
            <span className="h-px w-6 sm:w-10 bg-brand-gold/60" />
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}
            className="display font-display font-black italic uppercase tracking-tighter leading-[0.82] text-[clamp(4.25rem,20vw,7rem)] sm:text-[clamp(3.5rem,15vw,13rem)] text-white drop-shadow-[0_6px_50px_rgba(61,19,64,0.8)]"
          >
            {/* multi-word first line stacks one-per-line on mobile, joins on sm+ */}
            {c.head[0].split(' ').map((w, i) => (
              <span key={i}>
                {i > 0 && <br className="sm:hidden" />}
                {i > 0 ? ' ' : ''}
                {w}
              </span>
            ))}
            <br />
            <span className="text-brand-teal drop-shadow-[0_4px_30px_rgba(0,171,189,0.35)]">{c.head[1]}</span>
            <span className="text-brand-gold">.</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="mt-5 md:mt-7 text-sm sm:text-base font-medium text-white/80 drop-shadow-[0_2px_10px_rgba(61,19,64,0.7)]"
          >
            {c.lead}
          </motion.p>
        </motion.div>

        {/* scroll indicator */}
        <motion.a
          href="#info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
          aria-label={c.scroll}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] tracky font-bold">{c.scroll}</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.a>
      </section>

      {/* ═══ INFO BAR ═══ */}
      <section id="info" className="relative z-20 bg-brand-plum-900 border-y border-white/8 py-8 md:py-10 px-6 md:px-12 lg:px-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          <motion.p variants={fadeUpSm} className="col-span-2 lg:col-span-5 text-sm leading-relaxed text-white/75 border-s-2 ps-4 border-brand-teal max-w-lg">
            {c.sub}
          </motion.p>

          <motion.div variants={fadeUpSm} className="col-span-1 lg:col-span-3 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-[0.2em] tracky text-white/55 font-bold">{c.locLabel}</span>
            <span className="text-base font-bold text-white">{c.locValue}</span>
            <span dir="ltr" className="text-[10px] font-mono text-white/55 inline-block">{c.coords}</span>
          </motion.div>

          <motion.div variants={fadeUpSm} className="col-span-1 lg:col-span-2 flex flex-col">
            <span dir="ltr" className="text-3xl sm:text-4xl font-black text-brand-gold font-display leading-none">{c.statNum}</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] tracky font-bold text-white/50 mt-1">{c.statLabel}</span>
          </motion.div>

          <motion.div variants={fadeUpSm} className="col-span-2 lg:col-span-2 flex justify-start lg:justify-end">
            <a
              href="#services"
              className="text-[10px] uppercase tracking-[0.15em] tracky font-bold text-brand-gold border border-brand-gold/40 rounded-full px-7 py-3 hover:bg-brand-gold hover:text-brand-plum transition-colors duration-300"
            >
              {c.explore}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
