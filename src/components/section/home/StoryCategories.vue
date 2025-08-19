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
        :href="`/stories?category=${category}`"
      >
        {{ category }}
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.categories {
  display: flex;
  align-items: center;
  gap: spacing(5.5);
  flex-wrap: wrap;
  margin-bottom: 120px;

  @include min-lg {
    gap: spacing(7.5);
  }

  &__item {
    padding: spacing(10);
    border-radius: spacing(2);
    background-color: #f0f5ed;
    color: $primary-color;
    text-align: center;
    font-size: to-rem(24);
    transition: all 0.4s;

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
