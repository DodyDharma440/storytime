<script setup lang="ts">
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoryDetailContent from "~/components/section/story/StoryDetailContent.vue";
import StoryDetailHeader from "~/components/section/story/StoryDetailHeader.vue";
import UiBreadcrumb from "~/components/ui/Breadcrumb.vue";
import type { BreadcrumbItem } from "~/interfaces/ui";

const route = useRoute();
const { $api } = useNuxtApp();
const slug = computed(() => route.params.slug as string);
const { data } = await useAsyncData(
  `story-${slug.value}`,
  () => $api.story.getStory(slug.value),
  { watch: [slug] }
);
const story = computed(() => data.value?.data);

useCreateMeta({
  serverOnly: false,
  title: `Storytime - ${story?.value?.title}`,
  ogImage: story?.value?.content_image,
  description: story?.value?.content,
  path: `/story/${route.params.slug}`,
});

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: { path: "/" } },
  {
    label: story?.value?.title ?? "-",
    href: { path: "/story" },
    isActive: true,
  },
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
      <StoriesCarousel title="Similar Story" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.story {
  padding-top: 70px;
  padding-bottom: 200px;

  @include min-lg {
    padding-top: 105px;
  }
}
</style>
