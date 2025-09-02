<script setup lang="ts">
import type { LocationQuery } from "vue-router";

import AllStories from "~/components/section/story/AllStories.vue";
import StoriesFilter from "~/components/section/story/StoriesFilter.vue";
import UiBreadcrumb from "~/components/ui/Breadcrumb.vue";
import { sortByOptions } from "~/constants/stories";
import type { BreadcrumbItem } from "~/interfaces/ui";

const config = useRuntimeConfig();
useCreateMeta({
  title: "Storytime - All Story",
  ogImage: `${config.public.BASE_URL}/images/hero.png`,
  description:
    "The world's most-loved social storytelling platform. Story time connects a global community of 90 million readers and writers through the power of story.",
  path: "/story",
});

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: { path: "/" } },
  { label: "All Story", href: { path: "/story" }, isActive: true },
];

const route = useRoute();

const categoriesStore = useCategoriesStore();
if (!categoriesStore.categories.length) {
  const { $api } = useNuxtApp();
  const { data } = await useAsyncData("categories", () =>
    $api.story.getCategories()
  );
  categoriesStore.setCategories(data.value?.data ?? []);
}

const storiesFilter = useStoriesFilterStore();

const { page, sort_by } = route.query;
if (!page || !sort_by) {
  const queryParams = generateParams(route.query as Record<string, string>);

  navigateTo(
    {
      name: "story",
      query: queryParams,
    },
    { replace: true }
  );
}

const unsubscribe = storiesFilter.$subscribe((mutation, state) => {
  const currentQuery = route.query;
  const newQuery = generateParams({
    page: String(state.filters.page),
    sort_by: state.filters.sortBy,
    category: state.filters.category,
    search: state.filters.search,
  });

  const isSame =
    Object.keys(newQuery).every((key) => currentQuery[key] === newQuery[key]) &&
    Object.keys(currentQuery).length === Object.keys(newQuery).length;

  if (!isSame) {
    navigateTo({ name: "story", query: newQuery });
    window.scrollTo(0, 0);
  }
});

const handleSetStore = (query: LocationQuery) => {
  const { page, sort_by, category, search } = query;

  storiesFilter.setValue({
    category: `${category || "All"}`,
    search: `${search || ""}`,
    page: Number(page || "1"),
    sortBy: `${sort_by || sortByOptions[0].value}`,
  });
};

handleSetStore(route.query);

onUnmounted(() => {
  unsubscribe();
});
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
