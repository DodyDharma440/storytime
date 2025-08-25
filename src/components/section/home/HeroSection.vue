<script setup lang="ts">
import { NuxtImg } from "#components";

import SearchIcon from "~/assets/icons/SearchIcon.vue";
import UiInput from "~/components/ui/Input.vue";

const searchValue = ref("");

const handleSearch = () => {
  navigateTo({
    path: "/story",
    query: {
      search: searchValue.value,
    },
  });
};
</script>

<template>
  <section class="hero container">
    <h1 class="hero__title">Welcome to Storytime</h1>
    <p class="hero__description">
      The world's most-loved social storytelling platform. Story time connects a
      global community of 90 million readers and writers through the power of
      story.
    </p>

    <UiInput
      id="search-input"
      v-model="searchValue"
      type="search"
      placeholder="Search story"
      label="Search story"
      sr-only-label
      @keydown.enter="handleSearch"
    >
      <template #rightIcon>
        <SearchIcon />
      </template>
    </UiInput>

    <NuxtImg
      class="hero__illustration"
      src="/images/hero.png"
      loading="lazy"
      alt="Hero illustration"
    />
  </section>
</template>

<style lang="scss" scoped>
.hero {
  padding-top: 110px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include min-md {
    padding-top: 150px;
    padding-bottom: 140px;
  }

  @include min-lg {
    padding-top: 170px;
    padding-bottom: 160px;
  }

  &__title {
    margin-bottom: spacing(7.5);
    font-size: to-rem(48);
    font-family: "Playfair Display", serif;
    text-shadow: 4px 2px 4px #00000040;
    text-align: center;

    @include min-lg {
      font-size: to-rem(60);
    }
  }

  &__description {
    max-width: 1412px;
    text-align: center;
    margin-bottom: spacing(10);
    font-size: to-rem(20);

    @include min-lg {
      font-size: to-rem(24);
    }
  }

  :deep(.input-wrapper) {
    margin-bottom: spacing(10);
    max-width: 1062px;
  }

  :deep(.input__field) {
    font-size: to-rem(20);

    @include min-lg {
      font-size: to-rem(24);
    }
  }

  &__illustration {
    max-width: 802px;
    max-height: 396px;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
