import type { IUserAuthStore } from "~/interfaces/auth";
import type { IUser, IUserRepository } from "~/interfaces/user";

const initialState: IUserAuthStore = {
  user: null,
  isLoading: false,
};

export const useUserAuthStore = defineStore("user-auth", {
  state: () => initialState,
  actions: {
    setUser(value: IUser) {
      this.user = value;
    },
    async getUser(repository: IUserRepository) {
      this.isLoading = true;
      const res = await repository.getProfile();
      this.user = res.data;
      this.isLoading = false;
    },
    resetUser() {
      this.user = null;
    },
  },
});
