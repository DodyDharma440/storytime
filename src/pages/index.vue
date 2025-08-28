<script setup lang="ts">
import HeroSection from "~/components/section/home/HeroSection.vue";
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoriesList from "~/components/section/home/StoriesList.vue";
import StoryCategories from "~/components/section/home/StoryCategories.vue";
import { articles } from "~/constants/stories";

const config = useRuntimeConfig();

useCreateMeta({
  ogImage: `${config.public.BASE_URL}/images/hero.png`,
  description:
    "The world's most-loved social storytelling platform. Story time connects a global community of 90 million readers and writers through the power of story.",
});

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
      :explore-href="{ name: 'story' }"
      :stories="latestStories"
    />

    <StoriesList
      title="Comedy"
      :explore-href="{ name: 'story', query: { category: 'Comedy' } }"
      :stories="comedyStories"
      layout="grid"
    />

    <StoriesList
      title="Romance"
      :explore-href="{ name: 'story', query: { category: 'Romance' } }"
      :stories="romanceStories"
      layout="flex"
    />

    <StoriesList
      title="Horror"
      :explore-href="{ name: 'story', query: { category: 'Horror' } }"
      :stories="horrorStories"
      layout="grid"
    />

    <StoryCategories />
  </div>
</template>
