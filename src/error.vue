<script setup lang="ts">
import type { NuxtError } from "#app";

import DefaultFooter from "~/components/layout/default/Footer.vue";
import DefaultHeader from "~/components/layout/default/Header.vue";
import UiButton from "~/components/ui/Button.vue";

const customTitles: Record<string, string> = {
  404: "Page Not Found",
  500: "Internal Server Error",
  default: "Error",
};

const customMessages: Record<string, string> = {
  404: "Oops! It looks like this page doesn't exist. Please check the URL or return to the homepage.",
  500: "Something went wrong on our side while processing your request. Please try again in a moment.",
  default:
    "An unexpected error occurred, and we couldn’t complete your request. Please try again later.",
};

definePageMeta({
  layout: "default",
});
defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="error-page">
    <DefaultHeader />
    <main class="error-page__grid container">
      <div class="error-page__grid-item">
        <div class="error-page__grid-item-image-wrapper">
          <NuxtImg
            class="error-page__grid-item-image"
            src="/images/error/error.png"
          />
        </div>
      </div>
      <div class="error-page__grid-item error-page__content">
        <h1 class="error-page__content-title">
          {{ error?.statusCode }}
        </h1>
        <h2 class="error-page__content-subtitle">
          {{ customTitles[error?.statusCode ?? "default"] }}
        </h2>
        <p class="error-page__content-description">
          {{ customMessages[error?.statusCode ?? "default"] }}
        </p>
        <UiButton :href="{ path: '/' }"> Back to Home </UiButton>
      </div>
    </main>
    <DefaultFooter />
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-top: 120px;

  .container {
    width: 100%;
  }

  &__grid {
    flex: 1;
    display: grid;
    align-items: center;
    gap: spacing(8.5);
    @include grid-col(12);
    padding-bottom: spacing(10);

    &-item {
      @include col-span(12);

      @include min-md {
        @include col-span(6);
      }

      &-image-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-image {
        width: 100%;
        height: auto;
        object-fit: contain;
        @include max-md {
          max-width: 400px;
          margin: 0px auto;
        }
      }
    }
  }

  &__content {
    text-align: center;

    &-title {
      font-size: to-rem(160);
      margin-bottom: spacing(3.5);
    }

    &-subtitle {
      font-size: to-rem(44);
      margin-bottom: 70px;
    }

    &-description {
      color: #4b4b4b;
      margin-bottom: 70px;
      font-size: to-rem(24);
    }

    :deep(.btn) {
      width: fit-content;
      margin: 0px auto;
    }
  }
}
</style>
