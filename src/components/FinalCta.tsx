import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, fadeUpSm, stagger, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

type Props = { tone?: 'dark' | 'gold' };

export default function FinalCta({ tone = 'dark' }: Props) {
  const { lang } = useLang();
  const c = CONTENT[lang].finalCta;
  const gold = tone === 'gold';

  return (
    <section
      id="start"
      className={`py-28 md:py-44 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden ${
        gold ? 'bg-brand-gold text-brand-plum' : 'bg-brand-plum-900 text-white'
      }`}
    >
      {/* subtle centred glow (dark tone only) */}
      {!gold && (
        <div
          className="absolute inset-0 -z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,40,124,0.45) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
      )}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.span
          variants={fadeUpSm}
          className={`block text-[9px] uppercase tracking-[0.3em] tracky font-bold mb-8 ${gold ? 'text-brand-plum/70' : 'text-brand-teal'}`}
        >
          {c.kicker}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="display font-display font-black uppercase italic tracking-tighter leading-[0.85] text-[13vw] sm:text-7xl md:text-[8rem] mb-8 md:mb-10"
        >
          {c.head[0]}
          <br />
          <span className={gold ? 'text-white' : 'text-brand-gold'}>{c.head[1]}</span>
        </motion.h2>

        <motion.p variants={fadeUpSm} className={`text-base md:text-xl mb-12 max-w-xl mx-auto font-medium ${gold ? 'text-brand-plum/80' : 'text-white/70'}`}>
          {c.sub}
        </motion.p>

        <motion.div variants={fadeUpSm}>
          <Link
            to="/contact"
            className={`group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] tracky font-bold rounded-full px-9 py-4 transition-colors duration-300 ${
              gold ? 'bg-brand-plum text-white hover:bg-brand-plum-900' : 'bg-brand-gold text-brand-plum hover:bg-white'
            }`}
          >
            {c.button}
            <ArrowUpRight size={18} className="rtl:-scale-x-100 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
