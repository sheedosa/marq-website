import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import { useLang } from '../i18n';
import { CONTENT } from '../content';
import { fadeUpSm, stagger, viewport } from '../motion';
import Logo from './Logo';

// lucide has no Behance glyph — small inline mark to keep the real platform.
function Behance({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.481 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const c = CONTENT[lang].footer;
  const nav = CONTENT[lang].nav;
  const hero = CONTENT[lang].hero;

  const links = [
    { to: '/', label: nav.home },
    { to: '/#work', label: nav.work },
    { to: '/services', label: nav.services },
    { to: '/about', label: nav.about },
    { to: '/contact', label: nav.contact },
  ];

  const socialIcon: Record<string, React.ReactNode> = {
    Instagram: <Instagram size={16} />,
    LinkedIn: <Linkedin size={16} />,
    Behance: <Behance size={16} />,
  };

  const label = 'text-[9px] uppercase tracking-[0.2em] tracky font-bold text-brand-gold mb-5';
  const linkCls = 'text-sm text-white/65 hover:text-brand-teal transition-colors duration-200 w-fit';

  return (
    <footer id="studio" className="bg-brand-plum-900 text-white border-t-2 border-brand-gold/30 px-6 md:px-12 lg:px-24 pt-16 md:pt-20 pb-8 relative z-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 pb-14 md:pb-16">
          {/* brand */}
          <motion.div variants={fadeUpSm} className="col-span-2 md:col-span-4">
            <Link to="/" aria-label="MarQ home" className="inline-block">
              <Logo variant="white" />
            </Link>
            <p className="mt-5 text-sm text-white/55 max-w-xs leading-relaxed">{c.tagline}</p>
          </motion.div>

          {/* navigate */}
          <motion.nav variants={fadeUpSm} aria-label="Footer" className="md:col-span-3 flex flex-col">
            <h3 className={label}>{c.linksLabel}</h3>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* contact */}
          <motion.div variants={fadeUpSm} className="md:col-span-3 flex flex-col">
            <h3 className={label}>{c.contactLabel}</h3>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${c.email}`} dir="ltr" className={`${linkCls} font-medium`}>{c.email}</a>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} dir="ltr" className={linkCls}>{c.phone}</a>
              <div className="mt-1">
                <p className="text-sm text-white/65">{hero.locValue}</p>
                <p dir="ltr" className="text-[11px] font-mono text-white/35 mt-0.5">{hero.coords}</p>
              </div>
            </div>
          </motion.div>

          {/* social */}
          <motion.div variants={fadeUpSm} className="md:col-span-2 flex flex-col">
            <h3 className={label}>{c.followLabel}</h3>
            <div className="flex gap-3" dir="ltr">
              {c.socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-brand-teal hover:border-brand-teal hover:text-brand-plum transition-colors duration-200"
                >
                  {socialIcon[s] ?? s.slice(0, 2)}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* bottom bar */}
        <motion.div
          variants={fadeUpSm}
          className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-[0.2em] tracky text-white/40 font-bold"
        >
          <p>{c.copyright}</p>
          <p className="flex items-center gap-2">
            <span className="text-brand-teal">●</span>
            {lang === 'ar' ? 'صُنع في طرابلس' : 'Made in Tripoli'}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
