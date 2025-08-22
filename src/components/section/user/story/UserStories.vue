<script setup lang="ts">
import UiAlertDialog from "~/components/ui/AlertDialog.vue";
import UiButton from "~/components/ui/Button.vue";
import UiPagination from "~/components/ui/Pagination.vue";
import { articles } from "~/constants/stories";

import StoryCard from "../../home/StoryCard.vue";

const isEmpty = false;

const page = ref(1);
const isOpenDelete: Ref<string | null> = ref(null);

const handleCloseDelete = () => {
  isOpenDelete.value = null;
};
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
        <UiButton href="/dashboard/story/create">Write Story</UiButton>
      </div>
      <div class="user-stories__list-grid-item">
        <div v-if="isEmpty" class="user-stories__empty">
          <h4 class="user-stories__empty-title">No Stories Yet</h4>
          <p class="user-stories__empty-description">
            You haven't shared any stories yet. Start your fitness journey
            today!
          </p>
          <NuxtImg
            class="user-stories__empty-image"
            src="/images/error/empty.png"
          />
        </div>
        <template v-else>
          <div class="user-stories__list">
            <div
              v-for="(story, index) in articles.slice(0, 4)"
              :key="index"
              class="user-stories__list-item"
            >
              <NuxtLink :href="`/story/some-slug`">
                <StoryCard
                  :story="story"
                  is-editable
                  @delete="(id) => (isOpenDelete = id)"
                />
              </NuxtLink>
            </div>
          </div>

          <div class="user-stories__pagination">
            <UiPagination
              v-model="page"
              :total="articles.length"
              :per-page="4"
            />
          </div>

          <UiAlertDialog
            :is-open="!!isOpenDelete"
            title="Delete Story"
            description="Are you sure want to delete this story?"
            confirm-button-text="Delete"
            @close="handleCloseDelete"
            @confirm="handleCloseDelete"
          />
        </template>
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

  &__delete-modal {
    padding: spacing(6);
    display: flex;
    flex-direction: column;
    gap: spacing(5);
    align-items: center;
    justify-content: center;
    text-align: center;

    &-actions {
      display: flex;
      align-items: center;
      gap: spacing(8);
      margin-top: spacing(2.5);

      @include min-lg {
        gap: spacing(11);
      }
    }
  }

  &__empty {
    max-width: 741px;
    margin: 0px auto;
    text-align: center;

    &-title {
      font-family: "Playfair Display", serif;
      margin-bottom: spacing(7.5);
      font-size: to-rem(40);
      font-weight: 600;
      @include min-lg {
        font-size: to-rem(44);
      }
    }

    &-description {
      font-size: to-rem(20);
      @include min-lg {
        font-size: to-rem(24);
      }
    }

    &-image {
      margin-top: spacing(15);
      max-width: 529px;
      width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
}
</style>
