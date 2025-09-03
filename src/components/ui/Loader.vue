<script setup lang="ts">
import type { VNode } from "vue";

import type { NuxtError } from "#app";

import LoadingSpinner from "~/assets/icons/LoadingSpinner.vue";

interface LoaderProps {
  isLoading: boolean;
  error?: NuxtError<any> | null;
  isEmpty?: boolean;
}

interface LoaderSlots {
  default(): VNode;
  loading?(): VNode;
  empty?(): VNode;
}

defineOptions({
  inheritAttrs: false,
});

const slots = defineSlots<LoaderSlots>();
const props = defineProps<LoaderProps>();

const errorMessage = computed(() => {
  return props.error?.data?.message;
});
</script>

<template>
  <template v-if="isLoading">
    <template v-if="slots.loading">
      <slot name="loading" />
    </template>
    <div v-else class="loading">
      <LoadingSpinner class="loading__loader" />
      <p>Loading...</p>
    </div>
  </template>
  <div v-else-if="error">
    <div class="error">
      <Icon class="error__icon" name="iconoir:warning-triangle" />
      <p class="error__title">Oops an error occured</p>
      <p>
        {{ errorMessage }}
      </p>
    </div>
  </div>
  <div v-else-if="isEmpty">
    <template v-if="slots.empty">
      <slot name="empty" />
    </template>
    <div v-else>
      <div class="empty">
        <NuxtImg class="empty__image" src="/images/error/empty.png" />
        <h4 class="empty__title">No Data</h4>
      </div>
    </div>
  </div>
  <template v-else>
    <slot name="default" />
  </template>
</template>

<style lang="scss" scoped>
.loading {
  padding: spacing(5);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: spacing(3);
  color: $primary-color;

  &__loader {
    width: 60px;
    height: 60px;
  }
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid $error-color;
  border-radius: spacing(2);
  padding: spacing(10);
  background-color: rgba($error-color, 0.1);
  color: $error-color;

  &__icon {
    margin-bottom: spacing(4);
    font-size: 60px;
  }

  &__title {
    font-size: to-rem(20);
    font-weight: bold;
    margin-bottom: spacing(2);

    @include min-xl {
      font-size: to-rem(28);
    }
  }
}

.empty {
  padding: spacing(10) spacing(6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: spacing(5);

  &__image {
    max-height: 250px;
    object-fit: contain;
  }

  &__title {
    font-size: to-rem(20);
    font-weight: 600;

    @include min-lg {
      font-size: to-rem(24);
    }
  }
}
</style>
