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

export interface StorySectionProps extends SectionTitleProps {
  stories: IStory[];
}
