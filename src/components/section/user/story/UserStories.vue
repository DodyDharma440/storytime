<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";
import UiPagination from "~/components/ui/Pagination.vue";
import { articles } from "~/constants/stories";

import StoryCard from "../../home/StoryCard.vue";

const page = ref(1);
</script>

<template>
  <div class="container user-stories">
    <h2 class="user-stories__title">My Story</h2>
    <div class="user-stories__grid">
      <div class="user-stories__create">
        <h3 class="user-stories__create-title">Write your story</h3>
        <p class="user-stories__create-description">
          Share your unique voice with the world – start writing your story
          today!
        </p>
        <UiButton href="/user/stories/create">Write Story</UiButton>
      </div>
      <div class="user-stories__list-grid-item">
        <div class="user-stories__list">
          <div
            v-for="(story, index) in articles.slice(0, 4)"
            :key="index"
            class="user-stories__list-item"
          >
            <NuxtLink :href="`/stories/some-slug`">
              <StoryCard :story="story" />
            </NuxtLink>
          </div>
        </div>

        <div class="user-stories__pagination">
          <UiPagination v-model="page" :total="articles.length" :per-page="4" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-stories {
  padding-top: 67px;
  padding-bottom: 150px;

  @include min-lg {
    padding-bottom: 200px;
  }

  &__title {
    font-family: "DM Sans", sans-serif;
    font-weight: 700;
    font-size: to-rem(30);

    @include min-lg {
      font-size: to-rem(36);
    }
  }

  &__grid {
    padding-top: 100px;
    display: grid;
    @include grid-col(12);
    align-items: start;
    gap: spacing(5);

    @include min-lg {
      gap: spacing(7.5);
    }
  }

  &__create {
    @include col-span(12);
    border: 1px solid #cccccc;
    border-radius: spacing(2);
    min-height: 400px;
    padding: 80px 76px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: spacing(5);
    align-items: center;

    @include min-xl {
      @include col-span(4);
    }

    &-title {
      font-family: "DM Sans", sans-serif;
      font-weight: 700;
      font-size: to-rem(36);
    }

    &-description {
      margin-bottom: spacing(2.5);
    }
  }

  &__list-grid-item {
    @include col-span(12);

    @include min-xl {
      @include col-span(8);
    }
  }

  &__list {
    display: grid;
    @include grid-col(2);
    gap: spacing(5);
    margin-bottom: 150px;

    @include min-lg {
      gap: spacing(7.5);
      margin-bottom: 200px;
    }

    &-item {
      @include col-span(2);

      @include min-lg {
        @include col-span(1);
      }
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
