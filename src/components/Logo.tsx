// MarQ wordmark lockup recreated from the brand book: bold geometric "MarQ"
// with the signature teal triangle in the M + "BRANDING SOLUTIONS" tagline.
// Wordmark inherits currentColor (nav theme); accent (triangle + tagline) is teal
// over dark sections, and follows currentColor over light ones so it stays visible.
export default function Logo({ accent = 'teal' }: { accent?: 'teal' | 'current' }) {
  const accentCls = accent === 'teal' ? 'text-brand-teal' : 'text-current';
  return (
    <a href="#top" aria-label="MarQ — Branding Solutions" className="inline-flex flex-col leading-none select-none">
      <span className="font-display font-black text-[1.7rem] leading-none tracking-tighter inline-flex items-baseline">
        <span className="relative inline-block">
          M
          <svg
            viewBox="0 0 10 10"
            aria-hidden="true"
            className={`absolute left-1/2 -translate-x-1/2 bottom-[3px] w-[0.26em] h-[0.34em] ${accentCls}`}
            fill="currentColor"
          >
            <polygon points="5,0 10,10 0,10" />
          </svg>
        </span>
        arQ
      </span>
      <span className={`font-display text-[0.5rem] font-bold uppercase tracking-[0.3em] tracky mt-[3px] ${accentCls}`}>
        Branding Solutions
      </span>
    </a>
  );
}
