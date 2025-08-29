import type { ApiResponse } from "~/interfaces/api";
import type {
  IAuthRepository,
  IAuthResponse,
  ILoginForm,
  IRegisterForm,
} from "~/interfaces/auth";
import HttpFactory from "~/repositories/factory";

class AuthRepository extends HttpFactory implements IAuthRepository {
  async setToken(data: { token: string }): Promise<any> {
    const config = useRuntimeConfig();
    return await this.call(
      `${config.public.BASE_URL}/api/set-token`,
      "POST",
      data
    );
  }

  async login(data: ILoginForm): Promise<IAuthResponse> {
    return await this.call(`/login`, "POST", data);
  }

  async register(data: IRegisterForm): Promise<IAuthResponse> {
    return await this.call(`/register`, "POST", data);
  }

  async logout(): Promise<ApiResponse<any>> {
    return await this.call<ApiResponse<any>>(`/logout`, "DELETE");
  }
}

export default AuthRepository;
