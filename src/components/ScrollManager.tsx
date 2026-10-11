import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not manage scroll position. This restores the top of the
 * page on route changes and honours in-page anchors (#section) so smooth
 * scrolling works from any route.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Defer until the target route has painted.
        const id = window.setTimeout(
          () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          60,
        );
        return () => window.clearTimeout(id);
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
