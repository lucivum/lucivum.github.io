/**
 * schema.org objects for the JSON-LD block `BaseLayout` writes. Every value comes from
 * config the pages already use, so the structured data cannot disagree with the page.
 *
 * Note for search: Google shows the app rich result only with ratings or reviews, which
 * these pages do not carry. The data still ties each page to its app, its store listing
 * and the developer behind it.
 */
import { PLAY_DEVELOPER_URL, type AppInfo } from '../config/apps';
import { absolute, site } from '../config/site';

/** One id for the developer, so every page's app points at the same entity. */
const ORGANIZATION_ID = absolute('/#organization');

export function organization(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    url: absolute('/'),
    logo: absolute(site.logo),
    email: site.contact.email,
    // Where else the same developer is listed; this is what lets search engines join the
    // site and the store account into one entity.
    sameAs: [PLAY_DEVELOPER_URL],
  };
}

interface AppData {
  info: AppInfo;
  name: string;
  description: string;
  /** BCP-47 tag of the page. */
  language: string;
  /** Root-relative URL of the app page. */
  path: string;
  /** Root-relative URL of the icon. */
  icon: string;
  /** Root-relative URLs of the screenshots. */
  screenshots: string[];
  installUrl: string;
}

export function mobileApplication(app: AppData): Record<string, unknown> {
  return {
    '@type': 'MobileApplication',
    '@id': `${absolute(app.path)}#app`,
    name: app.name,
    description: app.description,
    inLanguage: app.language,
    url: absolute(app.path),
    image: absolute(app.icon),
    screenshot: app.screenshots.map((screenshot) => absolute(screenshot)),
    installUrl: app.installUrl,
    sameAs: [app.installUrl],
    operatingSystem: 'Android',
    applicationCategory: app.info.category,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
}
