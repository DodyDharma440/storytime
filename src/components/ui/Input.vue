<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

export interface InputProps extends /* @vue-ignore */ InputHTMLAttributes {
  classNames?: Partial<Record<"wrapper" | "leftIcon" | "rightIcon", string>>;
}

type InputSlots = {
  leftIcon?(): any;
  rightIcon?(): any;
  label?(): any;
};

defineProps<InputProps>();
const slots = defineSlots<InputSlots>();
</script>

<template>
  <div class="input" :class="classNames?.wrapper">
    <div
      v-if="slots.leftIcon"
      class="input__left-icon"
      :class="classNames?.leftIcon"
    >
      <slot name="leftIcon" />
    </div>
    <slot name="label" />
    <input
      class="input__field"
      :class="{
        'input__field--with-left-icon': slots.leftIcon,
        'input__field--with-right-icon': slots.rightIcon,
      }"
      v-bind="$attrs"
    />
    <div
      v-if="slots.rightIcon"
      class="input__right-icon"
      :class="classNames?.rightIcon"
    >
      <slot name="rightIcon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin icon-style {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b4b4b;

  @include min-lg {
    width: 30px;
    height: 30px;
  }
}

.input {
  position: relative;
  width: 100%;

  &__field {
    padding-top: spacing(5);
    padding-bottom: spacing(5);
    padding-right: spacing(5.5);
    padding-left: spacing(5.5);
    border-radius: spacing(2);
    border: 2px solid #cccccc;
    width: 100%;
    font-size: to-rem(20);
    transition: all 0.3s;
    outline: 2px solid transparent;

    &:focus {
      border-color: $primary-color;
      outline-color: $primary-color;
    }

    @include min-lg {
      padding-top: spacing(6);
      padding-bottom: spacing(6);
      padding-right: spacing(7.5);
      padding-left: spacing(7.5);
      font-size: to-rem(24);
    }

    &--with-right-icon {
      padding-right: spacing(16);

      @include min-lg {
        padding-right: spacing(20);
      }
    }

    &--with-left-icon {
      padding-left: spacing(16);

      @include min-lg {
        padding-left: spacing(20);
      }
    }
  }

  &__right-icon {
    right: spacing(5.5);
    @include icon-style();

    @include min-lg {
      right: spacing(7.5);
    }
  }

  &__left-icon {
    left: spacing(5.5);
    @include icon-style();

    @include min-lg {
      left: spacing(7.5);
    }
  }
}
</style>
