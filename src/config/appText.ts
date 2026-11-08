/**
 * The words around an app page and the home page's app list, in every language the site
 * offers. The app's own text is in `src/content/apps/`; the links to its privacy policy
 * and resource page reuse `resourceText`, so each phrase is translated once.
 *
 * `getOnPlay` is the alt text of Google's badge image, so it repeats exactly what that
 * language's badge says (`public/images/badges/google-play-<lang>.png`).
 */
import type { LanguageCode } from './site';

export interface AppText {
  /** What the Google Play badge says, as its alt text. */
  getOnPlay: string;
  /** Accessible name of the screenshot strip. */
  screenshots: string;
  /** Buttons that scroll the strip by one screen, and close the enlarged screenshot. */
  previous: string;
  next: string;
  close: string;
  /** Alt text of one screenshot. `{app}` is the app's name, `{n}` its position. */
  screenshotAlt: string;
  /** Heading over the app list on the home page. */
  appsHeading: string;
  /** Heading over the other apps at the foot of an app page. */
  moreApps: string;
}

export const appText: Record<LanguageCode, AppText> = {
  en: {
    getOnPlay: 'Get it on Google Play',
    screenshots: 'Screenshots',
    previous: 'Previous screenshots',
    next: 'Next screenshots',
    close: 'Close',
    screenshotAlt: '{app} screenshot {n}',
    appsHeading: 'Apps',
    moreApps: 'More apps',
  },
  zh: {
    getOnPlay: '去商店下载：Google Play',
    screenshots: '屏幕截图',
    previous: '上一组屏幕截图',
    next: '下一组屏幕截图',
    close: '关闭',
    screenshotAlt: '{app} 屏幕截图 {n}',
    appsHeading: '应用',
    moreApps: '更多应用',
  },
  hi: {
    getOnPlay: 'इसे Google Play पर पाएं',
    screenshots: 'स्क्रीनशॉट',
    previous: 'पिछले स्क्रीनशॉट',
    next: 'अगले स्क्रीनशॉट',
    close: 'बंद करें',
    screenshotAlt: '{app} स्क्रीनशॉट {n}',
    appsHeading: 'ऐप्स',
    moreApps: 'और ऐप्स',
  },
  es: {
    getOnPlay: 'Disponible en Google Play',
    screenshots: 'Capturas de pantalla',
    previous: 'Capturas anteriores',
    next: 'Capturas siguientes',
    close: 'Cerrar',
    screenshotAlt: 'Captura de pantalla {n} de {app}',
    appsHeading: 'Aplicaciones',
    moreApps: 'Más aplicaciones',
  },
  fr: {
    getOnPlay: 'Disponible sur Google Play',
    screenshots: 'Captures d’écran',
    previous: 'Captures précédentes',
    next: 'Captures suivantes',
    close: 'Fermer',
    screenshotAlt: 'Capture d’écran {n} de {app}',
    appsHeading: 'Applications',
    moreApps: 'Autres applications',
  },
  hu: {
    getOnPlay: 'Szerezd be: Google Play',
    screenshots: 'Képernyőképek',
    previous: 'Előző képernyőképek',
    next: 'Következő képernyőképek',
    close: 'Bezárás',
    screenshotAlt: '{app} – {n}. képernyőkép',
    appsHeading: 'Alkalmazások',
    moreApps: 'További alkalmazások',
  },
};
