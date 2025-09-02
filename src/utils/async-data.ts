// export const get = (key: string, apiFn: ) => {
//     return useAsyncData(LATEST_STORIES, () => {
//       return $api.story.getStories({ limit: 5 }, false);
//     });
// }

import type { AsyncDataOptions, NuxtApp } from "#app";

import type { ErrorResponse } from "~/interfaces/api";

type FindFn<T, P> = (args: P, ctx?: NuxtApp) => Promise<T>;

// type MutationFn<P, R> = (args: P) => Promise<AxiosResponse<R>>;

type FindFnQueryKey<P> =
  | MaybeRefOrGetter<string>
  | ((args?: P) => MaybeRefOrGetter<string>);

// export type FindAll<D extends object> = { urlParams?: string } & D;
export const createAsyncGet = <
  E extends Record<string, any> = Record<string, any>,
  T = any,
  P = Record<string, any>
>(
  apiFn: FindFn<T, P>,
  queryKey: FindFnQueryKey<P>
) => {
  const useComposableFn = (args?: P, options?: AsyncDataOptions<T>) => {
    const key = queryKey instanceof Function ? queryKey(args) : queryKey;
    return useAsyncData<T, ErrorResponse<E>>(
      key,
      (ctx) => apiFn(args || ({} as P), ctx),
      options
    );
  };

  return useComposableFn;
};
