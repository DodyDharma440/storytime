import type { ToastItem, ToastPayload, ToastStatus } from "~/interfaces/toast";

const createToast = (text: string, status: ToastStatus): ToastItem => ({
  text,
  status,
  id: Math.random() * 10000,
});
const DEFAULT_TIMEOUT = 3000;

export const useToastStore = defineStore("toasts", () => {
  const toasts = ref<ToastItem[]>([]);

  const updateState = (payload: ToastPayload, status: ToastStatus) => {
    const { text, timeout } = payload;
    const toast = createToast(text, status);

    toasts.value = [...toasts.value, toast];

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id);
    }, timeout ?? DEFAULT_TIMEOUT);
  };

  const success = (payload: ToastPayload) => {
    updateState(payload, "success");
  };

  const warning = (payload: ToastPayload) => {
    updateState(payload, "warning");
  };

  const error = (payload: ToastPayload) => {
    updateState(payload, "error");
  };

  const close = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return { toasts, success, warning, error, close };
});
