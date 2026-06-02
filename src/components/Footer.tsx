import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Footer() {
  const { lang } = useLang();
  const c = CONTENT[lang].footer;

  return (
    <footer id="studio" className="bg-brand-gold text-brand-plum py-24 px-6 md:px-12 lg:px-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="text-3xl md:text-5xl font-black text-brand-plum opacity-50 font-display">{c.index}</div>
          <div className="text-[9px] uppercase tracking-widest tracky leading-tight font-bold">{c.kicker[0]} <br /> {c.kicker[1]}</div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="display text-[20vw] sm:text-7xl md:text-[140px] font-black uppercase tracking-tighter italic leading-[0.8] mb-10 md:mb-12 font-display"
        >
          {c.head[0]}<br /><span className="text-white ms-12 md:ms-24">{c.head[1]}</span>
        </motion.h2>

        <p className="text-sm md:text-base font-medium max-w-md text-brand-plum/90 mb-12 md:mb-16 leading-relaxed border-s-2 border-brand-plum ps-4 text-start">
          {c.blurb}
        </p>

        <a
          href={`mailto:${c.email}`}
          className="group flex flex-col md:flex-row items-center gap-5 md:gap-8 text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-brand-plum hover:text-white transition-colors duration-300 break-all md:break-normal font-display"
        >
          {c.email}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-brand-plum flex items-center justify-center group-hover:border-white transition-colors duration-300 shrink-0">
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 transition-transform duration-300 w-5 h-5 md:w-7 md:h-7" />
          </div>
        </a>

        <a href={`tel:${c.phone.replace(/\s/g, '')}`} dir="ltr" className="mt-6 text-sm font-bold tracking-widest text-brand-plum/70 hover:text-brand-plum transition-colors">
          {c.phone}
        </a>

        <div className="w-full mt-20 md:mt-28 pt-7 border-t border-brand-plum/20 flex flex-col md:flex-row justify-between items-center gap-5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] tracky">
          <p>{c.copyright}</p>
          <div className="flex gap-8" dir="ltr">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Behance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
