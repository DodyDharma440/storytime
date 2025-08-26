<script setup lang="ts">
import type { StorySectionProps } from "~/interfaces/story";

import SectionTitle from "./SectionTitle.vue";
import StoryCard from "./StoryCard.vue";

defineProps<StorySectionProps>();
</script>

<template>
  <section class="section">
    <SectionTitle :title="title" :explore-href="exploreHref" with-container />

    <Carousel
      :items-to-show="1.2"
      :wrap-around="false"
      :gap="10"
      :breakpoints="{
        1024: {
          itemsToShow: 2,
          gap: 30,
        },
        1280: {
          itemsToShow: 3,
          gap: 30,
        },
      }"
    >
      <Slide v-for="(story, index) in stories" :key="index">
        <div class="carousel__item">
          <NuxtLink :to="{ name: 'story-slug', params: { slug: 'some-slug' } }">
            <StoryCard :story="story" with-category />
          </NuxtLink>
        </div>
      </Slide>
    </Carousel>
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
</style>
