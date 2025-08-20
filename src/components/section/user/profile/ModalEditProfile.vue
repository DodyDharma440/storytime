<script setup lang="ts">
import UiModal from "~/components/ui/Modal.vue";

import EditProfileForm from "./EditProfileForm.vue";

const isOpen = defineModel<boolean>();
</script>

<template>
  <UiModal v-model="isOpen">
    <div class="edit-profile__header">
      <h3 class="section-title">Edit Profile</h3>
      <button
        type="button"
        class="edit-profile__header-close-btn"
        @click="isOpen = false"
      >
        <Icon name="mdi:close" size="30" />
      </button>
    </div>
    <div class="edit-profile__body">
      <EditProfileForm @close="isOpen = false" />
    </div>
  </UiModal>
</template>

<style lang="scss" scoped>
.edit-profile {
  &__header {
    padding: spacing(2) spacing(2) 0px spacing(2);
    display: flex;
    justify-content: space-between;

    @include min-md {
      padding: spacing(6) spacing(6) 0px spacing(6);
    }

    @include min-xl {
      padding: spacing(10) spacing(10) 0px spacing(10);
    }

    &-close-btn {
      width: 30px;
      height: 30px;
    }
  }

  &__body {
    padding: spacing(2);

    @include min-md {
      padding: spacing(6);
    }

    @include min-xl {
      padding: spacing(10);
    }
  }
}
</style>
