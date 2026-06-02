import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowUpRight } from 'lucide-react';
import { fadeUp, fadeUpSm, stagger, viewport } from '../motion';
import { useLang } from '../i18n';
import { CONTENT } from '../content';

export default function Contact() {
  const { lang } = useLang();
  const c = CONTENT[lang].contact;
  const f = c.form;
  const footer = CONTENT[lang].footer;
  const hero = CONTENT[lang].hero;

  const [form, setForm] = useState({ name: '', email: '', company: '', budget: f.budgetOptions[0], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (invalid[k]) setInvalid((prev) => ({ ...prev, [k]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const miss = { name: !form.name.trim(), email: !form.email.trim(), message: !form.message.trim() };
    if (miss.name || miss.email || miss.message) {
      setInvalid(miss);
      setError(true);
      return;
    }
    setError(false);
    setInvalid({});
    const subject = encodeURIComponent(`New enquiry — ${form.name}${form.company ? ` (${form.company})` : ''}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nBudget: ${form.budget}\n\n${form.message}`,
    );
    window.location.href = `mailto:${footer.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputCls =
    'w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal transition-colors';
  const fieldCls = (k: string) => `${inputCls} ${invalid[k] ? 'border-red-400 ring-1 ring-red-400' : ''}`;

  return (
    <section className="bg-brand-plum-900 text-white pt-36 md:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        {/* left: headline + details */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.span variants={fadeUpSm} className="block text-[10px] uppercase tracking-[0.3em] tracky font-bold text-brand-gold mb-6">
            {c.kicker}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="display font-display font-black uppercase italic tracking-tighter leading-[0.85] text-[18vw] sm:text-7xl md:text-[8rem]"
          >
            {c.head[0]} <span className="text-brand-teal">{c.head[1]}</span>
            <span className="text-brand-gold">.</span>
          </motion.h1>
          <motion.p variants={fadeUpSm} className="mt-7 text-base md:text-lg text-white/70 max-w-md font-medium leading-relaxed">
            {c.intro}
          </motion.p>

          <motion.div variants={fadeUpSm} className="mt-12 flex flex-col gap-6 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] tracky text-white/55 font-bold">{c.emailLabel}</span>
              <a href={`mailto:${footer.email}`} dir="ltr" className="text-lg font-bold hover:text-brand-teal transition-colors inline-block">{footer.email}</a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] tracky text-white/55 font-bold">{c.phoneLabel}</span>
              <a href={`tel:${footer.phone.replace(/\s/g, '')}`} dir="ltr" className="text-lg font-bold hover:text-brand-teal transition-colors inline-block">{footer.phone}</a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] tracky text-white/55 font-bold">{c.locationLabel}</span>
              <span className="text-lg font-bold">{hero.locValue}</span>
              <span dir="ltr" className="text-[11px] font-mono text-white/55 inline-block">{hero.coords}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] tracky text-white/55 font-bold">{c.followLabel}</span>
              <nav dir="ltr" className="flex gap-6 text-sm font-bold">
                {footer.socials.map((s) => (
                  <a key={s} href="#" className="hover:text-brand-teal transition-colors">{s}</a>
                ))}
              </nav>
            </div>
          </motion.div>
        </motion.div>

        {/* right: form */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="lg:pt-4">
          {submitted ? (
            <div className="border border-brand-teal/40 bg-brand-teal/10 rounded-lg p-8 flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-brand-teal text-brand-plum flex items-center justify-center shrink-0">
                <Check size={20} />
              </span>
              <p className="text-base text-white/90 leading-relaxed font-medium">{f.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input className={fieldCls('name')} type="text" placeholder={f.name} value={form.name} onChange={set('name')} aria-label={f.name} aria-invalid={!!invalid.name} />
                <input className={fieldCls('email')} type="email" placeholder={f.email} value={form.email} onChange={set('email')} aria-label={f.email} aria-invalid={!!invalid.email} />
              </div>
              <input className={inputCls} type="text" placeholder={f.company} value={form.company} onChange={set('company')} aria-label={f.company} />
              <select className={`${inputCls} appearance-none`} value={form.budget} onChange={set('budget')} aria-label={f.budget}>
                {f.budgetOptions.map((o) => (
                  <option key={o} value={o} className="bg-brand-plum-900 text-white">{o}</option>
                ))}
              </select>
              <textarea className={`${fieldCls('message')} resize-none`} rows={5} placeholder={f.message} value={form.message} onChange={set('message')} aria-label={f.message} aria-invalid={!!invalid.message} />

              {error && <p className="text-sm text-red-400">{f.required}</p>}

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] tracky font-bold bg-brand-teal text-brand-plum rounded-full px-9 py-4 hover:bg-white transition-colors duration-300 self-start"
              >
                {f.submit}
                <ArrowUpRight size={18} className="rtl:-scale-x-100 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
