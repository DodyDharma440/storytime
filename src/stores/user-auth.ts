import type { IUser, IUserRepository } from "~/interfaces/user";

export const useUserAuthStore = defineStore("user-auth", () => {
  const user: Ref<IUser | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  function setUser(value: IUser) {
    user.value = value;
  }

  async function getUser(repository: IUserRepository) {
    isLoading.value = true;
    const res = await repository.getProfile();
    user.value = res.data;
    isLoading.value = false;
  }

  function resetUser() {
    user.value = null;
  }

  return { user, setUser, getUser, resetUser };
});
