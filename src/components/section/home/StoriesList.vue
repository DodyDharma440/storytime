<script setup lang="ts">
import UiLoader from "~/components/ui/Loader.vue";
import { storySkeleton } from "~/constants/stories";
import type { IStoryCategory, StorySectionProps } from "~/interfaces/story";

import SectionTitle from "./SectionTitle.vue";
import StoryCard from "./StoryCard.vue";

interface StoriesListProps extends Omit<StorySectionProps, "title"> {
  title?: string;
  layout: "grid" | "flex";
  category?: IStoryCategory;
}

const { $api } = useNuxtApp();

const props = defineProps<StoriesListProps>();

const {
  data: dataStories,
  status,
  error,
} = useAsyncData(`stories-${props.category?.slug}`, () => {
  const params: Record<string, any> = {
    limit: 3,
  };
  if (props.category) {
    params.category_id = props.category.id;
  }

  return $api.story.getStories(params, false);
});
</script>

<template>
  <section class="section container">
    <SectionTitle
      :title="category?.name ?? title ?? ''"
      :explore-href="exploreHref"
    />

    <template v-if="layout === 'grid'">
      <UiLoader
        :is-loading="status === 'pending'"
        :error="error"
        :is-empty="!dataStories?.data.length"
      >
        <template #loading>
          <div class="stories-grid">
            <div
              v-for="(_, index) in [...Array(3)]"
              :key="index"
              :class="{
                'stories-grid__item': index > 0,
                'stories-grid__item--large': index === 0,
              }"
            >
              <StoryCard
                :story="storySkeleton"
                :is-highlight="index === 0"
                is-grid
                :with-category="false"
                is-loading
              />
            </div>
          </div>
        </template>
        <div class="stories-grid">
          <div
            v-for="(story, index) in dataStories?.data ?? []"
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
      </UiLoader>
    </template>

    <template v-if="layout === 'flex'">
      <UiLoader
        :is-loading="status === 'pending'"
        :error="error"
        :is-empty="!dataStories?.data.length"
      >
        <template #loading>
          <div class="stories-flex">
            <StoryCard
              v-for="(_, index) in [...Array(3)]"
              :key="index"
              :story="storySkeleton"
              :with-category="false"
              is-loading
            />
          </div>
        </template>
        <div class="stories-flex">
          <StoryCard
            v-for="(story, index) in dataStories?.data ?? []"
            :key="index"
            :story="story"
            :with-category="false"
          />
        </div>
      </UiLoader>
    </template>
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

    & > div {
      flex: 1;
    }
  }
}
</style>
