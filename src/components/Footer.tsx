import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Footer() {
  const { lang } = useLang();
  const c = CONTENT[lang].footer;

  return (
    <footer id="studio" className="bg-brand-gold text-brand-plum py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* section index */}
        <div className="flex flex-col items-center gap-2 mb-8 md:mb-10">
          <span className="text-4xl md:text-6xl font-black text-brand-plum/40 font-display">{c.index}</span>
          <span className="text-[9px] uppercase tracking-[0.2em] tracky font-bold">{c.kicker}</span>
        </div>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="display text-[18vw] sm:text-7xl md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tighter italic leading-[0.8] mb-10 md:mb-14 font-display"
        >
          {c.head[0]}<br />
          <span className="text-white ms-10 md:ms-20">{c.head[1]}</span>
        </motion.h2>

        {/* blurb */}
        <p className="text-sm md:text-base font-medium max-w-md text-brand-plum/80 mb-12 md:mb-16 leading-relaxed border-s-2 border-brand-plum/40 ps-4 text-start mx-auto">
          {c.blurb}
        </p>

        {/* contact */}
        <div className="flex flex-col items-center gap-6">
          <a
            href={`mailto:${c.email}`}
            className="group flex items-center gap-4 md:gap-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic text-brand-plum hover:text-white transition-colors duration-300 font-display"
          >
            <span dir="ltr" className="break-all md:break-normal">{c.email}</span>
            <span className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-brand-plum/60 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-brand-plum transition-all duration-300 shrink-0">
              <ArrowUpRight size={20} className="rtl:-scale-x-100" />
            </span>
          </a>

          <a href={`tel:${c.phone.replace(/\s/g, '')}`} dir="ltr" className="text-sm font-bold tracking-widest text-brand-plum/60 hover:text-brand-plum transition-colors">
            {c.phone}
          </a>
        </div>

        {/* bottom bar */}
        <div className="w-full mt-24 md:mt-32 pt-7 border-t border-brand-plum/15 flex flex-col sm:flex-row justify-between items-center gap-5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] tracky text-brand-plum/70">
          <p>{c.copyright}</p>
          <nav className="flex gap-8" dir="ltr" aria-label="Social links">
            {c.socials.map((s) => (
              <a key={s} href="#" className="hover:text-brand-plum transition-colors">{s}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
