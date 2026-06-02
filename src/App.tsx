import { MotionConfig } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Footer from './components/Footer';
import { useLang } from './i18n';

export default function App() {
  const { lang, dir } = useLang();
  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={dir}
        className={`min-h-screen bg-brand-plum text-white ${lang === 'ar' ? 'font-ar' : 'font-sans'} selection:bg-brand-teal selection:text-brand-plum overflow-x-hidden`}
      >
        <Navigation />
        <main>
          <Hero />
          <Services />
          <Work />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
