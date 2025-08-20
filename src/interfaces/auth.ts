import type { ApiResponse } from "./api";
import type { IUser } from "./user";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse extends Omit<ApiResponse<any>, "data"> {
  user: IUser;
  token: string;
}
