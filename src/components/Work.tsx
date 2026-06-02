import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Work() {
  const { lang } = useLang();
  const c = CONTENT[lang].work;

  return (
    <section id="work" className="bg-brand-plum py-24 md:py-40 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl md:text-6xl font-black text-brand-teal font-display">{c.index}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] tracky leading-tight font-bold text-white/40">{c.kicker}</span>
            </div>
            <h2 className="display text-[15vw] sm:text-7xl md:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.82] italic text-white font-display">
              {c.head[0]}<br />
              <span className="text-brand-gold ms-6 md:ms-16">{c.head[1]}</span>
            </h2>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="text-[10px] uppercase tracking-[0.2em] tracky text-brand-gold hover:text-white transition-colors border-b border-brand-gold/40 pb-1 font-bold hover:border-white flex items-center gap-2"
          >
            {c.viewAll} <ArrowUpRight size={14} className="rtl:-scale-x-100" />
          </motion.a>
        </div>

        {/* project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {c.items.map((p, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.12 }}
              className={`group block ${i % 2 === 1 ? 'md:mt-20' : ''}`}
            >
              <div className="aspect-[4/5] bg-brand-plum-light overflow-hidden relative rounded-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-plum-light via-brand-plum to-brand-plum-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black italic text-[30vw] md:text-[12rem] leading-none text-white/[0.03] select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/10 transition-colors duration-500" />
                <div className="absolute bottom-5 start-5 end-5 flex justify-between items-end">
                  <span className="text-[9px] uppercase tracking-[0.2em] tracky font-bold text-white/50">{p.year}</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-brand-plum">
                    <ArrowUpRight size={18} className="rtl:-scale-x-100" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start gap-4">
                <div>
                  <h3 className="display text-2xl lg:text-3xl font-black uppercase italic tracking-tighter text-white group-hover:text-brand-teal transition-colors duration-300 font-display">
                    {p.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] tracky font-bold text-brand-gold/80 mt-1.5">{p.cat}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
