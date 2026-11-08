# lucivum.github.io

The Lucivum website: a multilingual static site built with [Astro](https://astro.build/),
carrying the contact page, a landing page per app, and the per-app privacy policies.

## Structure

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | Site-wide settings: name, contact details, and the language list. |
| `src/content.config.ts` | Collection schemas for the `home`, `apps` and `privacy` content. |
| `src/config/routes.ts` | URL layout — English is the default language and lives at the site root. |
| `src/lib/hreflang.ts` | Derives each page's `hreflang` alternates and `x-default` from the collections. |
| `src/content/home/<lang>.md` | Landing page copy per language → `/` for English, `/<lang>/` otherwise |
| `src/content/apps/<lang>/<app>.md` | App landing page per app and language → `/<app>/` for English, `/<lang>/<app>/` otherwise. Title, short and long description are the app's Google Play listing in that language. |
| `src/config/apps.ts` | What an app page shares across languages: the Google Play package, the screenshot orientation and the app category. |
| `src/lib/structuredData.ts` | JSON-LD: an `Organization` on the landing pages, plus a `MobileApplication` on each app page. |
| `src/assets/apps/<app>/` | `icon.png`, the feature graphic used as share image (`feature/<lang>.png`, or `feature.*` for every language), and the Google Play screenshots in `screenshots/<lang>/` (or `screenshots/all/`), served as resized WebP. |
| `scripts/sync-apps.py` | Copies each app's listing text and images from its own folder into the two rows above. |
| `src/content/privacy/<lang>/<app>.md` | Privacy policy per app and language → `/<app>/privacy/` for English, `/<lang>/<app>/privacy/` otherwise |
| `src/content/site-privacy/<lang>.md` | The website's own privacy policy (hosting, cookie banner, Google Ads) → `/privacy/` for English, `/<lang>/privacy/` otherwise. Linked from the banner and every footer. |
| `src/layouts/BaseLayout.astro` | Document shell: `<head>` metadata, hreflang links, footer. |
| `src/pages/` | Routes: the root landing page, `404`, the language/app routes, and `sitemap.xml`. |
| `public/` | Files copied verbatim: CSS, logo, Google Play badges, `robots.txt`, `app-ads.txt`, `CNAME`. |

Adding a language means dropping a `src/content/home/<code>.md` file in place and adding
the matching entry to `languageOptions` in `src/config/site.ts`. Adding a policy means
dropping a `src/content/privacy/<lang>/<app>.md` file in place — both routes pick it up.
App pages are generated from the app folders, never edited here: each app's
`store-text-android.md` and its Play screenshots are the source, and
`python3 scripts/sync-apps.py` copies them in. Run it after a listing or its screenshots
change. Adding an app means an entry in `src/config/apps.ts` and in the script's `APPS`;
the home page then lists it in every language it has a listing in. An app's URL segment must never be a
language code: `/<app>/` and `/<lang>/` share one pattern, and the build fails on a clash.

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

## Analytics

The Google Ads tag loads only after a visitor accepts cookies in the banner
(`src/components/ConsentBanner.astro`, text in `src/config/consentText.ts`). Until then
nothing is fetched from Google. The choice is kept in the browser under `lucivum-consent`,
and the footer's cookie settings link brings the banner back to change it. The website
privacy policy (`src/content/site-privacy/`) describes this setup; update it, and its
`last_updated` date, whenever the tracking changes.

With consent given, every click on a Google Play badge is sent as a `play_store_click`
event, with the app and the page language. To count those clicks as conversions, create
a conversion action in Google Ads and put its `send_to` value in
`site.ads.playClickConversion` in `src/config/site.ts`.
