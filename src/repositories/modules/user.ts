import type { ApiResponse } from "~/interfaces/api";
import type {
  IUpdateProfileForm,
  IUser,
  IUserRepository,
} from "~/interfaces/user";
import HttpFactory from "~/repositories/factory";

class UserRepository extends HttpFactory implements IUserRepository {
  private RESOURCE = "/user";

  async getProfile(): Promise<ApiResponse<IUser>> {
    return await this.call(`${this.RESOURCE}/profile`);
  }
  async updateProfile(
    data: Omit<IUpdateProfileForm, "temp_profile_picture" | "profile_picture">
  ): Promise<ApiResponse<IUser>> {
    return await this.call(`${this.RESOURCE}/profile`, {
      method: "PUT",
      data,
    });
  }
  async updateProfilePicture(data: FormData): Promise<ApiResponse<IUser>> {
    return await this.call(`${this.RESOURCE}/upload-profile-image`, {
      method: "POST",
      data,
    });
  }
}

export default UserRepository;
