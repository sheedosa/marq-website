import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import Logo from './Logo';

const THEME: Record<string, 'white' | 'color'> = {
  top: 'white',
  info: 'white',
  services: 'white',
  work: 'white',
  studio: 'color',
};

export default function Navigation() {
  const { lang, toggle } = useLang();
  const c = CONTENT[lang].nav;
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'white' | 'color'>('white');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setTheme(THEME[(e.target as HTMLElement).id] || 'white');
      }),
      { rootMargin: '-64px 0px -94% 0px' },
    );
    Object.keys(THEME).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const isDark = theme === 'white';

  const navLinks = [
    { href: '#services', label: c.services },
    { href: '#work', label: c.work },
    { href: '#studio', label: c.studio },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 px-6 md:px-12 lg:px-24 py-5 flex justify-between items-center transition-colors duration-300 ${
          isDark ? 'text-white bg-brand-plum-900/80 backdrop-blur-lg' : 'text-brand-plum bg-brand-gold/85 backdrop-blur-lg'
        }`}
        role="navigation"
        aria-label="Main"
      >
        <Logo variant={theme} />

        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] tracky font-bold">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-teal transition-colors duration-200">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button onClick={toggle} aria-label="Switch language" className="text-xs font-bold hover:text-brand-teal transition-colors tracking-widest">
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <a href="#studio" className={`hidden md:block text-[11px] uppercase tracking-[0.2em] tracky font-bold transition-opacity hover:opacity-70 ${isDark ? 'text-brand-gold' : 'text-brand-plum'}`}>
            {c.cta}
          </a>
          <button className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-brand-plum-900/98 backdrop-blur-xl text-white flex flex-col items-center justify-center gap-10 md:hidden"
            role="dialog"
            aria-label="Navigation menu"
          >
            <button className="absolute top-5 end-6 text-brand-teal" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={30} />
            </button>
            <div className="flex flex-col items-center gap-8" onClick={() => setOpen(false)}>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-3xl font-black uppercase italic tracking-tighter font-display hover:text-brand-teal transition-colors">{l.label}</a>
              ))}
              <a href="#studio" className="text-brand-gold text-3xl font-black uppercase italic tracking-tighter font-display">{c.cta}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
