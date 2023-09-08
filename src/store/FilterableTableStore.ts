import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useFilterableTableStore = defineStore(
  'filterableTableStore',
  () => {
    const updateData: Ref<boolean> = ref(true);
    const loading: Ref<boolean> = ref(false);
    const action: Ref = ref({
      from: null,
      status: false,
      type: null,
      item: null,
    });

    function reset() {
      updateData.value = true;
      loading.value = false;
      action.value = {
        from: null,
        status: false,
        type: null,
        item: null,
      };
    }

    function setUpdateData(state: boolean) {
      updateData.value = state;
    }

    function setLoading(state: boolean) {
      loading.value = state;
    }

    function setAction(state: object) {
      action.value = state;
    }

    return {
      updateData,
      loading,
      action,
      setUpdateData,
      setLoading,
      setAction,
      reset,
    } as const;
  }
);

export default useFilterableTableStore;
