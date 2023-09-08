import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as components from 'vuetify/components';
import * as labComponents from 'vuetify/labs/components';
import * as directives from 'vuetify/directives';
import { PurpleTheme } from '@/theme/LightTheme';
import { aliases, fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
  components: {
    ...components,
    ...labComponents,
  },
  directives,

  theme: {
    defaultTheme: 'PurpleTheme',
    themes: {
      PurpleTheme,
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md',
    },
    VTextField: {
      rounded: 'lg',
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top',
    },
  },
});
