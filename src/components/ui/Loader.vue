<script setup lang="ts">
import type { VNode } from "vue";

import type { NuxtError } from "#app";

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
    <div v-else>Loading...</div>
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
    <div v-else>No Data</div>
  </div>
  <template v-else>
    <slot name="default" />
  </template>
</template>

<style lang="scss" scoped>
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
</style>
