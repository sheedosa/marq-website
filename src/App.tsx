import { MotionConfig } from 'motion/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import { useLang } from './i18n';

export default function App() {
  const { lang, dir } = useLang();
  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={dir}
        className={`min-h-screen text-white ${lang === 'ar' ? 'font-ar' : 'font-sans'} selection:bg-brand-teal selection:text-brand-plum overflow-x-hidden`}
      >
        <ScrollToTop />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
