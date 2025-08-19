<script setup lang="ts">
import UiPagination from "~/components/ui/Pagination.vue";
import { articles } from "~/constants/stories";

import StoryCard from "../home/StoryCard.vue";

const page = ref(1);
</script>

<template>
  <div class="stories">
    <div class="stories__grid">
      <div v-for="story in articles" :key="story.id" class="stories__grid-item">
        <StoryCard :story="story" />
      </div>
    </div>

    <div class="stories__pagination">
      <UiPagination v-model="page" :total="articles.length" :per-page="12" />
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

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 200px 0px;
  }
}
</style>
