<script lang="ts" setup>
interface SkeletonProps {
  isLoading?: boolean;
  isCircle?: boolean;
  textLine?: number;
}

const props = defineProps<SkeletonProps>();
const isLoadingInject = inject<Ref<boolean>>("skeleton-loading");
const isLoadingComputed = computed(
  () => isLoadingInject?.value ?? props.isLoading
);
</script>

<template>
  <template v-if="isLoadingComputed">
    <div v-if="textLine" v-bind="$attrs" class="skeleton-text">
      <div
        v-for="(_, i) in [...Array(textLine)]"
        :key="i"
        class="skeleton skeleton--text"
      >
        <div>...</div>
      </div>
    </div>
    <div
      v-else
      class="skeleton"
      :class="{
        'skeleton--circle': isCircle,
      }"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<style lang="scss" scoped>
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

.skeleton {
  animation: blink 2s linear infinite;
  border-radius: spacing(2);
  background-color: #cccccc;

  * {
    visibility: hidden;
  }

  &--empty {
    padding: spacing(4);
  }

  &--circle {
    border-radius: 50%;
  }

  &--text {
    white-space: nowrap;
  }
}

.skeleton-text {
  display: flex !important;
  flex-direction: column;
  gap: spacing(1);
}
</style>
