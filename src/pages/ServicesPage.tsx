import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { fadeUp, fadeUpSm, stagger, staggerFast, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import FinalCta from '../components/FinalCta';

export default function ServicesPage() {
  const { lang } = useLang();
  const sp = CONTENT[lang].servicesPage;
  const services = CONTENT[lang].services.items;

  return (
    <>
      {/* page hero */}
      <section className="bg-brand-plum-900 text-white pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-6xl mx-auto">
          <motion.span variants={fadeUpSm} className="block text-[10px] uppercase tracking-[0.3em] tracky font-bold text-brand-gold mb-6">
            {sp.kicker}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="display font-display font-black uppercase italic tracking-tighter leading-[0.85] text-[15vw] sm:text-7xl md:text-[8rem]"
          >
            {sp.head[0]} <span className="text-brand-teal">{sp.head[1]}</span>
            <span className="text-brand-gold">.</span>
          </motion.h1>
          <motion.p variants={fadeUpSm} className="mt-8 text-lg md:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed">
            {sp.intro}
          </motion.p>
        </motion.div>
      </section>

      {/* service detail list */}
      <section className="bg-brand-plum text-white py-20 md:py-28 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 border-t border-white/15"
            >
              <motion.div variants={fadeUpSm} className="md:col-span-1">
                <span className="text-2xl md:text-3xl font-black font-display text-brand-teal">{s.num}</span>
              </motion.div>
              <div className="md:col-span-5">
                <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-3 font-display">
                  {s.title}
                </motion.h2>
                <motion.p variants={fadeUpSm} className="text-sm md:text-base text-white/65 leading-relaxed max-w-sm">
                  {s.desc}
                </motion.p>
              </div>
              <motion.div variants={fadeUpSm} className="md:col-span-6">
                <span className="block text-[10px] uppercase tracking-[0.2em] tracky font-bold text-brand-gold mb-4">{sp.deliverablesLabel}</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {sp.items[i].deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-white/80">
                      <Check size={16} className="text-brand-teal mt-0.5 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
