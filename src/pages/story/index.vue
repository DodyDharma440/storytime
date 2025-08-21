<script setup lang="ts">
import type { LocationQuery } from "vue-router";

import AllStories from "~/components/section/story/AllStories.vue";
import StoriesFilter from "~/components/section/story/StoriesFilter.vue";
import UiBreadcrumb from "~/components/ui/Breadcrumb.vue";
import { sortByOptions } from "~/constants/stories";
import type { BreadcrumbItem } from "~/interfaces/ui";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "All Story", href: "/stories", isActive: true },
];

const route = useRoute();
const storiesFilter = useStoriesFilterStore();

const handleGenerateParams = (query: Record<string, string>) => {
  const { page, sort_by, category, search } = query;

  const queryParams = new URLSearchParams({
    page: `${page || "1"}`,
    sort_by: `${sort_by || sortByOptions[0]}`,
  });

  if (category && category !== "All") {
    queryParams.append("category", category as string);
  }

  if (search) {
    queryParams.append("search", search as string);
  }

  return queryParams;
};

const { page, sort_by } = route.query;
if (!page || !sort_by) {
  const queryParams = handleGenerateParams(
    route.query as Record<string, string>
  );

  navigateTo(`/story?${queryParams}`, { replace: true });
}

// const fetchParams = new URLSearchParams({
//   category: `${category || "All"}`,
//   search: `${search || ""}`,
//   page: `${page || "1"}`,
//   sortBy: `${sort_by || sortByOptions[0]}`,
// });

// const data = await useFetch(
//   `https://api.kraken.com/0/public/Depth?pair=xbteur&count=4&${fetchParams}`
// );
// console.log("success fetching");

storiesFilter.$subscribe((mutation, state) => {
  const { page, sortBy, category, search } = state;
  const queryParams = handleGenerateParams({
    page: `${page}`,
    sort_by: sortBy,
    category,
    search,
  });

  navigateTo(`/story?${queryParams}`);
  window.scrollTo(0, 0);
});

const handleSetStore = (query: LocationQuery) => {
  const { page, sort_by, category, search } = query;

  storiesFilter.setValue({
    category: `${category || "All"}`,
    search: `${search || ""}`,
    page: Number(page || "1"),
    sortBy: `${sort_by || sortByOptions[0]}`,
  });
};

watch(() => route.query, handleSetStore);
handleSetStore(route.query);
</script>

<template>
  <div class="stories">
    <div class="container">
      <h1 class="stories__title">All Stories</h1>
    </div>
    <UiBreadcrumb :items="breadcrumbItems" />
    <div class="stories__content container">
      <StoriesFilter />
      <AllStories />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stories {
  &__title {
    padding-top: 170px;
    padding-bottom: spacing(10);
    font-size: to-rem(44);
  }

  &__content {
    padding-top: spacing(10);
    padding-bottom: spacing(10);
  }
}
</style>
