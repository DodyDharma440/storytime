<script setup lang="ts">
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

storiesFilter.$subscribe((mutation, state) => {
  const { page, sortBy, category, search } = state;

  const queryParams = new URLSearchParams({
    page: `${page || "1"}`,
    sort_by: `${sortBy || sortByOptions[0]}`,
  });

  if (category && category !== "All") {
    queryParams.append("category", category as string);
  }

  if (search) {
    queryParams.append("search", search as string);
  }

  navigateTo(`/stories?${queryParams}`);
  window.scrollTo(0, 0);
});

onMounted(() => {
  const { page, sort_by, category, search } = route.query;
  if (!page || !sort_by) {
    const queryParams = new URLSearchParams({
      page: `${page || "1"}`,
      sort_by: `${sort_by || sortByOptions[0]}`,
    });

    if (category) {
      queryParams.append("category", category as string);
    }

    if (search) {
      queryParams.append("search", search as string);
    }

    navigateTo(`/stories?${queryParams}`, { replace: true });
  }

  storiesFilter.setValue({
    category: `${category || "All"}`,
    search: `${search || ""}`,
    page: Number(page || "1"),
    sortBy: `${sort_by || sortByOptions[0]}`,
  });
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
