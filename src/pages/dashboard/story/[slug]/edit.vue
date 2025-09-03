<script setup lang="ts">
import StoryForm from "~/components/section/user/story/StoryForm.vue";
import UiLoader from "~/components/ui/Loader.vue";

definePageMeta({
  middleware: ["auth"],
});

useSeoMeta({
  title: "Storytime - Edit Story",
});

const route = useRoute();
const { $api } = useNuxtApp();
const slug = computed(() => route.params.slug as string);
const { data, status, error } = await useAsyncData(
  `story-${slug.value}`,
  () => $api.story.getStory(slug.value),
  { watch: [slug] }
);
const story = computed(() => data.value?.data);
</script>

<template>
  <div>
    <UiLoader :is-loading="status === 'pending'" :error="error">
      <StoryForm :edit-data="story" />
    </UiLoader>
  </div>
</template>
