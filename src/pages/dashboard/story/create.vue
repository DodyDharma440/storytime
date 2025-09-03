<script setup lang="ts">
import StoryForm from "~/components/section/user/story/StoryForm.vue";

definePageMeta({
  middleware: ["auth"],
});

useSeoMeta({
  title: "Storytime - Create Story",
});
</script>

<template>
  <StoryForm />
</template>
