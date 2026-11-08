import { getCollection, type CollectionEntry } from 'astro:content';

import { apps } from '../config/apps';
import { appOf, languageOf } from '../config/routes';

/** The apps that have a page in a language, in the order `src/config/apps.ts` lists them. */
export async function appPagesIn(language: string): Promise<CollectionEntry<'apps'>[]> {
  const order = apps.map((info) => info.app);
  const pages = await getCollection('apps', (page) => languageOf(page.id) === language);
  return pages.sort((a, b) => order.indexOf(appOf(a.id)) - order.indexOf(appOf(b.id)));
}
