<script setup lang="ts">
import { NuxtLink } from "#components";
import type { ButtonHTMLAttributes } from "vue";

export type ButtonVariant = "solid" | "outline";

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loaderPosition?: "left" | "right";
  href?: string;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "solid",
  loaderPosition: "left",
  href: undefined,
});
</script>

<template>
  <component
    :is="href ? NuxtLink : 'button'"
    class="btn"
    :href="href"
    :class="{
      'btn--primary': variant === 'solid',
      'btn--primary-outline': variant === 'outline',
    }"
  >
    <slot />
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
  transition: background-color 0.3s, transform 0.3s;

  @include min-lg {
    font-size: to-rem(24);
    padding: spacing(3.5) spacing(7.5);
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
