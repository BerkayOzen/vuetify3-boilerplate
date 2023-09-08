import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';

export interface User {
  id: number;
  username: string;
  email: string;
}

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const token = useStorage('token', '');
  const localUser = useStorage('user', '');

  const user = ref<Partial<User>>();
  const loading = ref(true);

  const isLoggedIn = computed(
    () => token.value !== undefined && token.value !== ''
  );

  function setUser(newUser: Partial<User>) {
    user.value = newUser;
    localUser.value = JSON.stringify(newUser);
  }

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading;
  }

  async function logoutUser() {
    token.value = undefined;
    localUser.value = undefined;
    user.value = undefined;
    //await localStorage.removeItem('token');
    //await localStorage.removeItem('user');
  }

  return {
    user,
    token,
    isLoggedIn,
    loading,
    logoutUser,
    setUser,
    setToken,
    setLoading,
  } as const;
});

export default useUserSession;

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot));
}
