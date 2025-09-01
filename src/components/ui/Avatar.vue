<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface AvatarProps extends /* @vue-ignore */ HTMLAttributes {
  src?: string | null;
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
    <NuxtImg v-if="src" :src="src" class="avatar__image" />
    <Icon v-else name="iconoir:user" :size="(size ?? 50) / 1.5" />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #dddddd;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
