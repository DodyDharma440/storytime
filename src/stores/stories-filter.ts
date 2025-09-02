import { sortByOptions } from "~/constants/stories";
import type { IStoryFilter } from "~/interfaces/story";

const initialState: IStoryFilter = {
  page: 1,
  sortBy: sortByOptions[0].value,
  category: "All",
  search: "",
};

export const useStoriesFilterStore = defineStore("stories-filter", () => {
  const filters: Ref<IStoryFilter> = ref(initialState);

  const setValue = (newValue?: Partial<IStoryFilter>) => {
    if (!newValue) return;
    filters.value = { ...filters.value, ...newValue };
  };

  return {
    filters,
    setValue,
  };
});
