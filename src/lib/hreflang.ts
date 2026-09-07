import { getCollection } from 'astro:content';

import { DEFAULT_LANGUAGE, appOf, homePath, languageOf, privacyPath } from '../config/routes';
import { site } from '../config/site';

export interface Alternate {
  code: string;
  url: string;
}

export interface Hreflang {
  alternates: Alternate[];
  xDefaultUrl?: string;
}

// Widened to string[]: `site` is `as const`, so the mapped codes would otherwise be a
// literal union that `indexOf` refuses to compare against an arbitrary language code.
const languageOrder: string[] = site.languageOptions.map((option) => option.code);

/** Order hreflang lists the same way everywhere; unlisted languages sort last. */
function rank(code: string): number {
  const index = languageOrder.indexOf(code);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function byLanguageOrder(a: Alternate, b: Alternate): number {
  return rank(a.code) - rank(b.code);
}

/**
 * x-default points at the default language where that translation exists, and at
 * the first available one otherwise — some apps ship in a single language.
 */
function xDefaultUrl(alternates: Alternate[]): string | undefined {
  const preferred = alternates.find((alternate) => alternate.code === DEFAULT_LANGUAGE);
  return (preferred ?? alternates[0])?.url;
}

/** Every language the landing page exists in. */
export async function homeAlternates(): Promise<Hreflang> {
  const pages = await getCollection('home');
  const alternates = pages
    .map((page) => ({ code: page.id, url: homePath(page.id) }))
    .sort(byLanguageOrder);

  return { alternates, xDefaultUrl: xDefaultUrl(alternates) };
}

/** Every language the given entry's app has a policy in. */
export async function privacyAlternates(id: string): Promise<Hreflang> {
  const app = appOf(id);
  const policies = await getCollection('privacy');
  const alternates = policies
    .filter((policy) => appOf(policy.id) === app)
    .map((policy) => ({ code: languageOf(policy.id), url: privacyPath(policy.id) }))
    .sort(byLanguageOrder);

  return { alternates, xDefaultUrl: xDefaultUrl(alternates) };
}
