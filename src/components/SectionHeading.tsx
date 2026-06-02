import { motion } from 'motion/react';
import { fadeUp, fadeUpSm, stagger, viewport } from '../motion';

const ACCENT: Record<string, string> = {
  teal: 'text-brand-teal',
  gold: 'text-brand-gold',
  white: 'text-white/80',
  plum: 'text-brand-plum/70',
};

type Props = {
  index?: string;
  kicker: string;
  head: readonly [string, string];
  /** colour of the second (accent) word */
  accent?: keyof typeof ACCENT;
  intro?: string;
  /** extra classes for the outer block (e.g. alignment) */
  className?: string;
  /** override the h2 size/leading if a section wants something bigger/smaller */
  headingClassName?: string;
};

/**
 * Shared section heading: index number + kicker + big two-line display headline,
 * with a staggered reveal. Used across home sections and pages for a consistent
 * editorial rhythm. Inherits text colour from the parent section.
 */
export default function SectionHeading({
  index,
  kicker,
  head,
  accent = 'teal',
  intro,
  className = '',
  headingClassName = 'text-[12vw] sm:text-6xl md:text-[5.5rem]',
}: Props) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className={className}>
      <motion.div variants={fadeUpSm} className="flex items-center gap-4 mb-4">
        {index && <span className="text-4xl md:text-6xl font-black opacity-50 font-display leading-none">{index}</span>}
        <span className="text-[10px] uppercase tracking-[0.2em] tracky leading-tight font-bold opacity-80">{kicker}</span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className={`display font-display font-black uppercase italic tracking-tighter leading-[0.85] ${headingClassName}`}
      >
        {head[0]}
        <br />
        <span className={ACCENT[accent]}>{head[1]}</span>
      </motion.h2>
      {intro && (
        <motion.p variants={fadeUpSm} className="mt-7 text-sm md:text-base leading-relaxed opacity-80 border-s-2 ps-4 max-w-md font-medium">
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
