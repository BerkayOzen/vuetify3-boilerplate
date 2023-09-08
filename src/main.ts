import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import store from '@/store';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import axios from '@/plugins/axios';
import VueAxios from 'vue-axios';
//import i18n from '@/plugins/i18n';
import Maska from 'maska';
import mitt from 'mitt';

const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);
//app.use(i18n);
app.use(vuetify).mount('#app');
