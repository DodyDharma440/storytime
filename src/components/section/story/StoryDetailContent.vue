<script setup lang="ts">
import type { IStory } from "~/interfaces/story";

const story = inject<IStory>("story");
</script>

<template>
  <div class="story-content">
    <div class="story-content__images">
      <div class="story-content__images-thumbnail">
        <img
          :src="story?.image"
          :alt="`${story?.title} Thumb`"
          class="story-content__images-thumbnail-image"
        />
      </div>
    </div>
    <div class="story-content__text">
      {{ story?.shortContent }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.story-content {
  display: grid;
  @include grid-col(12);
  gap: spacing(8);
  padding-top: spacing(15);
  padding-bottom: 200px;

  @include min-lg {
    gap: spacing(15);
  }

  &__images {
    @include col-span(12);

    @include min-xl {
      @include col-span(5);
    }

    @include min-xxl {
      @include col-span(4);
    }

    &-thumbnail {
      position: relative;
      height: 600px;
      width: 100%;
      border-radius: spacing(2);
      overflow: hidden;

      &-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__text {
    @include col-span(12);

    @include min-xl {
      @include col-span(7);
    }

    @include min-xxl {
      @include col-span(8);
    }
  }
}
</style>
