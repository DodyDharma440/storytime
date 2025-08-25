import type { $Fetch, FetchOptions } from "ofetch";

import AuthRepository from "~/repositories/modules/auth";
import StoryRepository from "~/repositories/modules/story";

interface IApiInstance {
  auth: AuthRepository;
  story: StoryRepository;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const fetchOptions: FetchOptions = {
    baseURL: config.public.API_BASE_URL,
  };

  const apiFetcher = $fetch.create(fetchOptions) as $Fetch;

  const instances: IApiInstance = {
    auth: new AuthRepository(apiFetcher),
    story: new StoryRepository(apiFetcher),
  };

  const token = useCookie("auth_token");
  const authToken = useState("__auth_token", () => token);

  return {
    provide: {
      api: instances,
      token: authToken.value,
    },
  };
});
