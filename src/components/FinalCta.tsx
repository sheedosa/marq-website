import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, fadeUpSm, stagger, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function FinalCta() {
  const { lang } = useLang();
  const c = CONTENT[lang].finalCta;

  return (
    <section id="start" className="bg-brand-plum-900 text-white py-28 md:py-44 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
      {/* subtle centred glow */}
      <div
        className="absolute inset-0 -z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,40,124,0.45) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.span variants={fadeUpSm} className="block text-[9px] uppercase tracking-[0.3em] tracky font-bold text-brand-teal mb-8">
          {c.kicker}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="display font-display font-black uppercase italic tracking-tighter leading-[0.85] text-[13vw] sm:text-7xl md:text-[8rem] mb-8 md:mb-10"
        >
          {c.head[0]}
          <br />
          <span className="text-brand-gold">{c.head[1]}</span>
        </motion.h2>

        <motion.p variants={fadeUpSm} className="text-base md:text-xl text-white/70 mb-12 max-w-xl mx-auto font-medium">
          {c.sub}
        </motion.p>

        <motion.div variants={fadeUpSm}>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] tracky font-bold bg-brand-gold text-brand-plum rounded-full px-9 py-4 hover:bg-white transition-colors duration-300"
          >
            {c.button}
            <ArrowUpRight size={18} className="rtl:-scale-x-100 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
