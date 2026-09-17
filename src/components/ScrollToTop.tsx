import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (!hash && !search.includes('tab=') && !search.includes('category=') && !search.includes('filter=')) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, search]);

  return null;
};

export default ScrollToTop;
