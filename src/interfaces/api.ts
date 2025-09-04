import type AuthRepository from "~/repositories/modules/auth";
import type StoryRepository from "~/repositories/modules/story";
import type UserRepository from "~/repositories/modules/user";

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  status: number;
  data: T;
  meta?: {
    current_page: string;
    last_page: number;
    per_page: string;
    total: number;
  };
};

export interface ErrorResponse<T extends Record<string, any>> {
  response: {
    _data?: {
      success: boolean;
      message: string;
      errors: T;
      status: number;
    };
  };
}

export interface IApiInstance {
  auth: AuthRepository;
  story: StoryRepository;
  user: UserRepository;
}

export type PostData<T, D extends object = object> = { formValues: T } & D;

export type UpdateData<T, I = string, D extends object = object> = {
  formValues: T;
  id: I;
} & D;

export type DeleteData<I = string, D extends object = object> = { id: I } & D;
