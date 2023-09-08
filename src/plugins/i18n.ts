import { createI18n } from 'vue-i18n';
import messages from '@/lang/messages';

export default createI18n({
  locale: 'tr',
  fallbackLocale: 'tr',
  legacy: false,
  messages: messages,
});
