<script setup lang="ts">
import { NuxtImg } from "#components";
import BookmarkIcon from "~/assets/icons/BookmarkIcon.vue";
import type { IStory, StorySectionType } from "~/interfaces/story";

interface StoryCardProps {
  story: IStory;
  storyType: StorySectionType;
}

defineProps<StoryCardProps>();
</script>

<template>
  <div
    class="story-card"
    :class="{
      'story-card--large': story.isHighlight,
      'story-card--small': !story.isHighlight,
    }"
  >
    <div class="story-card__thumbnail">
      <NuxtImg
        :src="`/stories/${storyType}/${story.thumbnail}`"
        class="story-card__thumbnail-image"
        :alt="`${story.title} thumb`"
      />
      <button v-if="story.bookmark" class="story-card__bookmark-btn">
        <BookmarkIcon class="story-card__bookmark-btn-icon" />
      </button>
    </div>
    <div>
      <h6 class="story-card__title">{{ story.title }}</h6>
      <p class="story-card__description">{{ story.description }}</p>

      <div class="story-card__info">
        <div class="story-card__info-author">
          <div class="story-card__info-author-avatar">
            <NuxtImg
              :src="`/avatars/${story.avatar}`"
              class="story-card__info-author-avatar-image"
            />
          </div>
          <p class="story-card__info-author-name">
            {{ story.author }}
          </p>
        </div>

        <div class="story-card__info-subinfo">
          <p>{{ story.date }}</p>
          <div v-if="story.category" class="story-card__info-subinfo-tag">
            <span>{{ story.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    height: 64px;
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

      &-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #dddddd;

        &-image {
          object-fit: cover;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }

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

      &-tag {
        padding: spacing(2) spacing(3);
        border-radius: spacing(2);
        text-align: center;
        background-color: $primary-color-light;
        color: $primary-color;
      }
    }
  }

  &__bookmark-btn {
    position: absolute;
    right: spacing(6);
    bottom: spacing(6);
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $primary-color;
    border-radius: 50%;
    transition: background-color 0.3s, transform 0.3s;
    color: #f0f5ed;

    @include min-md {
      right: spacing(8);
      bottom: spacing(8);
    }

    @include min-lg {
      right: spacing(10);
      bottom: spacing(10);
      width: 65px;
      height: 65px;
    }

    &:hover {
      background-color: rgba($primary-color, 0.9);
    }

    &:active {
      transform: translateY(spacing(0.5));
    }

    &-icon {
      width: 42px;
      height: 42px;
      object-fit: contain;

      @include min-md {
        width: 48px;
        height: 48px;
      }

      @include min-lg {
        width: 52px;
        height: 52px;
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
