<script setup lang="ts">
interface WelcomeProps {
  title: string;
  description: string;
  image: string;
  withLogo?: boolean;
}

defineProps<WelcomeProps>();
</script>

<template>
  <div class="welcome">
    <div>
      <div
        class="welcome__content"
        :class="{ 'welcome__content--with-logo': withLogo }"
      >
        <h1 class="welcome__content-title">{{ title }}</h1>
        <p class="welcome__content-description">{{ description }}</p>
      </div>
      <div class="welcome__illustration">
        <NuxtImg :src="image" class="welcome__illustration-image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome {
  min-height: calc(100dvh - spacing(10));
  border-radius: spacing(2);
  background-color: $primary-color-light;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    padding: 114px 137px 62px 137px;

    &--with-logo {
      padding: 70px 62px 32px 62px;

      .welcome {
        &__content {
          &-title {
            max-width: 100%;
          }
        }
      }
    }

    &-title {
      max-width: 549px;
      font-size: to-rem(60);
      line-height: to-rem(74);
      margin-bottom: spacing(10);
    }

    &-description {
      font-size: to-rem(26);
      line-height: to-rem(38);
      color: #4b4b4b;
    }
  }

  &__illustration {
    display: flex;
    align-items: center;
    justify-content: center;

    &-image {
      object-fit: contain;
      min-height: 600px;
    }
  }
}
</style>
