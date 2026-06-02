import { motion } from 'motion/react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Work() {
  const { lang } = useLang();
  const c = CONTENT[lang].work;

  return (
    <section id="work" className="bg-brand-plum py-24 md:py-40 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between mb-16 md:mb-24 gap-8">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-3xl md:text-5xl font-black text-brand-teal font-display">{c.index}</div>
              <div className="text-[9px] uppercase tracking-widest tracky leading-tight font-bold text-white/50">{c.kicker[0]} <br /> {c.kicker[1]}</div>
            </div>
            <h2 className="display text-[14vw] sm:text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] italic text-white mt-4 font-display">
              {c.head[0]}<br /><span className="text-brand-gold ms-8 md:ms-24">{c.head[1]}</span>
            </h2>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="shrink-0 text-[10px] uppercase tracking-widest tracky text-brand-gold hover:text-white transition-colors border-b border-brand-gold/40 pb-1 font-bold hover:border-white"
          >
            {c.viewAll}
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {c.items.map((p, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.15 }}
              className={`group ${i % 2 === 1 ? 'md:mt-28' : ''}`}
            >
              <div className="aspect-[4/5] bg-brand-plum-light overflow-hidden relative">
                {/* placeholder art (swap for real imagery) */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-plum-light to-brand-plum-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black italic text-[34vw] md:text-[14rem] leading-none text-white/5 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/15 transition-colors duration-500" />
                <div className="absolute bottom-4 start-4 text-[9px] uppercase tracking-[0.2em] tracky font-bold text-white/60">{p.year}</div>
              </div>
              <div className="mt-7 flex justify-between items-start gap-4">
                <div>
                  <h3 className="display text-3xl lg:text-4xl font-black uppercase italic tracking-tighter text-white group-hover:text-brand-teal transition-colors font-display">{p.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest tracky font-bold text-brand-gold mt-2">{p.cat}</p>
                </div>
                <span className="text-white/40 text-[10px] font-bold tracking-widest mt-2">{p.year}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
