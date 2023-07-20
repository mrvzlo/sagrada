import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';

function loadLocaleMessages(): { [x: string]: LocaleMessages<VueMessageType> } {
   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
   const messages: { [x: string]: LocaleMessages<VueMessageType> } = {};
   locales.keys().forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (!matched || matched.length < 2) return;
      const locale = matched[1];
      messages[locale] = locales(key);
   });
   return messages;
}

export default createI18n({
   legacy: false,
   globalInjection: true,
   locale: 'en',
   fallbackLocale: 'en',
   messages: loadLocaleMessages(),
});
