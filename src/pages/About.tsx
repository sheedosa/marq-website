import { motion } from 'motion/react';
import { fadeUp, fadeUpSm, stagger, staggerFast, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import Process from '../components/Process';

export default function About() {
  const { lang } = useLang();
  const c = CONTENT[lang].about;

  return (
    <>
      {/* page hero */}
      <section className="bg-brand-plum-900 text-white pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-6xl mx-auto">
          <motion.span variants={fadeUpSm} className="block text-[10px] uppercase tracking-[0.3em] tracky font-bold text-brand-gold mb-6">
            {c.kicker}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="display font-display font-black uppercase italic tracking-tighter leading-[0.85] text-[15vw] sm:text-7xl md:text-[8rem]"
          >
            {c.head[0]} <span className="text-brand-teal">{c.head[1]}</span>
            <span className="text-brand-gold">.</span>
          </motion.h1>
          <motion.p variants={fadeUpSm} className="mt-8 text-lg md:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed">
            {c.lead}
          </motion.p>
        </motion.div>
      </section>

      {/* story */}
      <section className="bg-brand-plum text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="max-w-4xl mx-auto flex flex-col gap-8">
          {c.story.map((p, i) => (
            <motion.p key={i} variants={fadeUp} className="text-xl md:text-3xl leading-relaxed text-white/85 font-medium">
              {p}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* values */}
      <section className="bg-brand-teal text-brand-plum py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.span
            variants={fadeUpSm}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="block text-[10px] uppercase tracking-[0.2em] tracky font-bold mb-12 md:mb-16"
          >
            {c.valuesKicker}
          </motion.span>
          <motion.div variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            {c.values.map((v, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-5 border-t-2 border-brand-plum/20 pt-6">
                <span className="text-2xl md:text-3xl font-black font-display opacity-40 leading-none shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-2 font-display">{v.title}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-brand-plum/75 max-w-md">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* how we work */}
      <Process />
    </>
  );
}
