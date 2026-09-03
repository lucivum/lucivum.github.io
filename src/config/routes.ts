/**
 * URL layout. English is the default language and lives at the site root, so its
 * pages carry no language prefix; every other language keeps one.
 *
 * Both the routes under src/pages and the sitemap build their URLs from here, so
 * the two can never disagree about where a page lives.
 */
export const DEFAULT_LANGUAGE = 'en';

/** `home` entry id -> URL. `en` -> `/`, `hu` -> `/hu/` */
export function homePath(id: string): string {
  return id === DEFAULT_LANGUAGE ? '/' : `/${id}/`;
}

/** `privacy` entry id -> URL. `en/rect` -> `/rect/privacy/`, `hu/rect` -> `/hu/rect/privacy/` */
export function privacyPath(id: string): string {
  const [language, app] = id.split('/');
  return language === DEFAULT_LANGUAGE
    ? `/${app}/privacy/`
    : `/${language}/${app}/privacy/`;
}

/** The app segment of a `privacy` entry id (`en/rect` -> `rect`). */
export function appOf(id: string): string {
  return id.split('/')[1];
}

/** The language segment of a collection entry id (`en/rect` -> `en`, `hu` -> `hu`). */
export function languageOf(id: string): string {
  return id.split('/')[0];
}

export function isDefaultLanguage(id: string): boolean {
  return languageOf(id) === DEFAULT_LANGUAGE;
}
