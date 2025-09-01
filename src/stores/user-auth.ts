import type { IUser, IUserRepository } from "~/interfaces/user";

// const initialState: IUserAuthStore = {
//   user: null,
//   isLoading: false,
// };

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

// export const useUserAuthStore = defineStore("user-auth", {
//   state: () => initialState,
//   actions: {
//     setUser(value: IUser) {
//       this.user = value;
//     },
//     async getUser(repository: IUserRepository) {
//       this.isLoading = true;
//       const res = await repository.getProfile();
//       this.user = res.data;
//       console.log("get user");
//       this.isLoading = false;
//     },
//     resetUser() {
//       this.user = null;
//     },
//   },
// });
