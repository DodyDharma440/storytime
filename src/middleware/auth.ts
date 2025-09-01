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
    const res = await $fetch<{ token: string | null }>(
      "http://localhost:3001/api/get-token"
    );
    return handleRedirect(res.token, to.path);
  }

  const token = useCookie("auth-token");
  return handleRedirect(token.value ?? null, to.path);
});
