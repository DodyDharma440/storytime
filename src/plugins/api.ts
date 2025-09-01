import type { $Fetch, FetchOptions } from "ofetch";

import AuthRepository from "~/repositories/modules/auth";
import StoryRepository from "~/repositories/modules/story";
import UserRepository from "~/repositories/modules/user";

interface IApiInstance {
  auth: AuthRepository;
  story: StoryRepository;
  user: UserRepository;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const fetchOptions: FetchOptions = {
    baseURL: `${config.public.API_BASE_URL}/api/backend`,
  };

  const apiFetcher = $fetch.create(fetchOptions) as $Fetch;

  const instances: IApiInstance = {
    auth: new AuthRepository(apiFetcher),
    story: new StoryRepository(apiFetcher),
    user: new UserRepository(apiFetcher),
  };

  const token = useCookie("auth-token");
  const authToken = useState("__auth_token", () => token);

  return {
    provide: {
      api: instances,
      token: authToken.value,
    },
  };
});
