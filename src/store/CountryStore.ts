import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export interface User {
  id: number;
  username: string;
  email: string;
}

export const useCountryStore = defineStore('countryStore', () => {
  const loading: Ref<boolean> = ref(false);
  const isEdit: Ref<boolean> = ref(false);
  const editItem: Ref<object | null> = ref(null);

  function setLoading(newLoading: boolean) {
    loading.value = newLoading;
  }

  function setIsEdit(newLoading: boolean) {
    isEdit.value = newLoading;
  }

  function setEditItem(newLoading: object) {
    editItem.value = newLoading;
  }

  return {
    isEdit,
    editItem,
    loading,
    setLoading,
    setIsEdit,
    setEditItem,
  } as const;
});

export default useCountryStore;