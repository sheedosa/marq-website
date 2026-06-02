import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Navigation() {
  const { lang, toggle } = useLang();
  const c = CONTENT[lang].nav;
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <a href="#services" className="hover:text-brand-teal transition-colors">{c.services}</a>
      <a href="#work" className="hover:text-brand-teal transition-colors">{c.work}</a>
      <a href="#studio" className="hover:text-brand-teal transition-colors">{c.studio}</a>
    </>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-7 flex justify-between items-center mix-blend-difference"
      >
        <a href="#top" aria-label="MarQ — Branding Solutions" className="flex flex-col leading-none text-brand-teal font-display">
          <span className="text-2xl font-black tracking-tighter">MarQ</span>
          <span className="text-[7px] font-bold uppercase tracking-[0.28em] tracky opacity-80">Branding Solutions</span>
        </a>

        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] tracky font-bold text-white">
          {links}
        </div>

        <div className="flex items-center gap-5">
          {/* language toggle */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="text-[12px] font-bold text-white hover:text-brand-teal transition-colors tracking-widest"
          >
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <a href="#studio" className="hidden md:block text-[11px] uppercase tracking-[0.2em] tracky font-bold text-brand-gold hover:text-white transition-colors">
            {c.cta}
          </a>
          <button className="md:hidden text-brand-teal" aria-label="Menu" onClick={() => setOpen(true)}>
            <Menu size={30} />
          </button>
        </div>
      </motion.nav>

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-brand-plum-900 flex flex-col items-center justify-center gap-10 text-3xl font-black uppercase italic tracking-tighter font-display md:hidden">
          <button className="absolute top-7 right-6 text-brand-teal" aria-label="Close" onClick={() => setOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col items-center gap-8" onClick={() => setOpen(false)}>
            {links}
            <a href="#studio" className="text-brand-gold">{c.cta}</a>
          </div>
        </div>
      )}
    </>
  );
}
