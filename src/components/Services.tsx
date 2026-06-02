import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Services() {
  const { lang } = useLang();
  const c = CONTENT[lang].services;

  return (
    <section id="services" className="bg-brand-teal text-brand-plum py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-start">
        <div className="lg:w-1/3 lg:sticky lg:top-28 w-full">
          <div className="flex items-center gap-4 mb-3 text-brand-plum">
            <div className="text-3xl md:text-5xl font-black opacity-80 font-display">{c.index}</div>
            <div className="text-[9px] uppercase tracking-widest tracky leading-tight font-bold">{c.kicker[0]} <br /> {c.kicker[1]}</div>
          </div>
          <h2 className="display text-[13vw] sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic mt-2 font-display">
            {c.head[0]} <br /> <span className="text-white mix-blend-overlay">{c.head[1]}</span>
          </h2>
          <p className="mt-6 md:mt-8 text-sm leading-relaxed opacity-90 border-s-2 ps-4 border-brand-plum max-w-sm font-medium">
            {c.intro}
          </p>
        </div>

        <div className="lg:w-2/3 w-full flex flex-col pt-4 lg:pt-0">
          {c.items.map((s, i) => (
            <motion.a
              key={s.num}
              href="#work"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group border-b border-brand-plum/20 py-8 md:py-12 flex items-center justify-between hover:border-brand-plum transition-colors"
            >
              <div className="flex items-baseline gap-5 md:gap-10 pe-4">
                <span className="text-xs sm:text-sm font-black text-brand-plum/40 group-hover:text-brand-plum transition-colors font-display">{s.num}</span>
                <h3 className="display text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 font-display">
                  {s.title}
                </h3>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-plum/40 flex items-center justify-center group-hover:border-brand-plum group-hover:bg-brand-plum group-hover:text-brand-teal transition-all duration-300 shrink-0">
                <ArrowUpRight size={26} className="rtl:-scale-x-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
