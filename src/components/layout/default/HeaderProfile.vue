<script setup lang="ts">
import UiAlertDialog from "~/components/ui/AlertDialog.vue";
import UiAvatar from "~/components/ui/Avatar.vue";
import UiDropdown from "~/components/ui/Dropdown.vue";
import { useLogout } from "~/composables/modules/auth";

const userStore = useUserAuthStore();

const isOpenLogout = ref(false);
const buttonRef = useTemplateRef("button-ref");

const { isLoading, mutate } = useLogout();

const handleLogout = () => {
  mutate({});
};
</script>

<template>
  <div>
    <UiDropdown :button-ref="buttonRef">
      <template #button="slotProps">
        <div
          ref="button-ref"
          class="navbar-profile"
          tabindex="0"
          role="button"
          @click="slotProps.onToggle"
        >
          <UiAvatar :src="userStore.user?.profile_image" />
          <div class="navbar-profile__info">
            <p class="navbar-profile__info-name">{{ userStore.user?.name }}</p>
            <Icon class="navbar-profile__info-icon" name="mdi:chevron-down" />
          </div>
        </div>
      </template>

      <template #default="slotProps">
        <div class="profile-menu">
          <div class="profile-menu__item profile-menu__item-name">
            <p>
              {{ userStore.user?.name }}
            </p>
          </div>
          <NuxtLink
            :to="{ name: 'dashboard' }"
            class="profile-menu__item"
            @click="slotProps.onClose"
          >
            My Profile
          </NuxtLink>
          <button
            type="button"
            class="profile-menu__item"
            @click="isOpenLogout = true"
          >
            Logout
          </button>
        </div>
      </template>
    </UiDropdown>
    <UiAlertDialog
      :is-open="isOpenLogout"
      title="Logout"
      description="Are you sure want to logout?"
      confirm-button-text="Logout"
      :is-loading="isLoading"
      @close="isOpenLogout = false"
      @confirm="handleLogout"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.dropdown__content) {
  margin-top: spacing(2);
}

.navbar-profile {
  display: flex;
  align-items: center;
  gap: spacing(2);
  cursor: pointer;

  @include min-lg {
    gap: spacing(2.5);
  }

  &__info {
    display: flex;
    align-items: center;
    font-size: to-rem(24);
    font-weight: 700;

    &-name {
      display: none;
      @include min-lg {
        display: block;
        max-width: 150px;
        @include line-clamp(1);
      }
    }

    &-icon {
      font-size: to-rem(30);
    }
  }

  :deep(.avatar) {
    width: 50px;
    height: 50px;

    @include min-lg {
      width: 65px;
      height: 65px;
    }
  }
}

.profile-menu {
  font-size: to-rem(20);
  min-width: 185px;

  &__item {
    padding: spacing(4) spacing(5);
    width: 100%;
    text-align: left;
    display: block;
    transition: all 0.3s;

    &:hover {
      color: $primary-color;
    }

    &-name {
      text-align: center;
      font-weight: 700;
      border-bottom: 1px solid #cccccc;
      max-width: 200px;

      & > p {
        @include line-clamp(1);
      }

      @include min-lg {
        display: none;
      }
    }
  }
}
</style>
