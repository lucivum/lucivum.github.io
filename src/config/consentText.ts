/**
 * The cookie banner, in every language the site offers. Accepting and refusing are worded
 * and shown alike: neither is the default, and refusing takes no more effort than accepting.
 */
import type { LanguageCode } from './site';

export interface ConsentText {
  message: string;
  accept: string;
  reject: string;
  /** Footer link that brings the banner back, to change the choice. */
  settings: string;
  /** Link from the banner and the footer to the website's privacy policy. */
  policy: string;
}

export const consentText: Record<LanguageCode, ConsentText> = {
  en: {
    message: 'This site uses Google Analytics cookies, only if you accept.',
    accept: 'Accept',
    reject: 'Reject',
    settings: 'Cookie settings',
    policy: 'Privacy policy',
  },
  zh: {
    message: '本网站仅在您同意后使用 Google Analytics Cookie。',
    accept: '接受',
    reject: '拒绝',
    settings: 'Cookie 设置',
    policy: '隐私政策',
  },
  hi: {
    message: 'यह साइट केवल आपकी सहमति से Google Analytics कुकीज़ का उपयोग करती है।',
    accept: 'स्वीकार करें',
    reject: 'अस्वीकार करें',
    settings: 'कुकी सेटिंग्स',
    policy: 'गोपनीयता नीति',
  },
  es: {
    message: 'Este sitio usa cookies de Google Analytics solo si las aceptas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    settings: 'Configuración de cookies',
    policy: 'Política de privacidad',
  },
  fr: {
    message: 'Ce site utilise des cookies Google Analytics uniquement si vous les acceptez.',
    accept: 'Accepter',
    reject: 'Refuser',
    settings: 'Paramètres des cookies',
    policy: 'Politique de confidentialité',
  },
  hu: {
    message: 'Ez az oldal csak a hozzájárulásoddal használ Google Analytics sütiket.',
    accept: 'Elfogadom',
    reject: 'Elutasítom',
    settings: 'Sütibeállítások',
    policy: 'Adatvédelmi tájékoztató',
  },
};
