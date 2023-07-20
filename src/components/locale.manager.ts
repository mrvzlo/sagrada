import i18n from '@/i18n';
import CookieManager from './cookie-manager';

export default class LocaleManager {
   private locales = ['ru', 'en'];
   private nativeNames = ['RU', 'EN'];
   public current = '';
   private key = 'locale';

   private cookieManager = new CookieManager();

   constructor() {
      const current = this.cookieManager.getCookie(this.key);
      this.setLocale(current);
   }

   toggleLocale() {
      this.setLocale(this.nextLocale());
   }

   private nextLocale(): string {
      return this.locales[this.nextLocaleId()];
   }

   private nextLocaleId(): number {
      const current = this.locales.indexOf(i18n.global.locale.value);
      return (current + 1) % this.locales.length;
   }

   nextLocaleNativeName(): string {
      return this.nativeNames[this.nextLocaleId()];
   }

   private setLocale(newLocale: string) {
      this.current = newLocale;
      i18n.global.locale.value = newLocale;
      this.cookieManager.setCookie(this.key, newLocale, 14);
   }
}
