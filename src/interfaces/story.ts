import type { SectionTitleProps } from "~/components/section/home/SectionTitle.vue";

export interface IStory {
  id: number;
  title: string;
  shortContent: string;
  image: string;
  authorName: string;
  authorAvatar: string;
  category: string;
  createdDate: string;
}

export interface StorySectionProps
  extends Omit<SectionTitleProps, "withContainer"> {
  stories: IStory[];
}

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
}
