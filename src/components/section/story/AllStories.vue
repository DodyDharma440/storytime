<script setup lang="ts">
import StoryCard from "~/components/section/home/StoryCard.vue";
import UiLoader from "~/components/ui/Loader.vue";
import UiPagination from "~/components/ui/Pagination.vue";
import { storySkeleton } from "~/constants/stories";

const PER_PAGE = 12;

const storiesFilter = useStoriesFilterStore();
const { filters } = storeToRefs(storiesFilter);

const { $api } = useNuxtApp();

const { data, status, error, refresh } = useAsyncData("all-stories", () => {
  const params = generateParams({
    page: `${filters.value.page}`,
    // BUG: double fetch if search is included
    search: filters.value.search,
    sort_by: filters.value.sortBy,
    category: filters.value.category,
  });

  params.keyword = params.search;
  delete params.search;

  return $api.story.getStories({
    ...params,
    limit: PER_PAGE,
  });
});

watch(filters, () => {
  refresh();
});
</script>

<template>
  <div class="stories">
    <UiLoader
      :is-loading="status === 'pending'"
      :error="error"
      :is-empty="!data?.data.length"
    >
      <template #loading>
        <div class="stories__grid">
          <div
            v-for="(_, index) in [...Array(6)]"
            :key="index"
            class="stories__grid-item"
          >
            <StoryCard :story="storySkeleton" with-category is-loading />
          </div>
        </div>
      </template>
      <div class="stories__grid">
        <div
          v-for="story in data?.data ?? []"
          :key="story.id"
          class="stories__grid-item"
        >
          <StoryCard :story="story" />
        </div>
      </div>
    </UiLoader>

    <div class="stories__pagination">
      <UiPagination
        :current-page="storiesFilter.filters.page"
        :total="data?.meta?.total ?? 0"
        :per-page="PER_PAGE"
        @change="(v) => storiesFilter.setValue({ page: v })"
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
