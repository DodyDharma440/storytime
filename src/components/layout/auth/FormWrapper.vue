<script setup lang="ts">
interface FormWrapperProps {
  title: string;
  formPosition: "left" | "right";
}

defineProps<FormWrapperProps>();
</script>

<template>
  <div
    class="form-wrapper"
    :class="{
      'form-wrapper--left': formPosition === 'left',
      'form-wrapper--right': formPosition === 'right',
    }"
  >
    <div class="form-wrapper__content">
      <h2 class="form-wrapper__title">
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  padding-top: spacing(5);
  padding-bottom: spacing(5);
  padding-right: spacing(5);
  padding-left: spacing(5);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include min-md {
    padding-top: spacing(8);
    padding-bottom: spacing(8);
    padding-right: spacing(8);
    padding-left: spacing(8);
  }

  @include min-xl {
    padding-top: spacing(16);
    padding-bottom: spacing(16);
    padding-right: spacing(16);
    padding-left: spacing(16);
  }

  &--left {
    @include min-xl {
      padding-right: 144px;
      align-items: flex-end;
    }
  }

  &--right {
    @include min-xl {
      padding-left: 144px;
    }
  }

  &__content {
    width: 100%;
    @include min-xl {
      max-width: 577px;
    }
  }

  &__title {
    width: 100%;
    font-size: to-rem(36);
    font-family: "DM Sans", sans-serif;
    margin-bottom: spacing(12.5);

    @include min-lg {
      font-size: to-rem(44);
    }
  }
}
</style>
