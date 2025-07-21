import { useEffect } from 'react';

export function useScrollToTop(location) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}
