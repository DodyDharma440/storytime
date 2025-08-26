<script setup lang="ts">
import MenuIcon from "~/assets/icons/MenuIcon.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiButton from "~/components/ui/Button.vue";
import UiDropdown from "~/components/ui/Dropdown.vue";

import HeaderProfile from "./HeaderProfile.vue";

const IS_LOGIN = false;

const mobileButtonRef = useTemplateRef("mobile-button-ref");
</script>

<template>
  <nav class="navbar">
    <div class="container navbar__content">
      <DefaultLogo />

      <HeaderProfile v-if="IS_LOGIN" />
      <template v-else>
        <div class="navbar__actions">
          <UiButton variant="outline" :href="{ name: 'register' }">
            Register
          </UiButton>
          <UiButton :href="{ name: 'login' }">Login</UiButton>
        </div>

        <div class="navbar__actions-mobile">
          <UiDropdown :button-ref="mobileButtonRef">
            <template #button="slotProps">
              <button
                id="nav-mobile-button"
                ref="mobile-button-ref"
                type="button"
                class="navbar__actions-mobile-button"
                @click="slotProps.onToggle"
              >
                <MenuIcon class="navbar__actions-mobile-button-icon" />
              </button>
            </template>

            <template #default>
              <div class="navbar__actions-mobile-menu">
                <UiButton variant="outline" :href="{ name: 'register' }">
                  Register
                </UiButton>
                <UiButton :href="{ name: 'login' }"> Login </UiButton>
              </div>
            </template>
          </UiDropdown>
        </div>
      </template>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.navbar {
  box-shadow: 0px 1px 4px 0px #0c0c0d0d;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: $main-background;
  z-index: $navbar-z-index;

  &__content {
    padding: spacing(3);
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include min-lg {
      padding: spacing(5);
    }
  }

  &__actions {
    display: none;

    @include min-md {
      display: flex;
      align-items: center;
      gap: spacing(5);
    }

    @include min-lg {
      gap: spacing(7.5);
    }

    &-mobile {
      display: block;
      position: relative;

      @include min-md {
        display: none;
      }

      &-button {
        display: flex;
        align-items: center;
        justify-content: center;

        &-icon {
          width: 28px;
          height: 28px;
        }
      }

      :deep(.dropdown__content) {
        margin-top: spacing(2);
      }

      &-menu {
        min-width: 150px;
        display: flex;
        align-items: center;
        gap: spacing(3);
        padding: spacing(3);
        flex-direction: column;

        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
