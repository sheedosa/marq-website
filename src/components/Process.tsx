import { motion } from 'motion/react';
import { fadeUp, staggerFast, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import SectionHeading from './SectionHeading';

export default function Process() {
  const { lang } = useLang();
  const c = CONTENT[lang].process;

  return (
    <section id="process" className="bg-brand-plum-900 text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index={c.index}
          kicker={c.kicker}
          head={c.head}
          intro={c.intro}
          accent="teal"
          className="mb-16 md:mb-24 max-w-3xl"
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
        >
          {/* connecting line — horizontal on desktop, vertical timeline on mobile; sits behind the nodes */}
          <div className="hidden md:block absolute top-8 inset-x-0 h-px bg-white/15" aria-hidden="true" />
          <div className="md:hidden absolute top-8 bottom-8 start-8 w-px bg-white/15" aria-hidden="true" />

          {c.steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp} className="relative">
              <div className="w-16 h-16 rounded-full bg-brand-plum-900 border-2 border-brand-teal flex items-center justify-center font-display font-black text-brand-teal text-xl relative z-10 mb-6">
                {s.num}
              </div>
              <h3 className="display text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-3 font-display">
                {s.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
