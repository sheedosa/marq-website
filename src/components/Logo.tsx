import { useLang } from '../i18n';

// Official MarQ lockups (transparent PNGs in /public): English vs Arabic by language.
// `white` renders the logo in solid white for dark sections (brand mono-on-dark);
// `color` shows the full-colour plum/teal logo (for light sections, e.g. the gold footer).
export default function Logo({ variant = 'white' }: { variant?: 'white' | 'color' }) {
  const { lang } = useLang();
  const src = `${import.meta.env.BASE_URL}logo-${lang === 'ar' ? 'ar' : 'en'}.png`;
  return (
    <a href="#top" aria-label="MarQ — Branding Solutions" className="block shrink-0">
      <img
        src={src}
        alt="MarQ — Branding Solutions"
        className={`h-10 md:h-12 w-auto ${variant === 'white' ? '[filter:brightness(0)_invert(1)]' : ''}`}
      />
    </a>
  );
}
