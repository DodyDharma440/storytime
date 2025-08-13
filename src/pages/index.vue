<script setup lang="ts">
import HeroSection from "~/components/section/home/HeroSection.vue";
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoriesGrid from "~/components/section/home/StoriesGrid.vue";
import StoryCategories from "~/components/section/home/StoryCategories.vue";
import {
  comedyStories,
  horrorStories,
  latestStories,
  romanceStories,
} from "~/constants/stories";
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
