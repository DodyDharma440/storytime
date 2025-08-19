<script setup lang="ts">
import HeroSection from "~/components/section/home/HeroSection.vue";
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoriesGrid from "~/components/section/home/StoriesGrid.vue";
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
const romanceStories = computed(() => getStoriesByCategory("romance"));

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
      explore-href="/stories"
      :stories="latestStories"
    />

    <StoriesGrid
      title="Comedy"
      explore-href="/stories?category=comedy"
      :stories="comedyStories"
    />

    <StoriesCarousel
      title="Romance"
      explore-href="/stories?category=romance"
      :stories="romanceStories"
    />

    <StoriesGrid
      title="Horror"
      explore-href="/stories?category=horror"
      :stories="horrorStories"
    />

    <StoryCategories />
  </div>
</template>
