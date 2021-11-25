import i18next from 'i18next';
import { LOCALE_MAPPING } from '@/config/constants';
import { initReactI18next } from 'react-i18next';
import { lans, resources, namespaces } from './load';
import LanguageDetector from 'i18next-browser-languagedetector';

// 多语言切换
const __resources = {} as any;

for (const p in resources as { [key in string]: any }) {
    const __p = (LOCALE_MAPPING as any)[p];
    if (__p === undefined) {
        __resources[p] = (resources as { [key in string]: any })[p];
    } else {
        __resources[__p] = (resources as { [key in string]: any })[p];
    }
}
i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: __resources as any,
        ns: namespaces as any,
        fallbackLng: 'en_US',
        preload: lans as any,
        defaultNS: 'common',
        debug: true,
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: false,
        },
    });

export default i18next;
