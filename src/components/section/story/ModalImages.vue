<script setup lang="ts">
import UiModal from "~/components/ui/Modal.vue";
import { articles } from "~/constants/stories";

const images = [
  articles[0].image,
  articles[1].image,
  articles[2].image,
  articles[3].image,
];

const isOpen = defineModel<boolean>({ default: false });
const activeImage = ref(images[0]);
const activeImageIndex = computed(() =>
  images.findIndex((i) => i === activeImage.value)
);

const handleChangeImage = (image: string) => {
  activeImage.value = image;
};

const handleNext = () => {
  const nextIndex =
    activeImageIndex.value === images.length - 1
      ? 0
      : activeImageIndex.value + 1;
  activeImage.value = images[nextIndex];
};

const handlePrev = () => {
  const prevIndex =
    activeImageIndex.value === 0
      ? images.length - 1
      : activeImageIndex.value - 1;
  activeImage.value = images[prevIndex];
};
</script>

<template>
  <UiModal v-model="isOpen" with-close-button>
    <div class="story-images">
      <div class="story-images__image-wrapper">
        <img
          v-for="(image, index) in images"
          :key="index"
          class="story-images__main-image"
          :class="{ 'story-images__main-image--active': image === activeImage }"
          :src="image"
          alt=""
        />
        <button
          type="button"
          class="story-images__main-image-arrow story-images__main-image-arrow--left"
          @click="handlePrev"
        >
          <Icon name="iconoir:nav-arrow-left" size="80" />
        </button>
        <button
          type="button"
          class="story-images__main-image-arrow story-images__main-image-arrow--right"
          @click="handleNext"
        >
          <Icon name="iconoir:nav-arrow-right" size="80" />
        </button>
      </div>
      <div class="story-images__thumbs">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="story-images__item"
          @click="() => handleChangeImage(image)"
        >
          <Transition name="story-images__item-overlay-transition">
            <div
              v-if="image !== activeImage"
              class="story-images__item-overlay"
            ></div>
          </Transition>
          <img :src="image" alt="" class="story-images__item-image" />
        </div>
      </div>
    </div>
  </UiModal>
</template>

<style lang="scss" scoped>
.story-images {
  padding: 0px spacing(10) spacing(10) spacing(10);
  min-width: 900px;

  &__image-wrapper {
    position: relative;
    min-height: 500px;
    margin-bottom: spacing(7.5);
  }

  &__main-image {
    height: 500px;
    border-radius: spacing(2);
    width: 100%;
    object-fit: cover;
    opacity: 0;
    position: absolute;
    inset: 0;
    transition: opacity 0.3s;

    &--active {
      opacity: 1;
    }

    &-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;

      &--left {
        left: 0;
      }

      &--right {
        right: 0;
      }
    }
  }

  &__thumbs {
    display: flex;
    align-items: center;
    gap: spacing(7.5);
  }

  &__item {
    width: 100%;
    height: 200px;
    border-radius: spacing(2);
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &-overlay {
      position: absolute;
      inset: 0;
      background-color: rgba($color: #ffffff, $alpha: 0.5);

      &-transition-enter-active,
      &-transition-leave-active {
        transition: opacity 0.3s ease;
      }

      &-transition-enter-from,
      &-transition-leave-to {
        opacity: 0;
      }
    }

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
