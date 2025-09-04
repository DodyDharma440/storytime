import type { $Fetch, FetchOptions } from "ofetch";

import type { IApiInstance } from "~/interfaces/api";
import AuthRepository from "~/repositories/modules/auth";
import StoryRepository from "~/repositories/modules/story";
import UserRepository from "~/repositories/modules/user";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: `${config.public.API_BASE_URL}`,
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
          clearNuxtState("__auth_token");
          userStore.resetUser();
          navigateTo("/login");
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
