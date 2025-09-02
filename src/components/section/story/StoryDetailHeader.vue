<script setup lang="ts">
import dayjs from "dayjs";

import UiAvatar from "~/components/ui/Avatar.vue";
import UiTag from "~/components/ui/Tag.vue";
import type { IStory } from "~/interfaces/story";

const story = inject<IStory>("story");
</script>

<template>
  <div class="story-header">
    <p class="story-header__date">
      {{ dayjs(story?.created_at).format("DD MMMM YYYY") }}
    </p>
    <h1 class="story-header__title">{{ story?.title }}</h1>
    <div class="story-header__author">
      <UiAvatar :src="story?.author.profile_image ?? ''" />
      <p>{{ story?.author.name }}</p>
    </div>
    <UiTag>
      {{ story?.category }}
    </UiTag>
  </div>
</template>

<style lang="scss" scoped>
.story-header {
  padding-top: spacing(15);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__date {
    font-size: to-rem(20);
    @include min-lg {
      font-size: to-rem(24);
    }
  }

  &__title {
    font-size: to-rem(50);
    margin: 50px 0px;

    @include min-lg {
      font-size: to-rem(60);
    }
  }

  &__author {
    display: flex;
    gap: spacing(2.5);
    font-size: to-rem(20);
    align-items: center;
    margin-bottom: spacing(10);
  }

  :deep(.tag) {
    text-transform: capitalize;
    font-size: to-rem(20);
    padding: spacing(3) spacing(8);

    @include min-lg {
      font-size: to-rem(24);
    }
  }
}
</style>
