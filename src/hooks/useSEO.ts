import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}

/**
 * Lightweight SEO hook — updates <title> and <meta> tags on every page mount.
 * No external library needed. Works with Vite + React Router.
 */
export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogType = 'website',
}: SEOProps) {
  useEffect(() => {
    // ── Page title ────────────────────────────────────────────────────
    document.title = title;

    // ── Helper: upsert a <meta> tag ───────────────────────────────────
    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // ── Helper: upsert a <link> tag ────────────────────────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // ── Standard meta ─────────────────────────────────────────────────
    setMeta('meta[name="description"]',             'name', 'description',           description);
    setMeta('meta[name="robots"]',                  'name', 'robots',                'index, follow');
    setMeta('meta[name="author"]',                  'name', 'author',                'CS Fabrication');

    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // ── Open Graph ────────────────────────────────────────────────────
    setMeta('meta[property="og:type"]',             'property', 'og:type',             ogType);
    setMeta('meta[property="og:title"]',            'property', 'og:title',            ogTitle ?? title);
    setMeta('meta[property="og:description"]',      'property', 'og:description',      ogDescription ?? description);
    setMeta('meta[property="og:site_name"]',        'property', 'og:site_name',        'CS Fabrication');
    setMeta('meta[property="og:locale"]',           'property', 'og:locale',           'en_IN');

    // ── Twitter Card ──────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]',            'name', 'twitter:card',           'summary_large_image');
    setMeta('meta[name="twitter:title"]',           'name', 'twitter:title',          ogTitle ?? title);
    setMeta('meta[name="twitter:description"]',     'name', 'twitter:description',    ogDescription ?? description);

    // ── Canonical ─────────────────────────────────────────────────────
    if (canonical) {
      setLink('canonical', canonical);
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogType]);
}
