<script setup lang="ts">
import UiAvatar from "~/components/ui/Avatar.vue";
import UiButton from "~/components/ui/Button.vue";
import { articles } from "~/constants/stories";

import ModalEditProfile from "./ModalEditProfile.vue";

const isOpen = ref(false);

const handleOpen = () => {
  isOpen.value = true;
};
</script>

<template>
  <div class="profile">
    <div class="container profile__content">
      <UiAvatar :src="articles[0].authorAvatar" :size="200" />
      <div class="profile__content-bio">
        <h2 class="profile__content-title">Iswara</h2>
        <p class="profile__content-email">dewiratnaiswara99@gmail.com</p>
        <p class="profile__content-description">
          Avid reader and aspiring writer. Lover of mysteries, thrillers, and
          sci-fi. Coffee enthusiast and nature explorer. Always on the lookout
          for new stories and adventures.
        </p>
      </div>
      <UiButton @click="handleOpen"> Edit Profile </UiButton>
    </div>

    <ModalEditProfile v-model="isOpen" />
  </div>
</template>

<style lang="scss" scoped>
.profile {
  background-color: $primary-color-light;

  &__content {
    display: flex;
    gap: spacing(6);
    flex-direction: column;
    padding: spacing(10);

    @include min-md {
      padding: 60px 100px;
    }

    @include min-lg {
      flex-direction: row;
      gap: spacing(10);
      align-items: center;
    }

    @include min-xl {
      padding: 100px 140px;
    }

    &-bio {
      flex: 1;
      font-size: to-rem(20);

      @include min-lg {
        font-size: to-rem(24);
      }
    }

    &-title {
      font-family: "DM Sans", sans-serif;
      font-weight: 700;
      font-size: to-rem(30);
      margin-bottom: spacing(2.5);

      @include min-lg {
        font-size: to-rem(36);
      }
    }

    &-email {
      margin-bottom: spacing(7.5);
    }

    &-description {
      color: #4b4b4b;
    }
  }
}
</style>
