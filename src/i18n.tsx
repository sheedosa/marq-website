import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ar';

interface LangCtx {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: 'en', dir: 'ltr', setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // restore saved choice (English-first by default)
  useEffect(() => {
    const saved = localStorage.getItem('marq-lang');
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);

  // reflect on <html> + persist
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('marq-lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === 'ar' ? 'en' : 'ar'));

  return (
    <Ctx.Provider value={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', setLang, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
