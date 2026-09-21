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

/**
 * Resource page URL for an app in a language. Resource pages are not built from content
 * files, so they are addressed by their two parts rather than by an entry id.
 *
 * `('rect', 'en')` -> `/rect/resources/`, `('rect', 'hu')` -> `/hu/rect/resources/`
 */
export function resourcesPath(app: string, language: string): string {
  return language === DEFAULT_LANGUAGE
    ? `/${app}/resources/`
    : `/${language}/${app}/resources/`;
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
