<script setup lang="ts">
import AllStories from "~/components/section/story/AllStories.vue";
import StoriesFilter from "~/components/section/story/StoriesFilter.vue";
import UiBreadcrumb from "~/components/ui/Breadcrumb.vue";
import type { BreadcrumbItem } from "~/interfaces/ui";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "All Story", href: "/stories", isActive: true },
];
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
