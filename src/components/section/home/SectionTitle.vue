<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "vue-router";

import ArrowRightIcon from "~/assets/icons/ArrowRightIcon.vue";

export interface SectionTitleProps {
  title: string;
  exploreHref?:
    | string
    | RouteLocationAsRelativeGeneric
    | RouteLocationAsPathGeneric;
  withContainer?: boolean;
}

defineProps<SectionTitleProps>();
</script>

<template>
  <div class="section-title" :class="{ container: withContainer }">
    <div class="section-title__content">
      <h2 class="section-title__text">{{ title }}</h2>
      <NuxtLink
        v-if="exploreHref"
        :to="exploreHref"
        class="section-title__explore-btn"
      >
        Explore more
        <ArrowRightIcon class="section-title__explore-btn-icon" />
      </NuxtLink>
    </div>

    <hr class="section-title__divider" />
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  font-weight: 400;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__text {
    font-family: "Playfair Display", serif;
    font-weight: 600;
    font-size: to-rem(36);
    text-shadow: 4px 2px 4px #00000040;

    @include min-md {
      font-size: to-rem(40);
    }

    @include min-lg {
      font-size: to-rem(44);
    }
  }

  &__explore-btn {
    display: flex;
    align-items: center;
    gap: 1px;
    font-size: to-rem(18);
    transition: color 0.2s;

    @include min-md {
      font-size: to-rem(20);
    }

    @include min-lg {
      font-size: to-rem(24);
    }

    &:hover {
      color: $primary-color;

      .section-title__explore-btn-icon {
        transform: translateX(spacing(2));
      }
    }

    &-icon {
      width: 24px;
      height: 14px;
      transition: transform 0.4s;

      @include min-lg {
        width: 34px;
        height: 24px;
      }
    }
  }

  &__divider {
    border-color: #cccccc;
    margin: spacing(8) 0px;

    @include min-lg {
      margin: spacing(10) 0px;
    }
  }
}
</style>
