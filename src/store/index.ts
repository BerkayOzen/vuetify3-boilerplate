import { createPinia, type Pinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Pinia Stores
import useConfig from '@/store/ConfigStore';
import useGlobal from '@/store/GlobalStore';
import useFilterableTableStore from '@/store/FilterableTableStore';
import useCountryStore from '@/store/CountryStore';
import useCurrencyStore from '@/store/CurrencyStore';
import useBOQTemplateStore from '@/store/BOQTemplateStore';
import useOrganizationStore from '@/store/OrganizationStore';
import useOfferScopeStore from '@/store/OfferScopeStore';
import useProjectStore from '@/store/ProjectStore';
import useWorkDisciplineStore from '@/store/WorkDisciplineStore';
import useUserSession from '@/store/UserSession';
import useRequestStore from '@/store/RequestStore';
import useUserStore from '@/store/UserStore';

/** Pinia Store */
const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

export {
  useConfig,
  useGlobal,
  useFilterableTableStore,
  useCountryStore,
  useCurrencyStore,
  useBOQTemplateStore,
  useOrganizationStore,
  useOfferScopeStore,
  useProjectStore,
  useWorkDisciplineStore,
  useUserSession,
  useRequestStore,
  useUserStore,
};
