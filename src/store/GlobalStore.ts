import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

/** Global Store */
const useGlobalStore = defineStore('global', () => {
  // State

  /** Loading overlay */
  const loading: Ref<boolean> = ref(true);
  /** ProgressBar Percentage */
  const progress: Ref<number | null> = ref(null);
  /** SnackBar Text */
  const message: Ref<string> = ref('');

  /** Drawer */
  const drawer: Ref<boolean> = ref(true);

  // Actions

  /**
   * Show loading Overlay
   *
   * @param display - visibility
   */
  function setLoading(display: boolean): void {
    loading.value = display;
    if (!display) {
      // Reset Progress value
      progress.value = null;
    }
  }

  /**
   * Update progress value
   *
   * @param v - progress value
   */
  function setProgress(v: number | null = null): void {
    // update progress value
    progress.value = v;
    // display loading overlay
    loading.value = true;
  }

  /**
   * Show snackbar message
   *
   * @param msg - snackbar message
   */
  function setMessage(msg = ''): void {
    // put snackbar text
    message.value = msg;
  }

  /**
   * Show drawer
   */
  function toggleDrawer(): void {
    drawer.value = !drawer.value;
  }

  return {
    loading,
    progress,
    message,
    drawer,
    setLoading,
    setProgress,
    setMessage,
    toggleDrawer,
  };
});

export default useGlobalStore;
