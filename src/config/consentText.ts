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
    message:
      'This site uses Google Ads cookies to measure visits and clicks on the Google Play buttons. They are set only if you accept.',
    accept: 'Accept',
    reject: 'Reject',
    settings: 'Cookie settings',
    policy: 'Privacy policy',
  },
  zh: {
    message: '本网站使用 Google Ads Cookie 统计访问量和 Google Play 按钮的点击次数。只有在您同意后才会设置这些 Cookie。',
    accept: '接受',
    reject: '拒绝',
    settings: 'Cookie 设置',
    policy: '隐私政策',
  },
  hi: {
    message:
      'यह साइट विज़िट और Google Play बटन पर क्लिक मापने के लिए Google Ads कुकीज़ का उपयोग करती है। ये केवल तभी सेट होती हैं जब आप स्वीकार करते हैं।',
    accept: 'स्वीकार करें',
    reject: 'अस्वीकार करें',
    settings: 'कुकी सेटिंग्स',
    policy: 'गोपनीयता नीति',
  },
  es: {
    message:
      'Este sitio usa cookies de Google Ads para medir las visitas y los clics en los botones de Google Play. Solo se instalan si las aceptas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    settings: 'Configuración de cookies',
    policy: 'Política de privacidad',
  },
  fr: {
    message:
      'Ce site utilise des cookies Google Ads pour mesurer les visites et les clics sur les boutons Google Play. Ils ne sont déposés que si vous les acceptez.',
    accept: 'Accepter',
    reject: 'Refuser',
    settings: 'Paramètres des cookies',
    policy: 'Politique de confidentialité',
  },
  hu: {
    message:
      'Ez az oldal Google Ads sütiket használ a látogatások és a Google Play gombokra leadott kattintások mérésére. Csak akkor kerülnek beállításra, ha elfogadod.',
    accept: 'Elfogadom',
    reject: 'Elutasítom',
    settings: 'Sütibeállítások',
    policy: 'Adatvédelmi tájékoztató',
  },
};
