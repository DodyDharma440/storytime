<script setup lang="ts">
import { categories } from "~/constants/stories";

import SectionTitle from "./SectionTitle.vue";
</script>

<template>
  <section class="section container">
    <SectionTitle title="More Categories" />

    <div class="categories">
      <NuxtLink
        v-for="(category, index) in categories"
        :key="index"
        class="categories__item"
        :to="{ name: 'story', query: { category } }"
      >
        {{ category }}
      </NuxtLink>
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
