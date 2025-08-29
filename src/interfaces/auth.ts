import type { ApiResponse } from "./api";
import type { IUser } from "./user";

export interface ILoginForm {
  username_or_email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface IAuthResponse extends Omit<ApiResponse<any>, "data"> {
  user: IUser;
  token: string;
}

export interface IAuthRepository {
  login(data: ILoginForm): Promise<IAuthResponse>;
  register(data: IRegisterForm): Promise<IAuthResponse>;
  logout(): Promise<ApiResponse<any>>;
  setToken(data: { token: string }): Promise<any>;
}
