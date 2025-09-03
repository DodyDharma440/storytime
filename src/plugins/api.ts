import type { $Fetch, FetchOptions } from "ofetch";

import AuthRepository from "~/repositories/modules/auth";
import StoryRepository from "~/repositories/modules/story";
import UserRepository from "~/repositories/modules/user";

interface IApiInstance {
  auth: AuthRepository;
  story: StoryRepository;
  user: UserRepository;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: `${config.public.API_BASE_URL}/api/backend`,
    onResponseError: async (error) => {
      if (error.response.status === 401) {
        if (import.meta.server) {
          const { ssrContext } = nuxtApp;
          const event = ssrContext?.event;

          if (event) {
            const { res } = event.node;
            res.setHeader(
              "Set-Cookie",
              "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
            );
            res.writeHead(302, {
              Location: "/login",
            });
            res.end();
          }
        } else {
          const userStore = useUserAuthStore();
          await $fetch("/api/clear-token", { method: "POST" });
          navigateTo("/login");
          clearNuxtState("__auth_token");
          userStore.resetUser();
        }
      }
    },
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
