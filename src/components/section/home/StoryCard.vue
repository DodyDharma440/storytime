<script setup lang="ts">
import dayjs from "dayjs";
import UiAvatar from "~/components/ui/Avatar.vue";
import UiTag from "~/components/ui/Tag.vue";
import type { IStory } from "~/interfaces/story";

interface StoryCardProps {
  story: IStory;
  isHighlight?: boolean;
  isGrid?: boolean;
  withCategory?: boolean;
}

defineProps<StoryCardProps>();
</script>

<template>
  <article
    class="story-card"
    :class="{
      'story-card--large': isGrid && isHighlight,
      'story-card--small': isGrid && !isHighlight,
    }"
  >
    <div class="story-card__thumbnail">
      <NuxtImg
        :src="story.image"
        class="story-card__thumbnail-image"
        :alt="`${story.title} thumb`"
      />
    </div>
    <div>
      <h6 class="story-card__title">{{ story.title }}</h6>
      <p class="story-card__description">{{ story.shortContent }}</p>

      <div class="story-card__info">
        <div class="story-card__info-author">
          <UiAvatar :src="story.authorAvatar" />

          <p class="story-card__info-author-name">
            {{ story.authorName }}
          </p>
        </div>

        <div class="story-card__info-subinfo">
          <p>{{ dayjs(story.createdDate).format("DD MMMM YYYY") }}</p>
          <UiTag v-if="withCategory">
            <span>{{ story.category }}</span>
          </UiTag>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.story-card {
  transition: transform 0.4s;

  &:hover {
    transform: translateY(spacing(-1));

    .story-card {
      &__thumbnail {
        &-image {
          transform: scale(1.05);
        }
      }

      &__title {
        color: $primary-color;
      }
    }
  }

  &__thumbnail {
    height: 400px;
    border-radius: spacing(2);
    margin-bottom: spacing(5);
    background: #dddddd;
    overflow: hidden;
    position: relative;

    @include min-lg {
      height: 500px;
    }

    &-image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: transform 0.4s;
    }
  }

  &__title {
    font-size: to-rem(26);
    margin-bottom: spacing(5);
    font-weight: 700;
    transition: color 0.3s;

    @include min-lg {
      font-size: to-rem(36);
    }
  }

  &__description {
    margin-bottom: spacing(5);
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: spacing(5);
    margin-bottom: spacing(2);

    &-author {
      display: flex;
      align-items: center;
      gap: spacing(2.5);
      flex: 1;

      &-name {
        font-size: to-rem(20);
        font-weight: 500;
        flex: 1;
      }
    }

    &-subinfo {
      display: flex;
      align-items: flex-end;
      gap: spacing(2);
      flex-direction: column-reverse;

      @include min-lg {
        align-items: center;
        flex-direction: row;
        gap: spacing(5);
      }

      .tag {
        text-transform: capitalize;
      }
    }
  }

  &--large {
    .story-card__thumbnail {
      height: 700px;

      @include min-md {
        height: 800px;
      }

      @include min-lg {
        height: 1066px;
      }
    }

    .story-card__bookmark-btn {
      width: 80px;
      height: 80px;
      right: spacing(10);
      bottom: spacing(10);

      @include min-md {
        right: spacing(12);
        bottom: spacing(12);
      }

      @include min-lg {
        right: spacing(15);
        bottom: spacing(15);
        width: 100px;
        height: 100px;
      }

      &-icon {
        width: 50px;
        height: 50px;

        @include min-lg {
          width: 60px;
          height: 60px;
        }
      }
    }
  }

  &--small {
    .story-card__thumbnail {
      height: 400px;
    }
  }
}
</style>
