<script setup lang="ts">
import type { HTMLAttributes } from "vue";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TagProps extends /* @vue-ignore */ HTMLAttributes {}

defineProps<TagProps>();
</script>

<template>
  <div class="tag" v-bind="$attrs">
    <span>
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  padding: spacing(2) spacing(3);
  border-radius: spacing(2);
  text-align: center;
  background-color: $primary-color-light;
  color: $primary-color;
}
</style>
