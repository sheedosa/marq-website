import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: jump to top. If the URL carries a hash (e.g. "/#work" from a
 * subpage link), smooth-scroll to that section instead — the existing
 * `scroll-padding-top: 80px` in index.css offsets the fixed nav.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // wait a frame so the target section is mounted (e.g. after routing Home)
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
