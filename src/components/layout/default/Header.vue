<script setup lang="ts">
import MenuIcon from "~/assets/icons/MenuIcon.vue";
import UiButton from "~/components/ui/Button.vue";

import HeaderMobileMenu from "./HeaderMobileMenu.vue";

const isOpen = ref(false);

const handleToggle = (e: Event) => {
  e.stopPropagation();
  isOpen.value = !isOpen.value;
};

const handleClose = () => {
  isOpen.value = false;
};
</script>

<template>
  <nav class="navbar">
    <div class="container navbar__content">
      <NuxtLink href="/">
        <NuxtImg src="/logo.png" alt="Storytime Logo" class="navbar__logo" />
      </NuxtLink>

      <div class="navbar__actions">
        <UiButton variant="outline">Register</UiButton>
        <UiButton>Login</UiButton>
      </div>

      <div class="navbar__actions-mobile">
        <button
          id="nav-mobile-button"
          type="button"
          class="navbar__actions-mobile-button"
          @click="handleToggle"
        >
          <MenuIcon class="navbar__actions-mobile-button-icon" />
        </button>

        <Transition name="fade">
          <HeaderMobileMenu v-if="isOpen" @close="handleClose" />
        </Transition>
      </div>
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

  &__logo {
    width: 180px;
    height: 100%;

    @include min-lg {
      width: 254px;
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
    }
  }
}
</style>
