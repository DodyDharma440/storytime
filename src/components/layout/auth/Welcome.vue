<script setup lang="ts">
import DefaultLogo from "~/components/layout/default/Logo.vue";

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
        <div v-if="withLogo" class="welcome__content-logo">
          <DefaultLogo />
        </div>

        <h1 class="welcome__content-title">{{ title }}</h1>
        <p class="welcome__content-description">{{ description }}</p>
      </div>
      <div
        class="welcome__illustration"
        :class="{ 'welcome__illustration--with-logo': withLogo }"
      >
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
  align-items: center;
  justify-content: center;
  display: none;

  @include min-xl {
    display: flex;
  }

  &__content {
    padding: 114px 137px 62px 137px;

    &--with-logo {
      padding: 30px 62px 32px 62px;

      .welcome {
        &__content {
          &-title {
            max-width: 100%;
          }

          &-logo {
            margin-bottom: 70px;
          }
        }
      }
    }

    &-title {
      max-width: 549px;
      font-size: to-rem(50);
      margin-bottom: spacing(10);

      @include min-xxl {
        font-size: to-rem(60);
        line-height: to-rem(74);
      }
    }

    &-description {
      font-size: to-rem(20);
      color: #4b4b4b;

      @include min-xxl {
        font-size: to-rem(26);
        line-height: to-rem(38);
      }
    }
  }

  &__illustration {
    display: flex;
    align-items: center;
    justify-content: center;

    &-image {
      max-width: 100%;
      object-fit: contain;
      min-height: 600px;
    }

    &--with-logo {
      .welcome {
        &__illustration {
          &-image {
            min-height: 585px;
            margin-bottom: -10px;
            transform: translateY(-10px);
          }
        }
      }
    }
  }
}
</style>
