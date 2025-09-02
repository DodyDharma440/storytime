import type { IStoryCategory } from "~/interfaces/story";

export const useCategoriesStore = defineStore("categories", () => {
  const categories: Ref<IStoryCategory[]> = ref<any[]>([]);

  const setCategories = (value: IStoryCategory[]) => {
    categories.value = value;
  };

  return {
    categories,
    setCategories,
  };
});
