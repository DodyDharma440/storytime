import type { SectionTitleProps } from "~/components/section/home/SectionTitle.vue";

export interface IStory {
  id: string;
  title: string;
  content: string;
  content_image: string;
  author: {
    name: string;
    profile_image: string;
  };
  category?: {
    id: number;
    name: string;
  };
  created_at: string;
}

export interface StorySectionProps extends SectionTitleProps {
  stories: IStory[];
}
