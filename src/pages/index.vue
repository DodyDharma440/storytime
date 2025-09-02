<script setup lang="ts">
import HeroSection from "~/components/section/home/HeroSection.vue";
import StoriesCarousel from "~/components/section/home/StoriesCarousel.vue";
import StoriesList from "~/components/section/home/StoriesList.vue";
import StoryCategories from "~/components/section/home/StoryCategories.vue";

const config = useRuntimeConfig();

useCreateMeta({
  ogImage: `${config.public.BASE_URL}/images/hero.png`,
  description:
    "The world's most-loved social storytelling platform. Story time connects a global community of 90 million readers and writers through the power of story.",
});

const { $api } = useNuxtApp();

const store = useCategoriesStore();
const { data, status, error } = await useAsyncData("categories", () =>
  $api.story.getCategories()
);
store.setCategories(data.value?.data ?? []);
const categories = computed(() => data.value?.data.slice(0, 3) ?? []);
</script>

<template>
  <div>
    <HeroSection />
    <StoriesCarousel title="Latest Story" :explore-href="{ name: 'story' }" />

    <StoriesList
      v-for="(category, index) in categories"
      :key="category.id"
      :explore-href="{ name: 'story', query: { category: category.slug } }"
      :category="category"
      :layout="index % 2 === 0 ? 'grid' : 'flex'"
    />

    <StoryCategories :is-loading="status === 'pending'" :error="error" />
  </div>
</template>
