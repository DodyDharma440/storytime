<script setup lang="ts">
import UiLoader from "~/components/ui/Loader.vue";
import { LATEST_STORIES } from "~/constants/home";
import { storySkeleton } from "~/constants/stories";
import type { StorySectionProps } from "~/interfaces/story";

import SectionTitle from "./SectionTitle.vue";
import StoryCard from "./StoryCard.vue";

const carouselOptions = {
  itemsToShow: 1.2,
  wrapAround: false,
  gap: 10,
  breakpoints: {
    1024: {
      itemsToShow: 2,
      gap: 30,
    },
    1280: {
      itemsToShow: 3,
      gap: 30,
    },
  },
};

const { $api } = useNuxtApp();

const {
  data: latestData,
  status,
  error,
} = useAsyncData(LATEST_STORIES, () => {
  return $api.story.getStories({ limit: 5 }, false);
});

defineProps<StorySectionProps>();
</script>

<template>
  <section class="section">
    <SectionTitle :title="title" :explore-href="exploreHref" with-container />

    <div :class="{ container: error?.data }">
      <UiLoader
        :is-loading="status === 'pending'"
        :error="error"
        :is-empty="!latestData?.data.length"
      >
        <template #loading>
          <Carousel v-bind="carouselOptions">
            <Slide v-for="(_, index) in [...Array(4)]" :key="index">
              <div class="carousel__item">
                <StoryCard :story="storySkeleton" with-category is-loading />
              </div>
            </Slide>
          </Carousel>
        </template>

        <Carousel v-bind="carouselOptions">
          <Slide v-for="(story, index) in latestData?.data ?? []" :key="index">
            <div class="carousel__item">
              <StoryCard :story="story" with-category />
            </div>
          </Slide>
        </Carousel>
      </UiLoader>
    </div>
  </section>
</template>

<style lang="scss" scoped>
:deep(.carousel__viewport) {
  padding-top: spacing(1);
}

:deep(.carousel__track) {
  margin: 0px auto;
  max-width: 1716px;
  padding-left: spacing(4);
  align-items: flex-start;

  @include min-custom(1732px) {
    padding-left: spacing(1.5);
  }
}

.carousel {
  &__item {
    width: 100%;
  }
}
</style>
