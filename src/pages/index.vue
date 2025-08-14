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
const comedyStories = computed(() => getStoriesByCategory("comedy"));
const romanceStories = computed(() => getStoriesByCategory("romance"));
const horrorStories = computed(() => getStoriesByCategory("horror"));
</script>

<template>
  <div>
    <HeroSection />
    <StoriesCarousel
      title="Latest Story"
      explore-href="#"
      :stories="latestStories"
      story-type="latest"
    />

    <StoriesGrid
      title="Comedy"
      explore-href="#"
      :stories="comedyStories"
      story-type="comedy"
    />

    <StoriesCarousel
      title="Romance"
      explore-href="#"
      :stories="romanceStories"
      story-type="romance"
    />

    <StoriesGrid
      title="Horror"
      explore-href="#"
      :stories="horrorStories"
      story-type="horror"
    />

    <StoryCategories />
  </div>
</template>
