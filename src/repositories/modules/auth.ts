import type { ApiResponse } from "~/interfaces/api";
import type {
  IAuthRepository,
  IAuthResponse,
  ILoginForm,
  IRegisterForm,
} from "~/interfaces/auth";
import HttpFactory from "~/repositories/factory";

class AuthRepository extends HttpFactory implements IAuthRepository {
  async clearToken(): Promise<any> {
    const config = useRuntimeConfig();
    return await this.call(`${config.public.BASE_URL}/api/clear-token`, {
      method: "POST",
    });
  }

  async setToken(data: { token: string }): Promise<any> {
    const config = useRuntimeConfig();
    return await this.call(`${config.public.BASE_URL}/api/set-token`, {
      method: "POST",
      data,
    });
  }

  async login(data: ILoginForm): Promise<ApiResponse<IAuthResponse>> {
    return await this.call(`/login`, { method: "POST", data });
  }

  async register(data: IRegisterForm): Promise<ApiResponse<IAuthResponse>> {
    return await this.call(`/register`, { method: "POST", data });
  }

  async logout(): Promise<ApiResponse<any>> {
    return await this.call<ApiResponse<any>>(`/logout`, { method: "DELETE" });
  }
}

export default AuthRepository;
