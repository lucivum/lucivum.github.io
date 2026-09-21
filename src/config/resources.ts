/**
 * What each app is built from: third-party works it ships, and where its data comes from.
 *
 * This is deliberately not a content collection. A resource list is almost entirely
 * language-independent — a Pixabay track's name, its URL and its licence read the same in
 * every language — so keeping one file per app per language would mean maintaining the same
 * URLs in five places and letting them drift. Only the words around the list are translated;
 * those live in `resourceText.ts`.
 *
 * The published name of a work is never translated. It is how the work is listed at its
 * source, and translating it makes the credit useless for finding the original.
 */
import type { LanguageCode } from './site';

/** One third-party work, credited by its published name. */
export interface CreditedWork {
  /** Key into `useLabels`: what the app uses this work for. */
  use: string;
  /** The work's published name, as its source lists it. */
  title: string;
  url: string;
}

/** A typeface the app ships a copy of, and so must credit. */
export interface BundledFont {
  name: string;
  /** Copyright line exactly as the licence file shipped with the font states it. */
  copyright: string;
  url: string;
}

/** A service the app reads data from at runtime. */
export interface DataSource {
  /** Key into `dataSourceLabels`: what the app reads from it. */
  use: string;
  name: string;
  url: string;
}

export interface AppResources {
  /** URL segment, matching the app's privacy policy. */
  app: string;
  /** Brand name, the same in every language. */
  name: string;
  /** Languages this app's pages exist in. Not every app ships in every language. */
  languages: LanguageCode[];
  themeColor: string;
  sounds?: CreditedWork[];
  dataSources?: DataSource[];
  /** Material Design Icons, under the Apache License 2.0. */
  usesMaterialIcons?: boolean;
  /**
   * The tool the developer made the remaining artwork with, where there is any.
   * Rendered on its own labelled line rather than inside the sentence: Hungarian
   * suffixes the tool name ("Inkscape-ben" but "Unityvel"), so it cannot be spliced.
   */
  graphicsTool?: string;
  /**
   * Ships no typeface of its own and sets text in the platform font. Verified by there
   * being no font file, no `FontFamily`, and no `UIAppFonts` entry in the app.
   */
  usesSystemFont?: boolean;
  /** Typefaces the app bundles. Mutually exclusive with `usesSystemFont`. */
  fonts?: BundledFont[];
  /**
   * Renders the safety caveat. Set only where being wrong has consequences beyond the
   * app: water levels can be delayed or missing, and must not be relied on for safety.
   */
  hasDataDisclaimer?: boolean;
}

const PIXABAY = 'https://pixabay.com/sound-effects';

export const appResources: AppResources[] = [
  {
    app: 'rect',
    name: 'Rectangle',
    languages: ['en', 'es', 'fr', 'hi', 'zh'],
    themeColor: '#f4f6f5',
    sounds: [
      {
        use: 'background',
        title: 'Musical relaxing guitar loop v5',
        url: `${PIXABAY}/musical-relaxing-guitar-loop-v5-245859/`,
      },
      {
        use: 'tap',
        title: 'Film special effects tap notification',
        url: `${PIXABAY}/film-special-effects-tap-notification-180637/`,
      },
      {
        use: 'transition',
        title: 'Film special effects transition base',
        url: `${PIXABAY}/film-special-effects-transition-base-121422/`,
      },
      {
        use: 'error',
        title: 'Film special effects training program incorrect',
        url: `${PIXABAY}/film-special-effects-training-program-incorrect1-88736/`,
      },
    ],
    usesMaterialIcons: true,
    usesSystemFont: true,
    graphicsTool: 'Inkscape',
  },
  {
    app: 'dhess',
    name: 'Dhess',
    languages: ['en', 'es', 'fr', 'hi', 'zh'],
    themeColor: '#f4f6f5',
    sounds: [
      {
        use: 'move',
        title: 'Household wood door knock',
        url: `${PIXABAY}/household-wood-door-knock-106669/`,
      },
      {
        use: 'completion',
        title: 'Musical digital success chime',
        url: `${PIXABAY}/musical-digital-success-chime-futuristic-ui-notification-sfx-562086/`,
      },
      {
        use: 'error',
        title: 'Film special effects training program incorrect',
        url: `${PIXABAY}/film-special-effects-training-program-incorrect1-88736/`,
      },
    ],
    usesMaterialIcons: true,
    usesSystemFont: true,
    graphicsTool: 'Inkscape',
  },
  {
    app: 'filler',
    name: 'The Filler',
    languages: ['en', 'es', 'fr', 'hi', 'zh'],
    themeColor: '#081722',
    sounds: [
      {
        use: 'levelComplete',
        title: 'Film special effects spin complete',
        url: `${PIXABAY}/film-special-effects-spin-complete-295086/`,
      },
      {
        use: 'levelFailed',
        title: 'Film special effects negative beeps',
        url: `${PIXABAY}/film-special-effects-negative-beeps-6008/`,
      },
      {
        use: 'tap',
        title: 'Film special effects computer mouse click 02',
        url: `${PIXABAY}/film-special-effects-computer-mouse-click-02-383961/`,
      },
      {
        use: 'ballBurst',
        title: 'Film special effects error mistake sound effect incorrect answer',
        url: `${PIXABAY}/film-special-effects-error-mistake-sound-effect-incorrect-answer-437420/`,
      },
    ],
    usesMaterialIcons: true,
    fonts: [
      {
        name: 'Baloo 2',
        copyright: 'Copyright 2019 The Baloo 2 Project Authors',
        url: 'https://fonts.google.com/specimen/Baloo+2',
      },
      {
        name: 'Noto Sans SC',
        copyright: "Copyright 2014-2021 Adobe, with Reserved Font Name 'Source'",
        url: 'https://fonts.google.com/noto/specimen/Noto+Sans+SC',
      },
    ],
    graphicsTool: 'Unity',
  },
  {
    app: 'vizallas',
    name: 'Vízállás',
    languages: ['en', 'hu'],
    themeColor: '#f4f6f5',
    dataSources: [
      {
        use: 'waterLevel',
        name: 'Országos Vízügyi Főigazgatóság (OVF) — ovszws',
        url: 'https://hydroinfo.hu/WSCSS/ovszws/api.php',
      },
      {
        use: 'news',
        name: 'Google News',
        url: 'https://news.google.com/',
      },
    ],
    usesMaterialIcons: true,
    usesSystemFont: true,
    graphicsTool: 'Inkscape',
    hasDataDisclaimer: true,
  },
];

export function appResourcesFor(app: string): AppResources | undefined {
  return appResources.find((entry) => entry.app === app);
}
