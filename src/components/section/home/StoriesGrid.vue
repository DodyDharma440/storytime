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
          'stories-grid__item': index > 0,
          'stories-grid__item--large': index === 0,
        }"
      >
        <NuxtLink :href="`/story/${'slug-story'}`">
          <StoryCard
            :story="story"
            with-bookmark
            :is-highlight="index === 0"
            is-grid
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stories-grid {
  display: grid;
  @include grid-col(12);
  @include grid-row(2);
  column-gap: spacing(7.5);
  row-gap: spacing(11.5);

  &__item {
    @include col-span(12);
    @include row-span(2);

    @include min-lg {
      @include col-span(4);
      @include row-span(1);
    }

    &--large {
      @include col-span(12);
      @include row-span(2);

      @include min-lg {
        @include col-span(8);
      }
    }
  }
}
</style>
