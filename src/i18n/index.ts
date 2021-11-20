import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { LOCALE_MAPPING } from '@config';

i18next.use(resourcesToBackend((language, namespace, callback) => {
    const __lan = (LOCALE_MAPPING as any)[language] ? (LOCALE_MAPPING as any)[language]: language;
    import(`./locales/${__lan}/${namespace}.json`)
      .then((resources) => callback(null, resources))
      .catch((error) => callback(error, null))
  }))
.init({
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
});