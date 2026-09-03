/**
 * Site-wide settings: everything that is the same on every page.
 */
export const site = {
  url: 'https://lucivum.github.io',
  name: 'Lucivum',
  description: 'Independent mobile app developer from Hungary.',
  logo: '/images/logo.png',
  language: 'en-US',
  themeColor: '#0d151d',
  /**
   * Every language the site offers. `notFound` feeds the 404 page, so a new
   * language cannot be added without its copy — the build fails otherwise.
   *
   * `notFound.title` is written without terminal punctuation, because it serves as a
   * heading in one place and as a bold lead-in in another. `fullStop` supplies the
   * mark where a sentence is needed — it is not always "." (Chinese uses 。, Hindi ।).
   */
  languageOptions: [
    {
      code: 'en',
      label: 'English',
      flag: '🇬🇧',
      url: '/',
      fullStop: '.',
      notFound: {
        title: 'Page not found',
        message: 'The page you requested does not exist or may have moved.',
      },
    },
    {
      code: 'zh',
      label: '中文',
      flag: '🇨🇳',
      url: '/zh/',
      fullStop: '。',
      notFound: {
        title: '页面未找到',
        message: '您请求的页面不存在，或可能已被移动。',
      },
    },
    {
      code: 'hi',
      label: 'हिन्दी',
      flag: '🇮🇳',
      url: '/hi/',
      fullStop: '।',
      notFound: {
        title: 'पृष्ठ नहीं मिला',
        message: 'आपके द्वारा अनुरोधित पृष्ठ मौजूद नहीं है या उसे स्थानांतरित कर दिया गया है।',
      },
    },
    {
      code: 'es',
      label: 'Español',
      flag: '🇪🇸',
      url: '/es/',
      fullStop: '.',
      notFound: {
        title: 'Página no encontrada',
        message: 'La página solicitada no existe o puede haber cambiado de ubicación.',
      },
    },
    {
      code: 'fr',
      label: 'Français',
      flag: '🇫🇷',
      url: '/fr/',
      fullStop: '.',
      notFound: {
        title: 'Page introuvable',
        message: 'La page demandée n’existe pas ou a peut-être été déplacée.',
      },
    },
    {
      code: 'hu',
      label: 'Magyar',
      flag: '🇭🇺',
      url: '/hu/',
      fullStop: '.',
      notFound: {
        title: 'Az oldal nem található',
        message: 'A keresett oldal nem létezik, vagy áthelyeztük.',
      },
    },
  ],
  contact: {
    name: 'Gabor Lengyel',
    email: 'lucivumx@gmail.com',
  },
} as const;

/** Absolute URL for a root-relative path. */
export function absolute(path: string): string {
  return new URL(path, `${site.url}/`).href;
}
