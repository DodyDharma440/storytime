<script setup lang="ts">
import type { StorySectionProps } from "~/interfaces/story";

import SectionTitle from "./SectionTitle.vue";
import StoryCard from "./StoryCard.vue";

defineProps<StorySectionProps>();
</script>

<template>
  <section class="section">
    <SectionTitle :title="title" :explore-href="exploreHref" with-container />

    <div class="stories-slider-wrapper">
      <div class="stories-slider container">
        <div
          v-for="(story, index) in stories"
          :key="index"
          class="stories-slider__item"
        >
          <NuxtLink :href="`/story/${'slug-story'}`">
            <StoryCard :story="story" with-category />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stories-slider-wrapper {
  overflow-x: auto;
  padding-top: spacing(1);
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.stories-slider {
  white-space: nowrap;

  &__item {
    white-space: normal;
    display: inline-block;
    margin-left: spacing(7.5);
    width: 400px;
    vertical-align: top;

    @include min-lg {
      width: 547px;
    }

    &:nth-child(1) {
      margin-left: 0;
    }

    &:nth-last-child(1) {
      margin-right: spacing(15);
    }
  }
}
</style>
