import type { ApiResponse } from "~/interfaces/api";
import type {
  IStory,
  IStoryCategory,
  IStoryRepository,
} from "~/interfaces/story";
import HttpFactory from "~/repositories/factory";

class StoryRepository extends HttpFactory implements IStoryRepository {
  async getCategories(): Promise<ApiResponse<IStoryCategory[]>> {
    return await this.call(`/category`);
  }

  async getStories(params: string): Promise<ApiResponse<IStory[]>> {
    return await this.call(`/story?${params}`);
  }
  async getStory(id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`/story/${id}`);
  }

  async getUserStories(params: string): Promise<ApiResponse<IStory[]>> {
    return await this.call(`/user/stories?${params}`);
  }
  async getUserStory(id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`/user/story/${id}`);
  }
  async createStory(data: FormData): Promise<ApiResponse<IStory>> {
    return await this.call(`/user/story`, "POST", data);
  }
  async updateStory(data: FormData, id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`/user/story/${id}`, "PUT", data);
  }
  async deleteStory(id: string): Promise<ApiResponse<IStory>> {
    return await this.call(`/user/story/${id}`, "DELETE");
  }
}

export default StoryRepository;
