import type { ApiResponse } from "~/interfaces/api";
import type {
  IAuthResponse,
  ILoginForm,
  IRegisterForm,
} from "~/interfaces/auth";

import HttpFactory from "./factory";

class AuthRepository extends HttpFactory {
  async login(data: ILoginForm) {
    return await this.call<IAuthResponse>(`/login`, "POST", data);
  }

  async register(data: IRegisterForm) {
    return await this.call<IAuthResponse>(`/register`, "POST", data);
  }

  async logout() {
    return await this.call<ApiResponse<any>>(`/logout`, "DELETE");
  }
}

export default AuthRepository;
