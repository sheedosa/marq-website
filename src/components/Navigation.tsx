import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import Logo from './Logo';

// nav bg/text theme per homepage section (white = dark nav bg + white text)
const THEME: Record<string, 'white' | 'color'> = {
  top: 'white',
  info: 'white',
  why: 'white',
  services: 'white',
  process: 'white',
  work: 'white',
  start: 'white',
  studio: 'color',
};

export default function Navigation() {
  const { lang, toggle } = useLang();
  const c = CONTENT[lang].nav;
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'white' | 'color'>('white');

  useEffect(() => {
    // only the homepage has the colour-blocked sections; other routes use the
    // default dark theme (their page heroes are plum-900).
    if (!isHome) {
      setTheme('white');
      return;
    }
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
  }, [isHome]);

  const isDark = theme === 'white';

  // route links + one in-page anchor back to the homepage Work section
  const links = [
    { to: '/#work', label: c.work, route: false },
    { to: '/services', label: c.services, route: true },
    { to: '/about', label: c.about, route: true },
    { to: '/contact', label: c.contact, route: true },
  ];

  const linkBase = 'hover:text-brand-teal transition-colors duration-200';

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
        <Link to="/" aria-label="MarQ home">
          <Logo variant={theme} />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] tracky font-bold">
          {links.map((l) =>
            l.route ? (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `${linkBase} ${isActive ? 'text-brand-teal' : ''}`}>
                {l.label}
              </NavLink>
            ) : (
              <Link key={l.to} to={l.to} className={linkBase}>{l.label}</Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-5">
          <button onClick={toggle} aria-label="Switch language" className="text-xs font-bold hover:text-brand-teal transition-colors tracking-widest">
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <Link to="/contact" className={`hidden md:block text-[11px] uppercase tracking-[0.2em] tracky font-bold transition-opacity hover:opacity-70 ${isDark ? 'text-brand-gold' : 'text-brand-plum'}`}>
            {c.cta}
          </Link>
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
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="text-3xl font-black uppercase italic tracking-tighter font-display hover:text-brand-teal transition-colors">{l.label}</Link>
              ))}
              <Link to="/contact" className="text-brand-gold text-3xl font-black uppercase italic tracking-tighter font-display">{c.cta}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
