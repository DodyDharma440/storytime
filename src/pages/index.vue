<script setup lang="ts">
import HeroSection from "~/components/section/home/HeroSection.vue";
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoriesList from "~/components/section/home/StoriesList.vue";
import StoryCategories from "~/components/section/home/StoryCategories.vue";
import { articles } from "~/constants/stories";

const getStoriesByCategory = (category: string) => {
  return articles.filter((article) => article.category === category);
};

const latestStories = computed(() => {
  const sorted = articles.sort((a, b) => {
    const aTimestamp = new Date(a.createdDate).getTime();
    const bTimestamp = new Date(b.createdDate).getTime();

    return bTimestamp - aTimestamp;
  });
  return sorted.slice(0, 5);
});
const romanceStories = computed(() =>
  getStoriesByCategory("romance").slice(0, 3)
);

const comedyStories = computed(() => {
  return getStoriesByCategory("comedy").slice(0, 3);
});
const horrorStories = computed(() => {
  return getStoriesByCategory("horror").slice(0, 3);
});
</script>

<template>
  <div>
    <HeroSection />
    <StoriesCarousel
      title="Latest Story"
      explore-href="/story"
      :stories="latestStories"
    />

    <StoriesList
      title="Comedy"
      explore-href="/story?category=Comedy"
      :stories="comedyStories"
      layout="grid"
    />

    <StoriesList
      title="Romance"
      explore-href="/story?category=Romance"
      :stories="romanceStories"
      layout="flex"
    />

    <StoriesList
      title="Horror"
      explore-href="/story?category=Horror"
      :stories="horrorStories"
      layout="grid"
    />

    <StoryCategories />
  </div>
</template>
