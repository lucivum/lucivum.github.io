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

/** One policy per app and language (`en/rect.md` -> `/rect/privacy/`, `hu/rect.md` -> `/hu/rect/privacy/`). */
const privacy = defineCollection({
  loader: glob({ base: './src/content/privacy', pattern: '**/*.md' }),
  schema: z.object({
    ...pageBase,
    effective_date: z.string(),
    last_updated: z.string(),
    effective_date_label: z.string(),
    last_updated_label: z.string(),
    controller_title: z.string(),
    name_label: z.string(),
    email_label: z.string(),
  }),
});

export const collections = { home, privacy };
