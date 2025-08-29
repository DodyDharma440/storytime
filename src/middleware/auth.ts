export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("auth-token");

  if (["/login", "/register"].includes(to.path)) {
    if (token) {
      return navigateTo("/dashboard");
    }
  } else {
    if (!token) {
      return navigateTo("/login");
    }
  }
});
