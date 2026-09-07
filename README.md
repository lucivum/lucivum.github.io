# lucivum.github.io

The Lucivum website: a multilingual static site built with [Astro](https://astro.build/),
carrying the contact page and the per-app privacy policies.

## Structure

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | Site-wide settings: name, contact details, and the language list. |
| `src/content.config.ts` | Collection schemas for the `home` and `privacy` content. |
| `src/config/routes.ts` | URL layout — English is the default language and lives at the site root. |
| `src/lib/hreflang.ts` | Derives each page's `hreflang` alternates and `x-default` from the collections. |
| `src/content/home/<lang>.md` | Landing page copy per language → `/` for English, `/<lang>/` otherwise |
| `src/content/privacy/<lang>/<app>.md` | Privacy policy per app and language → `/<app>/privacy/` for English, `/<lang>/<app>/privacy/` otherwise |
| `src/layouts/BaseLayout.astro` | Document shell: `<head>` metadata, hreflang links, footer. |
| `src/pages/` | Routes: the root landing page, `404`, the language/app routes, and `sitemap.xml`. |
| `public/` | Files copied verbatim: CSS, logo, `robots.txt`, `app-ads.txt`, `CNAME`. |

Adding a language means dropping a `src/content/home/<code>.md` file in place and adding
the matching entry to `languageOptions` in `src/config/site.ts`. Adding a policy means
dropping a `src/content/privacy/<lang>/<app>.md` file in place — both routes pick it up.

The `hreflang` links are derived, never written by hand: a landing page lists every
language in the `home` collection, and a policy lists every language that has a file for
the same app. `x-default` points at the English version, or at the only translation when
an app ships in one language.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start the dev server at `localhost:4321`. |
| `npm run build` | Build the production site to `./dist`. |
| `npm run preview` | Preview the built site locally. |
| `npm run check` | Type-check the project and content frontmatter. |

Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.

## Planned

**JSON-LD structured data.** Add an `Organization` block to the landing pages so search
engines can tie the Lucivum name, logo, and site together as one entity. Every value it
needs already lives in `src/config/site.ts`, so it would be generated rather than written
by hand, and it belongs on the landing pages only — `WebPage` markup on the policies would
add nothing.

Blocked on having public store URLs. The line that carries the weight is `sameAs`, listing
the Play Store and App Store developer pages; without it the block only restates the
existing `og:` and `meta` tags and is not worth the code.
