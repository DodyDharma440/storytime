import type { $Fetch, FetchOptions } from "ofetch";

import AuthRepository from "~/repositories/authRepository";

interface IApiInstance {
  auth: AuthRepository;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const fetchOptions: FetchOptions = {
    baseURL: config.public.API_BASE_URL,
  };

  const apiFetcher = $fetch.create(fetchOptions);

  const instances: IApiInstance = {
    auth: new AuthRepository(apiFetcher as $Fetch),
  };

  return {
    provide: {
      api: instances,
    },
  };
});
