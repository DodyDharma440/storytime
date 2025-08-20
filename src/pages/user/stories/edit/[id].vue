<script setup lang="ts">
import StoryForm from "~/components/section/user/story/StoryForm.vue";
import { articles } from "~/constants/stories";
</script>

<template>
  <StoryForm :edit-data="articles[0]" />
</template>
