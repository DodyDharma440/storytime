import type { ApiResponse, ErrorResponse } from "~/interfaces/api";

export type MutationOptions<P, R> = {
  mutationFn: (p: P) => Promise<R>;
  onSuccess?: (res: R) => void;
  onError?: (err: ErrorResponse<any>) => void;
  successMessage?: ((res: R) => string) | string;
};

export const useMutation = <P, T, R = ApiResponse<T>>({
  mutationFn,
  onSuccess,
  onError,
  successMessage,
}: MutationOptions<P, R>) => {
  const isLoading = ref(false);

  const mutate = async (
    p: P,
    options?: Omit<MutationOptions<P, R>, "mutationFn">
  ) => {
    isLoading.value = true;
    try {
      const res = await mutationFn(p);
      (options?.onSuccess || onSuccess)?.(res as R);
      if (successMessage || options?.successMessage) {
        // TODO: DISPLAY TOAST
        // useNuxtApp().$toast.success(options?.successMessage || successMessage);
      }

      isLoading.value = false;
    } catch (error: any) {
      (options?.onError || onError)?.(error);
      const message =
        error?.response?._data?.message ??
        error?.message ??
        "Something went wrong";

      // TODO: DISPLAY TOAST
      // useNuxtApp().$toast.error(message);
      // eslint-disable-next-line no-console
      console.log(message);
      isLoading.value = false;
    }
  };

  return { isLoading, mutate };
};
