export const useLogin = createMutation((api) => api.auth.login.bind(api.auth), {
  successMessage: "Login success",
  onSuccess: async (res) => {
    const { $api } = useNuxtApp();
    const userStore = useUserAuthStore();

    const token = res.data.token;
    await $api.auth.setToken({ token });
    userStore.setUser(res.data.user);
    useState("__auth_token", () => res.data.token);
    navigateTo("/dashboard", { replace: true });
  },
});

export const useRegister = createMutation(
  (api) => api.auth.register.bind(api.auth),
  {
    successMessage: "Register success!",
    onSuccess: async (res) => {
      const { $api } = useNuxtApp();

      const token = res.data.token;
      await $api.auth.setToken({ token });
      navigateTo("/dashboard", { replace: true });
    },
  }
);

export const useLogout = createMutation(
  (api) => async () => {
    return await Promise.all([api.auth.logout(), api.auth.clearToken()]);
  },
  {
    successMessage: "Logout success",
    onSuccess: async () => {
      const userStore = useUserAuthStore();
      clearNuxtState("__auth_token");
      userStore.resetUser();
      navigateTo("/login", { replace: true });
    },
  }
);
