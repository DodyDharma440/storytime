<script setup lang="ts">
import type { StorySectionProps } from "~/interfaces/story";
import SectionTitle from "./SectionTitle.vue";
import StoryCard from "./StoryCard.vue";

defineProps<StorySectionProps>();
</script>

<template>
  <section class="section container">
    <SectionTitle :title="title" :explore-href="exploreHref" />

    <div class="stories-grid">
      <div
        v-for="(story, index) in stories"
        :key="index"
        :class="{
          'stories-grid__item': !story.isHighlight,
          'stories-grid__item--large': story.isHighlight,
        }"
      >
        <a href="#">
          <StoryCard :story="story" :story-type="storyType" />
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stories-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: spacing(7.5);
  row-gap: spacing(11.5);

  &__item {
    grid-column: span 12 / span 12;
    grid-row: span 2 / span 2;

    @include min-lg {
      grid-column: span 4 / span 4;
      grid-row: span 1 / span 1;
    }

    &--large {
      grid-column: span 12 / span 12;
      grid-row: span 2 / span 2;

      @include min-lg {
        grid-column: span 8 / span 8;
      }
    }
  }
}
</style>
