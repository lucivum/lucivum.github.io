import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Frontmatter fields every rendered page shares. */
const pageBase = {
  title: z.string(),
  description: z.string(),
  language: z.string(),
  theme_color: z.string().optional(),
};

/** One landing page per language, keyed by the language code (`en.md` -> `/`, `hu.md` -> `/hu/`). */
const home = defineCollection({
  loader: glob({ base: './src/content/home', pattern: '**/*.md' }),
  schema: z.object({
    ...pageBase,
    language_code: z.string(),
    home_heading: z.string(),
    home_intro: z.string(),
    home_lead: z.string(),
  }),
});

/** What every privacy policy carries above its text: dates, and the controller block labels. */
const policyFields = {
  ...pageBase,
  effective_date: z.string(),
  last_updated: z.string(),
  effective_date_label: z.string(),
  last_updated_label: z.string(),
  controller_title: z.string(),
  name_label: z.string(),
  email_label: z.string(),
};

/** One policy per app and language (`en/rect.md` -> `/rect/privacy/`, `hu/rect.md` -> `/hu/rect/privacy/`). */
const privacy = defineCollection({
  loader: glob({ base: './src/content/privacy', pattern: '**/*.md' }),
  schema: z.object(policyFields),
});

/**
 * The website's own policy, one per language (`en.md` -> `/privacy/`, `hu.md` ->
 * `/hu/privacy/`): hosting and the cookie banner, which no app policy covers.
 */
const sitePrivacy = defineCollection({
  loader: glob({ base: './src/content/site-privacy', pattern: '*.md' }),
  schema: z.object(policyFields),
});

/**
 * One landing page per app and language (`en/rect.md` -> `/rect/`, `hu/vizallas.md` ->
 * `/hu/vizallas/`). The title is the app's name as its store listing gives it in that
 * language, the description its short description, and the body its long one.
 */
const apps = defineCollection({
  loader: glob({ base: './src/content/apps', pattern: '**/*.md' }),
  schema: z.object(pageBase),
});

export const collections = { home, privacy, sitePrivacy, apps };
