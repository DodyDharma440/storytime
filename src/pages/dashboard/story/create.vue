<script setup lang="ts">
import StoryForm from "~/components/section/user/story/StoryForm.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <StoryForm />
</template>
