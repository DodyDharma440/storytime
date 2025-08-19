<script setup lang="ts">
import { articles } from "~/constants/stories";

import StoryCard from "../home/StoryCard.vue";
</script>

<template>
  <div class="stories">
    <div class="stories__grid">
      <div v-for="story in articles" :key="story.id" class="stories__grid-item">
        <StoryCard :story="story" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stories {
  &__grid {
    display: grid;
    @include grid-col(12);
    gap: spacing(7.5);

    &-item {
      @include col-span(12);

      @include min-md {
        @include col-span(6);
      }

      @include min-lg {
        @include col-span(4);
      }
    }
  }
}
</style>
