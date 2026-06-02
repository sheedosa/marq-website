import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import Logo from './Logo';

// which section sits under the nav → light text (dark bg) vs dark text (light bg)
const THEME: Record<string, 'dark' | 'light'> = {
  top: 'dark', // plum hero
  services: 'light', // teal
  work: 'dark', // plum
  studio: 'light', // gold footer
};

export default function Navigation() {
  const { lang, toggle } = useLang();
  const c = CONTENT[lang].nav;
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setTheme(THEME[(e.target as HTMLElement).id] || 'dark');
        });
      },
      { rootMargin: '-64px 0px -94% 0px' }, // a thin band just below the nav
    );
    Object.keys(THEME).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const isDark = theme === 'dark';

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
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6 flex justify-between items-center transition-colors duration-300 ${isDark ? 'text-white' : 'text-brand-plum'}`}
      >
        <Logo accent={isDark ? 'teal' : 'current'} />

        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] tracky font-bold">
          {links}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="text-[12px] font-bold hover:text-brand-teal transition-colors tracking-widest"
          >
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <a
            href="#studio"
            className={`hidden md:block text-[11px] uppercase tracking-[0.2em] tracky font-bold transition-opacity hover:opacity-70 ${isDark ? 'text-brand-gold' : 'text-brand-plum'}`}
          >
            {c.cta}
          </a>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {open && (
        <div className="fixed inset-0 z-[60] bg-brand-plum-900 text-white flex flex-col items-center justify-center gap-8 text-3xl font-black uppercase italic tracking-tighter font-display md:hidden">
          <button className="absolute top-6 right-6 text-brand-teal" aria-label="Close" onClick={() => setOpen(false)}>
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
