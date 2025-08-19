import { defineStore } from "pinia";

import { sortByOptions } from "~/constants/stories";
import type { IStoryFilter } from "~/interfaces/story";

const initialState: IStoryFilter = {
  page: 1,
  sortBy: sortByOptions[0],
  category: "All",
  search: "",
};

export const useStoriesFilterStore = defineStore("stories-filter", {
  state: () => initialState,
  actions: {
    setValue(newValue?: Partial<IStoryFilter>) {
      Object.entries(newValue ?? {}).forEach(([key, value]) => {
        this[key as keyof IStoryFilter] = value as never;
      });
    },
  },
});
