import type { ApiResponse, IApiInstance } from "~/interfaces/api";

type MutationFn<P, R> = (args: P) => Promise<R>;

type _MutationOptions<P, R> = Omit<MutationOptions<P, R>, "mutationFn"> & {
  mergeOnSuccess?: boolean;
  mergeOnError?: boolean;
};

export const createMutation = <P, R = ApiResponse<any>>(
  apiFn: (apiInstances: IApiInstance) => MutationFn<P, R>,
  defaultOptions?: _MutationOptions<P, R>
) => {
  const useComposableFn = (options?: _MutationOptions<P, R>) => {
    const { $api } = useNuxtApp();

    const _options: _MutationOptions<P, R> = {
      ...(defaultOptions || {}),
      ...(options || {}),
      onSuccess: (res) => {
        if (defaultOptions?.onSuccess) {
          defaultOptions.onSuccess(res);
        }
        if (options?.onSuccess) {
          options.onSuccess(res);
        }
      },
      onError: (res) => {
        if (defaultOptions?.onError) {
          defaultOptions.onError(res);
        }
        if (options?.onError) {
          options.onError(res);
        }
      },
    };

    return useMutation({
      mutationFn: apiFn($api),
      ..._options,
    });
  };

  return useComposableFn;
};
