/**
 * The words around the resource lists, in every language the site offers.
 *
 * Kept apart from `resources.ts` on purpose: the list itself is the same in every
 * language, only this wrapper is translated. Where a phrase already exists in the privacy
 * policies — the Pixabay licence name, what each sound is used for — it is reused verbatim
 * rather than translated a second time, so the two documents cannot disagree.
 *
 * Sentences are never assembled from fragments around a link. Hindi puts its postposition
 * after the licence name and Chinese needs no preposition at all, so splicing would produce
 * broken grammar in half these languages; the licence is rendered on its own labelled line.
 */
import type { LanguageCode } from './site';

export interface ResourceText {
  /** BCP-47 tag for `<html lang>`. */
  language: string;
  /** Page heading, and the second half of the `<title>`. */
  heading: string;
  /** `{app}` is replaced with the app's name. */
  descriptionTemplate: string;
  soundsHeading: string;
  soundsIntro: string;
  licenseLabel: string;
  /**
   * What goes between a label and its value. Not always ": " — Chinese sets a full-width
   * colon, French puts a space before it. Mirrors `fullStop` in `site.ts`.
   */
  colon: string;
  pixabayLicense: string;
  iconsHeading: string;
  iconsText: string;
  apacheLicense: string;
  fontHeading: string;
  /** Shown where the app bundles no typeface of its own. */
  fontText: string;
  /** Shown instead where it does. */
  fontsIntro: string;
  oflLicense: string;
  graphicsHeading: string;
  graphicsText: string;
  toolLabel: string;
  privacyLink: string;
  /** What the app uses each credited work for, keyed as in `resources.ts`. */
  useLabels: Record<string, string>;
}

/** Vízállás ships in English and Hungarian only, so its sections need no other language. */
export interface WaterResourceText {
  dataHeading: string;
  dataIntro: string;
  disclaimerHeading: string;
  disclaimerText: string;
  useLabels: Record<string, string>;
}

export const resourceText: Record<LanguageCode, ResourceText> = {
  en: {
    language: 'en-US',
    heading: 'Resources',
    descriptionTemplate: 'Third-party works and data sources used by the {app} app.',
    soundsHeading: 'Sound credits',
    soundsIntro: 'The sounds used in the app are from Pixabay.',
    licenseLabel: 'License',
    colon: ': ',
    pixabayLicense: 'Pixabay Content License',
    iconsHeading: 'Icons',
    iconsText: 'The app uses Material Design Icons.',
    apacheLicense: 'Apache License 2.0',
    fontHeading: 'Font',
    fontText:
      'The app ships no typeface of its own. Text is set in the font the operating system provides: Roboto on Android, San Francisco on iOS.',
    fontsIntro: 'The app ships the following typefaces.',
    oflLicense: 'SIL Open Font License 1.1',
    graphicsHeading: 'Graphics',
    graphicsText: 'The remaining graphics were created by the developer.',
    toolLabel: 'Tool',
    privacyLink: 'Privacy policy',
    useLabels: {
      background: 'Background music',
      tap: 'Tap sound',
      transition: 'Transition sound',
      error: 'Error sound',
      move: 'Move sound',
      completion: 'Completion sound',
      levelComplete: 'Level complete',
      levelFailed: 'Level failed',
      ballBurst: 'Ball burst',
    },
  },
  zh: {
    language: 'zh-CN',
    heading: '资源',
    descriptionTemplate: '{app} 应用使用的第三方作品与数据来源。',
    soundsHeading: '音效来源',
    soundsIntro: '本应用中使用的音效来自 Pixabay。',
    licenseLabel: '许可协议',
    colon: '：',
    pixabayLicense: 'Pixabay 内容许可协议',
    iconsHeading: '图标',
    iconsText: '本应用使用 Material Design Icons。',
    apacheLicense: 'Apache 2.0 许可协议',
    fontHeading: '字体',
    fontText:
      '本应用不包含自带字体。文字使用操作系统提供的字体：Android 上为 Roboto，iOS 上为 San Francisco。',
    fontsIntro: '本应用包含以下字体。',
    oflLicense: 'SIL 开放字体许可协议 1.1',
    graphicsHeading: '图形',
    graphicsText: '其余图形由开发者自行制作。',
    toolLabel: '工具',
    privacyLink: '隐私政策',
    useLabels: {
      background: '背景音乐',
      tap: '点击音效',
      transition: '过渡音效',
      error: '错误音效',
      move: '移动音效',
      completion: '完成音效',
      levelComplete: '关卡通关',
      levelFailed: '关卡失败',
      ballBurst: '球体爆裂',
    },
  },
  hi: {
    language: 'hi-IN',
    heading: 'संसाधन',
    descriptionTemplate: '{app} ऐप में उपयोग किए गए तृतीय-पक्ष कार्य और डेटा स्रोत।',
    soundsHeading: 'ध्वनि श्रेय',
    soundsIntro: 'ऐप में उपयोग की गई ध्वनियाँ Pixabay से हैं।',
    licenseLabel: 'लाइसेंस',
    colon: ': ',
    pixabayLicense: 'Pixabay सामग्री लाइसेंस',
    iconsHeading: 'आइकन',
    iconsText: 'ऐप Material Design Icons का उपयोग करता है।',
    apacheLicense: 'Apache License 2.0',
    fontHeading: 'फ़ॉन्ट',
    fontText:
      'ऐप अपना कोई फ़ॉन्ट शामिल नहीं करता। टेक्स्ट ऑपरेटिंग सिस्टम द्वारा दिए गए फ़ॉन्ट में दिखाया जाता है: Android पर Roboto, iOS पर San Francisco।',
    fontsIntro: 'ऐप में निम्नलिखित फ़ॉन्ट शामिल हैं।',
    oflLicense: 'SIL ओपन फ़ॉन्ट लाइसेंस 1.1',
    graphicsHeading: 'ग्राफ़िक्स',
    graphicsText: 'शेष ग्राफ़िक्स डेवलपर द्वारा स्वयं बनाए गए हैं।',
    toolLabel: 'उपकरण',
    privacyLink: 'गोपनीयता नीति',
    useLabels: {
      background: 'पृष्ठभूमि संगीत',
      tap: 'टैप की आवाज़',
      transition: 'संक्रमण ध्वनि',
      error: 'त्रुटि ध्वनि',
      move: 'मूव साउंड',
      completion: 'पूर्णता ध्वनि',
      levelComplete: 'स्तर पूरा',
      levelFailed: 'स्तर विफल',
      ballBurst: 'गेंद फूटी',
    },
  },
  es: {
    language: 'es-ES',
    heading: 'Recursos',
    descriptionTemplate: 'Obras de terceros y fuentes de datos utilizadas por la aplicación {app}.',
    soundsHeading: 'Créditos de sonido',
    soundsIntro: 'Los sonidos utilizados en la aplicación proceden de Pixabay.',
    licenseLabel: 'Licencia',
    colon: ': ',
    pixabayLicense: 'Licencia de contenido de Pixabay',
    iconsHeading: 'Iconos',
    iconsText: 'La aplicación utiliza Material Design Icons.',
    apacheLicense: 'Licencia Apache 2.0',
    fontHeading: 'Tipografía',
    fontText:
      'La aplicación no incluye ninguna tipografía propia. El texto se muestra con la fuente que proporciona el sistema operativo: Roboto en Android y San Francisco en iOS.',
    fontsIntro: 'La aplicación incluye las siguientes tipografías.',
    oflLicense: 'Licencia SIL Open Font 1.1',
    graphicsHeading: 'Gráficos',
    graphicsText: 'Los demás gráficos los ha creado el desarrollador.',
    toolLabel: 'Herramienta',
    privacyLink: 'Política de privacidad',
    useLabels: {
      background: 'Música de fondo',
      tap: 'Sonido al pulsar',
      transition: 'Sonido de transición',
      error: 'Sonido de error',
      move: 'Sonido de movimiento',
      completion: 'Sonido de finalización',
      levelComplete: 'Nivel completado',
      levelFailed: 'Nivel fallido',
      ballBurst: 'Explosión de una bola',
    },
  },
  fr: {
    language: 'fr-FR',
    heading: 'Ressources',
    descriptionTemplate: 'Œuvres de tiers et sources de données utilisées par l’application {app}.',
    soundsHeading: 'Crédits sonores',
    soundsIntro: 'Les sons utilisés dans l’application proviennent de Pixabay.',
    licenseLabel: 'Licence',
    colon: ' : ',
    pixabayLicense: 'licence de contenu Pixabay',
    iconsHeading: 'Icônes',
    iconsText: 'L’application utilise Material Design Icons.',
    apacheLicense: 'Licence Apache 2.0',
    fontHeading: 'Police',
    fontText:
      'L’application n’embarque aucune police. Le texte utilise la police fournie par le système d’exploitation : Roboto sur Android, San Francisco sur iOS.',
    fontsIntro: 'L’application embarque les polices suivantes.',
    oflLicense: 'Licence SIL Open Font 1.1',
    graphicsHeading: 'Graphismes',
    graphicsText: 'Les autres graphismes ont été créés par le développeur.',
    toolLabel: 'Outil',
    privacyLink: 'Politique de confidentialité',
    useLabels: {
      background: 'Musique de fond',
      tap: 'Son de clic',
      transition: 'Son de transition',
      error: 'Son d’erreur',
      move: 'Son de déplacement',
      completion: 'Son de fin d’action',
      levelComplete: 'Niveau terminé',
      levelFailed: 'Échec du niveau',
      ballBurst: 'Éclatement d’une balle',
    },
  },
  hu: {
    language: 'hu-HU',
    heading: 'Források',
    descriptionTemplate: 'A(z) {app} alkalmazás által használt külső művek és adatforrások.',
    soundsHeading: 'Hangok',
    soundsIntro: 'Az alkalmazásban használt hangok a Pixabay-ről származnak.',
    licenseLabel: 'Licenc',
    colon: ': ',
    pixabayLicense: 'Pixabay tartalomlicenc',
    iconsHeading: 'Ikonok',
    iconsText: 'Az alkalmazás a Material Design Icons készletet használja.',
    apacheLicense: 'Apache License 2.0',
    fontHeading: 'Betűtípus',
    fontText:
      'Az alkalmazás nem tartalmaz saját betűtípust. A szöveg az operációs rendszer betűtípusával jelenik meg: Androidon Roboto, iOS-en San Francisco.',
    fontsIntro: 'Az alkalmazás az alábbi betűtípusokat tartalmazza.',
    oflLicense: 'SIL Open Font License 1.1',
    graphicsHeading: 'Grafika',
    graphicsText: 'A többi grafikát a fejlesztő készítette.',
    toolLabel: 'Eszköz',
    privacyLink: 'Adatvédelmi tájékoztató',
    useLabels: {
      background: 'Háttérzene',
      tap: 'Koppintás hangja',
      transition: 'Átmenet hangja',
      error: 'Hibajelzés',
      move: 'Lépés hangja',
      completion: 'Befejezés hangja',
      levelComplete: 'Szint teljesítve',
      levelFailed: 'Szint elbukva',
      ballBurst: 'Golyó szétpattanása',
    },
  },
};

export const waterResourceText: Record<'en' | 'hu', WaterResourceText> = {
  en: {
    dataHeading: 'Data sources',
    dataIntro:
      'Water-level data comes from the official web service of the Hungarian General ' +
      'Directorate of Water Management (OVF), which granted written permission to use it ' +
      'with attribution.',
    disclaimerHeading: 'About the data',
    disclaimerText:
      'The water levels shown are for information only. Readings can be delayed, missing, ' +
      'or corrected later by the operator, and a forecast is an estimate rather than a ' +
      'promise. Do not rely on this app for flood, navigation, or any other safety ' +
      'decision — follow the official warnings of the water authority instead.',
    useLabels: {
      waterLevel: 'Water levels and forecasts',
      news: 'News headlines',
    },
  },
  hu: {
    dataHeading: 'Adatforrások',
    dataIntro:
      'A vízállásadatok az Országos Vízügyi Főigazgatóság (OVF) hivatalos webszervízéből ' +
      'származnak, amely írásban engedélyezte a felhasználásukat a forrás megjelölésével.',
    disclaimerHeading: 'Az adatokról',
    disclaimerText:
      'A megjelenített vízállások tájékoztató jellegűek. Az értékek késhetnek, ' +
      'hiányozhatnak, vagy az üzemeltető utólag javíthatja őket, az előrejelzés pedig ' +
      'becslés, nem ígéret. Árvízi, hajózási vagy bármilyen más biztonsági döntést ne erre ' +
      'az alkalmazásra alapozz — ilyenkor a vízügyi szolgálat hivatalos tájékoztatása az ' +
      'irányadó.',
    useLabels: {
      waterLevel: 'Vízállás és előrejelzés',
      news: 'Hírek',
    },
  },
};

export const OFL_URL = 'https://openfontlicense.org/';
export const PIXABAY_LICENSE_URL = 'https://pixabay.com/service/license-summary/';
export const APACHE_LICENSE_URL = 'https://www.apache.org/licenses/LICENSE-2.0';
export const MATERIAL_ICONS_URL = 'https://fonts.google.com/icons';
