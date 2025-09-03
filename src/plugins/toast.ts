export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const toastStore = useToastStore();

  return {
    provide: {
      toast: toastStore,
    },
  };
});
