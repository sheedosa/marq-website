import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Services() {
  const { lang } = useLang();
  const c = CONTENT[lang].services;

  return (
    <section id="services" className="bg-brand-teal text-brand-plum py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 justify-between items-start">
        {/* sticky sidebar */}
        <div className="lg:w-[38%] lg:sticky lg:top-28 w-full">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl md:text-6xl font-black opacity-70 font-display">{c.index}</span>
            <span className="text-[9px] uppercase tracking-[0.2em] tracky leading-tight font-bold">{c.kicker}</span>
          </div>
          <h2 className="display text-[14vw] sm:text-7xl md:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.82] italic font-display">
            {c.head[0]}<br /><span className="text-white/80">{c.head[1]}</span>
          </h2>
          <p className="mt-8 text-sm leading-relaxed opacity-85 border-s-2 ps-4 border-brand-plum max-w-sm font-medium">
            {c.intro}
          </p>
        </div>

        {/* service list */}
        <div className="lg:w-[58%] w-full flex flex-col">
          {c.items.map((s, i) => (
            <motion.a
              key={s.num}
              href="#work"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group border-b border-brand-plum/15 last:border-b-0 py-7 md:py-10 flex items-start justify-between gap-4 hover:border-brand-plum/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-xs font-black text-brand-plum/30 group-hover:text-brand-plum/60 transition-colors font-display shrink-0">{s.num}</span>
                  <div className="min-w-0">
                    <h3 className="display text-2xl sm:text-3xl md:text-5xl font-black uppercase italic tracking-tighter group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 font-display truncate">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-plum/60 mt-2 leading-relaxed max-w-sm group-hover:text-brand-plum/80 transition-colors">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-brand-plum/25 flex items-center justify-center group-hover:border-brand-plum group-hover:bg-brand-plum group-hover:text-brand-teal transition-all duration-300 shrink-0 mt-1">
                <ArrowUpRight size={22} className="rtl:-scale-x-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
