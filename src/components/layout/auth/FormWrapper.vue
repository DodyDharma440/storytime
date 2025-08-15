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
  padding-top: spacing(16);
  padding-bottom: spacing(16);
  padding-right: spacing(16);
  padding-left: spacing(16);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &--left {
    padding-right: 144px;
    align-items: flex-end;
  }

  &--right {
    padding-left: 144px;
  }

  &__content {
    max-width: 577px;
    width: 100%;
  }

  &__title {
    width: 100%;
    font-size: to-rem(44);
    font-family: "DM Sans", sans-serif;
    margin-bottom: spacing(12.5);
  }
}
</style>
