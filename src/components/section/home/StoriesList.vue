<script setup lang="ts">
import type { StorySectionProps } from "~/interfaces/story";

import SectionTitle from "./SectionTitle.vue";
import StoryCard from "./StoryCard.vue";

interface StoriesListProps extends StorySectionProps {
  layout: "grid" | "flex";
}

defineProps<StoriesListProps>();
</script>

<template>
  <section class="section container">
    <SectionTitle :title="title" :explore-href="exploreHref" />

    <div v-if="layout === 'grid'" class="stories-grid">
      <div
        v-for="(story, index) in stories"
        :key="index"
        :class="{
          'stories-grid__item': index > 0,
          'stories-grid__item--large': index === 0,
        }"
      >
        <StoryCard
          :story="story"
          :is-highlight="index === 0"
          is-grid
          :with-category="false"
        />
      </div>
    </div>

    <div v-if="layout === 'flex'" class="stories-flex">
      <StoryCard
        v-for="(story, index) in stories"
        :key="index"
        :story="story"
        :with-category="false"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stories {
  &-grid {
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

  &-flex {
    display: flex;
    gap: spacing(7.5);
    flex-direction: column;
    @include min-xl {
      flex-direction: row;
    }
  }
}
</style>
