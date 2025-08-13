import type { SectionTitleProps } from "~/components/section/home/SectionTitle.vue";

export interface IStory {
  thumbnail: string;
  title: string;
  description: string;
  avatar: string;
  author: string;
  date: string;
  category?: string;
  bookmark?: boolean;
  isHighlight?: boolean;
}

export type StorySectionType = "latest" | "comedy" | "romance" | "horror";

export interface StorySectionProps extends SectionTitleProps {
  stories: IStory[];
  storyType: StorySectionType;
}
