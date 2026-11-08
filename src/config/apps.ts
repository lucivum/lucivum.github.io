/**
 * What every app page needs that is the same in every language: where the app is on
 * Google Play, what kind of app it is, and its images. The words — name, short and long
 * description — are in `src/content/apps/<lang>/<app>.md`, so this file only lists what
 * cannot be translated.
 *
 * Images are found by file name in `src/assets/apps/<app>/`, so adding one means dropping
 * the file in place:
 * - `icon.png` — the 512px store icon
 * - `feature/<lang>.png` — the 1024x500 feature graphic in that language, used as the
 *   share image; `feature.png` or `feature.jpeg` where the app has one for every language
 * - `screenshots/<lang>/` — the Google Play phone screenshots in that language, shown in
 *   file name order; `screenshots/all/` where they are the same in every language
 *
 * `scripts/sync-apps.py` copies all of it, and the listing text, from the app folders.
 */
import type { ImageMetadata } from 'astro';

export interface AppInfo {
  /** URL segment, matching the app's privacy policy and resource page. */
  app: string;
  /** Google Play package name. */
  playId: string;
  /** How the phone screenshots are taken: The Filler is played in landscape. */
  orientation: 'portrait' | 'landscape';
  /** schema.org `applicationCategory`, from the list search engines recognise. */
  category: 'GameApplication' | 'UtilitiesApplication';
}

/** In the order the home page lists them. */
export const apps: AppInfo[] = [
  { app: 'dhess', playId: 'com.lucivum.dhess', orientation: 'portrait', category: 'GameApplication' },
  { app: 'filler', playId: 'com.filler', orientation: 'landscape', category: 'GameApplication' },
  { app: 'rect', playId: 'com.mujumsoft.rect', orientation: 'portrait', category: 'GameApplication' },
  { app: 'vizallas', playId: 'com.mujumsoft.vizallas', orientation: 'portrait', category: 'UtilitiesApplication' },
];

/** The developer page listing every app, for the `Organization` structured data. */
export const PLAY_DEVELOPER_URL = 'https://play.google.com/store/apps/developer?id=lucivum';

export function appInfoFor(app: string): AppInfo | undefined {
  return apps.find((entry) => entry.app === app);
}

/**
 * Store link in the page's language. `hl` only picks the language Play shows its own
 * interface and the listing in; it never changes which app opens.
 */
export function playUrl(info: AppInfo, language: string): string {
  return `https://play.google.com/store/apps/details?id=${info.playId}&hl=${language}`;
}

/** Google's badge in the page's language, from `public/images/badges/`. */
export function playBadge(language: string): string {
  return `/images/badges/google-play-${language}.png`;
}

type ImageFiles = Record<string, { default: ImageMetadata }>;

const files: ImageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/apps/**/*.{png,jpg,jpeg}',
  { eager: true },
);

/** The images directly inside one folder of `src/assets/apps/`, in file name order. */
function filesIn(folder: string): { name: string; image: ImageMetadata }[] {
  const prefix = `../assets/apps/${folder}/`;
  return Object.entries(files)
    .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .map(([path, module]) => ({ name: path.slice(prefix.length), image: module.default }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function find(folder: string, pattern: RegExp): ImageMetadata | undefined {
  return filesIn(folder).find((file) => pattern.test(file.name))?.image;
}

/** The app's store icon; fails the build when it is missing. */
export function appIcon(app: string): ImageMetadata {
  const icon = find(app, /^icon\.png$/);
  if (!icon) throw new Error(`Missing src/assets/apps/${app}/icon.png.`);
  return icon;
}

/** The feature graphic in a language, or the app's only one; fails the build without either. */
export function appFeature(app: string, language: string): ImageMetadata {
  const feature =
    find(`${app}/feature`, new RegExp(`^${language}\\.(png|jpe?g)$`)) ??
    find(app, /^feature\.(png|jpe?g)$/);
  if (!feature) {
    throw new Error(`Missing src/assets/apps/${app}/feature/${language}.png or feature.png.`);
  }
  return feature;
}

/** The app's screenshots in a language, or its shared set where they do not differ. */
export function appScreenshots(app: string, language: string): ImageMetadata[] {
  const localized = filesIn(`${app}/screenshots/${language}`);
  const shots = localized.length > 0 ? localized : filesIn(`${app}/screenshots/all`);
  return shots.map((file) => file.image);
}
