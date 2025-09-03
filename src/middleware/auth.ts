const handleRedirect = (token: string | null, path: string) => {
  if (["/login", "/register"].includes(path)) {
    if (token) {
      return navigateTo("/dashboard");
    }
  } else {
    if (!token) {
      return navigateTo("/login");
    }
  }
};

export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.server) {
    let token = useState<string | null>("__auth_token").value;
    if (!token) {
      const res = await $fetch<{ token: string | null }>("/api/get-token");
      token = res.token;
    }
    return handleRedirect(token, to.path);
  }

  const token = useCookie("auth-token");
  return handleRedirect(token.value ?? null, to.path);
});
