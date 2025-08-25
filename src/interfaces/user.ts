import type { ApiResponse } from "./api";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  profile_image: string | null;
  about: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUpdateProfileForm {
  name: string;
  about: string;
  old_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
  temp_profile_picture?: File | null;
  profile_picture?: File | null;
}

export interface IUserRepository {
  getProfile(): Promise<ApiResponse<IUser>>;
  updateProfile(
    data: Omit<IUpdateProfileForm, "temp_profile_picture" | "profile_picture">
  ): Promise<ApiResponse<IUser>>;
  updateProfilePicture(data: FormData): Promise<ApiResponse<IUser>>;
}
