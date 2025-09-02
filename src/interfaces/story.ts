import type { SectionTitleProps } from "~/components/section/home/SectionTitle.vue";

import type { ApiResponse } from "./api";

export interface IStoryCategory {
  id: number;
  name: string;
  slug: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IStory {
  id: string;
  title: string;
  content: string;
  content_image: string;
  author: {
    name: string;
    profile_image: string;
  };
  category: {
    id: number;
    name: string;
  };
  created_at: string | null;
  updated_at: string | null;
}

export type StorySectionProps = Omit<SectionTitleProps, "withContainer">;

export interface IStoryFilter {
  page: number;
  sortBy: string;
  category: string;
  search: string;
}

export interface IStoryForm {
  title: string;
  content: string;
  category_id: string;
  content_image: File | null;
  content_image_url?: string;
}

export interface IStoryRepository {
  getCategories(): Promise<ApiResponse<IStoryCategory[]>>;

  getStories(params: Record<string, any>): Promise<ApiResponse<IStory[]>>;
  getStory(id: string): Promise<ApiResponse<IStory>>;

  getUserStories(params: Record<string, any>): Promise<ApiResponse<IStory[]>>;
  getUserStory(id: string): Promise<ApiResponse<IStory>>;
  createStory(data: FormData): Promise<ApiResponse<IStory>>;
  updateStory(data: FormData, id: string): Promise<ApiResponse<IStory>>;
  deleteStory(id: string): Promise<ApiResponse<IStory>>;
}
