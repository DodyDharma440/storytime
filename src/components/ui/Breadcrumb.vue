<script setup lang="ts">
import type { BreadcrumbItem } from "~/interfaces/ui";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

defineProps<BreadcrumbProps>();
</script>

<template>
  <div class="breadcrumb">
    <div class="container breadcrumb__content">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb__content-item"
      >
        <NuxtLink
          v-if="!item.isActive"
          :to="item.href"
          class="breadcrumb__content-item-link"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="breadcrumb__content-item-link">
          {{ item.label }}
        </span>

        <span
          v-if="index < items.length - 1"
          class="breadcrumb__content-separator"
        >
          /
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  background-color: $primary-color-light;
  padding: spacing(7) 0px;

  &__content {
    display: flex;
    align-items: center;
    gap: spacing(4);
    color: $primary-color;
    font-size: to-rem(16);
    font-weight: 500;

    @include min-sm {
      font-size: to-rem(18);
    }

    @include min-lg {
      font-size: to-rem(20);
    }

    &-item {
      display: flex;
      align-items: center;

      &-link {
        border-bottom: 2px solid transparent;
        transition: all 0.3s;
        padding: spacing(1) 0px;
        &:hover {
          border-bottom-color: $primary-color;
        }
      }
    }

    &-separator {
      margin-left: spacing(4);
    }
  }
}
</style>
