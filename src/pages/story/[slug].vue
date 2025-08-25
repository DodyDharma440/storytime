<script setup lang="ts">
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoryDetailContent from "~/components/section/story/StoryDetailContent.vue";
import StoryDetailHeader from "~/components/section/story/StoryDetailHeader.vue";
import UiBreadcrumb from "~/components/ui/Breadcrumb.vue";
import { articles } from "~/constants/stories";
import type { BreadcrumbItem } from "~/interfaces/ui";

const story = articles[0];
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: { path: "/" } },
  { label: story.title, href: { path: "/story" }, isActive: true },
];

provide("story", story);
</script>

<template>
  <div class="story">
    <UiBreadcrumb :items="breadcrumbItems" />
    <div class="container">
      <StoryDetailHeader />
      <StoryDetailContent />
    </div>

    <div>
      <StoriesCarousel title="Similar Story" :stories="articles.slice(1, 4)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.story {
  padding-top: 105px;
  padding-bottom: 200px;
}
</style>
