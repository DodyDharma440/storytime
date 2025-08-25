<script setup lang="ts">
import dayjs from "dayjs";

import UiAvatar from "~/components/ui/Avatar.vue";
import UiSkeleton from "~/components/ui/Skeleton.vue";
import UiTag from "~/components/ui/Tag.vue";
import type { IStory } from "~/interfaces/story";

interface StoryCardProps {
  story: IStory;
  isHighlight?: boolean;
  isGrid?: boolean;
  withCategory?: boolean;
  isEditable?: boolean;
  isLoading?: boolean;
}

interface StoryCardEmits {
  (e: "delete", id: string): void;
}

const emit = defineEmits<StoryCardEmits>();

const props = withDefaults(defineProps<StoryCardProps>(), {
  withCategory: true,
});

const handleEdit = (e: Event, slug: string) => {
  e.preventDefault();
  navigateTo({
    name: "dashboard-story-slug-edit",
    params: { slug },
  });
};

const handleDelete = (e: Event, id: string) => {
  e.preventDefault();
  emit("delete", id);
};

const isLoadingProps = toRef(props, "isLoading");
provide("skeleton-loading", isLoadingProps);
</script>

<template>
  <article
    class="story-card"
    :class="{
      'story-card--large': isGrid && isHighlight,
      'story-card--small': isGrid && !isHighlight,
    }"
  >
    <UiSkeleton>
      <div class="story-card__thumbnail">
        <NuxtImg
          :src="story.image"
          class="story-card__thumbnail-image"
          :alt="`${story.title} thumb`"
          loading="lazy"
        />

        <div v-if="isEditable" class="story-card__actions">
          <button
            type="button"
            class="story-card__actions-button"
            @click="(e) => handleEdit(e, 'some-id')"
          >
            <Icon name="mage:edit" />
          </button>
          <button
            type="button"
            class="story-card__actions-button"
            @click="(e) => handleDelete(e, 'some-id')"
          >
            <Icon name="weui:delete-outlined" />
          </button>
        </div>
      </div>
    </UiSkeleton>

    <div>
      <UiSkeleton :text-line="1" class="story-card__title-skeleton">
        <h6 class="story-card__title">
          {{ story.title }}
        </h6>
      </UiSkeleton>
      <UiSkeleton :text-line="3" class="story-card__description-skeleton">
        <p class="story-card__description">
          {{ story.shortContent }}
        </p>
      </UiSkeleton>

      <div class="story-card__info">
        <div v-if="!isEditable" class="story-card__info-author">
          <UiSkeleton is-circle>
            <UiAvatar :src="story.authorAvatar" />
          </UiSkeleton>

          <UiSkeleton>
            <p class="story-card__info-author-name">
              {{ story.authorName }}
            </p>
          </UiSkeleton>
        </div>

        <div
          class="story-card__info-subinfo"
          :class="{ 'story-card__info-subinfo--editable': isEditable }"
        >
          <UiSkeleton>
            <p>{{ dayjs(story.createdDate).format("DD MMMM YYYY") }}</p>
          </UiSkeleton>
          <UiSkeleton>
            <UiTag v-if="withCategory">
              <span>{{ story.category }}</span>
            </UiTag>
          </UiSkeleton>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@mixin title-styles {
  font-size: to-rem(26);
  margin-bottom: spacing(5);
  font-weight: 700;
  transition: color 0.3s;
  @include line-clamp(2);
  overflow: hidden;

  @include min-lg {
    font-size: to-rem(36);
  }
}

@mixin description-styles {
  @include line-clamp(3);
  margin-bottom: spacing(5);
  overflow: hidden;
}

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
    overflow: hidden;
    position: relative;
    background-color: #dddddd;

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

  &__actions {
    position: absolute;
    right: spacing(10);
    bottom: spacing(10);
    display: flex;
    align-items: center;
    gap: spacing(7.5);

    &-button {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background-color: $primary-color;
      transition: all 0.3s;
      color: #fff;
      font-size: to-rem(52);
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba($color: $primary-color, $alpha: 0.9);
      }
    }
  }

  &__title {
    @include title-styles;
  }

  :deep(.story-card__title-skeleton) {
    @include title-styles;
  }

  &__description {
    @include description-styles;
  }

  :deep(.story-card__description-skeleton) {
    @include description-styles;
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

      &--editable {
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
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
