import { motion } from 'motion/react';
import { fadeUp, fadeUpSm, stagger, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Why() {
  const { lang } = useLang();
  const c = CONTENT[lang].why;

  return (
    <section id="why" className="bg-brand-plum text-white py-28 md:py-44 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="max-w-6xl mx-auto">
        <motion.span variants={fadeUpSm} className="block text-[10px] uppercase tracking-[0.3em] tracky font-bold text-brand-gold mb-8">
          {c.kicker}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="display font-display font-black uppercase italic tracking-tighter leading-[0.9] text-[13vw] sm:text-7xl md:text-[7rem] mb-12 md:mb-16"
        >
          {c.head[0]} <span className="text-brand-teal">{c.head[1]}</span>
          <span className="text-brand-gold">.</span>
        </motion.h2>

        <motion.p
          variants={fadeUpSm}
          className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/70 max-w-3xl border-s-2 border-brand-teal ps-6 font-medium"
        >
          {c.body}
        </motion.p>
      </motion.div>
    </section>
  );
}
