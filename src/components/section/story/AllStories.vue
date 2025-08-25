<script setup lang="ts">
import UiPagination from "~/components/ui/Pagination.vue";
import { articles, storySkeleton } from "~/constants/stories";

import StoryCard from "../home/StoryCard.vue";

const storiesFilter = useStoriesFilterStore();

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div class="stories">
    <div class="stories__grid">
      <template v-if="isLoading">
        <div
          v-for="(_, index) in [...Array(6)]"
          :key="index"
          class="stories__grid-item"
        >
          <StoryCard :story="storySkeleton" with-category :is-loading />
        </div>
      </template>
      <template v-else>
        <div
          v-for="story in articles"
          :key="story.id"
          class="stories__grid-item"
        >
          <NuxtLink href="/story/some-slug">
            <StoryCard :story="story" />
          </NuxtLink>
        </div>
      </template>
    </div>

    <div class="stories__pagination">
      <UiPagination
        v-model="storiesFilter.page"
        :total="articles.length"
        :per-page="12"
      />
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

      @include min-lg {
        @include col-span(6);
      }

      @include min-xxl {
        @include col-span(4);
      }
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 200px 0px;
  }
}
</style>
