import type { ApiResponse } from "~/interfaces/api";
import type {
  IStory,
  IStoryCategory,
  IStoryRepository,
} from "~/interfaces/story";
import HttpFactory from "~/repositories/factory";

class StoryRepository extends HttpFactory implements IStoryRepository {
  private RESOURCE = "/story";
  private USER_RESOURCE = `/user/${this.RESOURCE}`;

  async getCategories(): Promise<ApiResponse<IStoryCategory[]>> {
    return await this.call(`/category`);
  }

  async getStories(params: string): Promise<ApiResponse<IStory[]>> {
    return await this.call(`${this.RESOURCE}?${params}`);
  }
  async getStory(id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`${this.RESOURCE}/${id}`);
  }

  async getUserStories(params: string): Promise<ApiResponse<IStory[]>> {
    return await this.call(`/user/stories?${params}`);
  }
  async getUserStory(id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`${this.USER_RESOURCE}/${id}`);
  }
  async createStory(data: FormData): Promise<ApiResponse<IStory>> {
    return await this.call(`${this.USER_RESOURCE}`, "POST", data);
  }
  async updateStory(data: FormData, id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`${this.USER_RESOURCE}/${id}`, "PUT", data);
  }
  async deleteStory(id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`${this.USER_RESOURCE}/${id}`, "DELETE");
  }
}

export default StoryRepository;
