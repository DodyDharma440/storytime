<script setup lang="ts">
import StoryCard from "~/components/section/home/StoryCard.vue";
import UiAlertDialog from "~/components/ui/AlertDialog.vue";
import UiButton from "~/components/ui/Button.vue";
import UiLoader from "~/components/ui/Loader.vue";
import UiPagination from "~/components/ui/Pagination.vue";
import { storySkeleton } from "~/constants/stories";

const PER_PAGE = 4;

const { $api } = useNuxtApp();

const page = ref(1);
const isOpenDelete: Ref<string | null> = ref(null);

const gridRef = useTemplateRef("grid");

const handleCloseDelete = () => {
  isOpenDelete.value = null;
};

const { data, status, error, refresh } = useAsyncData(
  "all-user-stories",
  () => {
    return $api.story.getUserStories({
      page: page.value,
      limit: PER_PAGE,
    });
  }
);

const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
  mutationFn: (id: string) => $api.story.deleteStory(id),
  onSuccess: () => {
    isOpenDelete.value = null;
    if (page.value > 1) {
      page.value = 1;
    } else {
      refresh();
    }
  },
  successMessage: "Story successfully deleted",
});

const handleDelete = () => {
  if (isOpenDelete.value) mutateDelete(isOpenDelete.value);
};

watch(page, () => {
  window.scrollTo(0, (gridRef.value?.offsetTop ?? 0) - 80);
  refresh();
});
</script>

<template>
  <div class="container user-stories">
    <h2 class="user-stories__title">My Story</h2>
    <div ref="grid" class="user-stories__grid">
      <div class="user-stories__create">
        <h3 class="user-stories__create-title">Write your story</h3>
        <p class="user-stories__create-description">
          Share your unique voice with the world – start writing your story
          today!
        </p>
        <UiButton :href="{ name: 'dashboard-story-create' }">
          Write Story
        </UiButton>
      </div>
      <div class="user-stories__list-grid-item">
        <UiLoader
          :is-loading="status === 'pending'"
          :error="error"
          :is-empty="!data?.data.length"
        >
          <template #loading>
            <div class="user-stories__list">
              <div
                v-for="(_, index) in [...Array(6)]"
                :key="index"
                class="user-stories__list-item"
              >
                <StoryCard :story="storySkeleton" is-editable is-loading />
              </div>
            </div>
          </template>
          <template #empty>
            <div class="user-stories__empty">
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
          </template>

          <div class="user-stories__list">
            <div
              v-for="story in data?.data ?? []"
              :key="story.id"
              class="user-stories__list-item"
            >
              <StoryCard
                :story="story"
                is-editable
                @delete="(id) => (isOpenDelete = id)"
              />
            </div>
          </div>
        </UiLoader>

        <div class="user-stories__pagination">
          <UiPagination
            v-model="page"
            :total="data?.meta?.total ?? 0"
            :per-page="PER_PAGE"
          />
        </div>

        <UiAlertDialog
          :is-open="!!isOpenDelete"
          title="Delete Story"
          description="Are you sure want to delete this story?"
          confirm-button-text="Delete"
          :is-loading="isLoadingDelete"
          @close="handleCloseDelete"
          @confirm="handleDelete"
        />
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
      position: sticky;
      top: 120px;
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
