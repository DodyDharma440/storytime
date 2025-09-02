<script setup lang="ts">
import type { NuxtError } from "#app";

import UiLoader from "~/components/ui/Loader.vue";
import UiSkeleton from "~/components/ui/Skeleton.vue";

import SectionTitle from "./SectionTitle.vue";

interface StoryCategoriesProps {
  isLoading: boolean;
  error: NuxtError<any> | null;
}

defineProps<StoryCategoriesProps>();

const store = useCategoriesStore();

const categories = computed(() => store.categories.slice(3) ?? []);
</script>

<template>
  <section class="section container">
    <SectionTitle title="More Categories" />

    <div class="categories">
      <UiLoader :is-loading="isLoading" :error="error">
        <template #loading>
          <UiSkeleton
            v-for="(_, index) in [...Array(5)]"
            :key="index"
            is-loading
          >
            <div class="categories__item">Category</div>
          </UiSkeleton>
        </template>
        <NuxtLink
          v-for="(category, index) in categories"
          :key="index"
          class="categories__item"
          :to="{ name: 'story', query: { category: category.slug } }"
        >
          {{ category.name }}
        </NuxtLink>
      </UiLoader>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.categories {
  display: grid;
  @include grid-col(2);
  align-items: center;
  gap: spacing(5.5);
  flex-wrap: wrap;
  margin-bottom: 120px;

  @include min-lg {
    gap: spacing(7.5);
    display: flex;
  }

  :deep(> div) {
    width: 100%;
  }

  &__item {
    @include col-span(2);
    padding: spacing(8);
    border-radius: spacing(2);
    background-color: #f0f5ed;
    color: $primary-color;
    text-align: center;
    font-size: to-rem(20);
    transition: all 0.4s;

    @include min-custom(400px) {
      padding: spacing(10);
      @include col-span(1);
    }

    @include min-md {
      font-size: to-rem(24);
    }

    @include min-lg {
      padding: spacing(15);
      font-size: to-rem(28);
    }

    &:hover {
      transform: translateY(spacing(-2));
      background-color: #e9eee6;
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
