<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface AvatarProps extends /* @vue-ignore */ HTMLAttributes {
  src: string;
  size?: number;
}

defineProps<AvatarProps>();
</script>

<template>
  <div
    class="avatar"
    :style="
      size
        ? {
            width: `${size}px`,
            height: `${size}px`,
          }
        : {}
    "
  >
    <NuxtImg :src="src" class="avatar__image" />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #dddddd;
  overflow: hidden;

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
