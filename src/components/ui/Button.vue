<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

import { NuxtLink } from "#components";

import LoadingSpinner from "~/assets/icons/LoadingSpinner.vue";

export type ButtonVariant = "solid" | "outline";

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  is?: any;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabledLoading?: boolean;
  loaderPosition?: "left" | "right";
  href?: string;
  disabled?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "solid",
  loaderPosition: "left",
  href: undefined,
  disabledLoading: true,
  is: "button",
});
</script>

<template>
  <component
    :is="href ? NuxtLink : is ?? 'button'"
    class="btn"
    :href="href"
    :class="{
      'btn--primary': variant === 'solid',
      'btn--primary-outline': variant === 'outline',
    }"
    :disabled="isLoading && disabledLoading ? true : disabled"
  >
    <LoadingSpinner
      v-if="isLoading && loaderPosition === 'left'"
      class="btn__loader"
    />
    <slot />
    <LoadingSpinner
      v-if="isLoading && loaderPosition === 'right'"
      class="btn__loader"
    />
  </component>
</template>

<style lang="scss" scoped>
.btn {
  padding: spacing(2.5) spacing(6.5);
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: to-rem(20);
  border-radius: spacing(2);
  border: 2px solid;
  border-color: transparent;
  gap: spacing(2);
  transition: background-color 0.3s, transform 0.3s;

  @include min-lg {
    font-size: to-rem(24);
    padding: spacing(3.5) spacing(7.5);
  }

  &__loader {
    width: 30px;
    height: 30px;
    margin-right: spacing(2);
  }

  &:active {
    transform: translateY(spacing(0.5));
  }

  &:disabled,
  &--disabled {
    background-color: #e3e3e3;
    color: #919191;
    cursor: not-allowed;
    border: 0;
    &:hover {
      background-color: #e3e3e3;
      color: #919191;
    }
  }

  &--primary {
    background-color: $primary-color;
    color: #ffffff;
    &:hover {
      background-color: rgba($primary-color, 0.9);
    }
  }

  &--primary-outline {
    color: $primary-color;
    border-color: $primary-color;
    background-color: transparent;
    &:hover {
      background-color: $primary-color;
      color: #ffffff;
    }
  }
}
</style>
