<script setup lang="ts">
import MenuIcon from "~/assets/icons/MenuIcon.vue";
import UiButton from "~/components/ui/Button.vue";
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
        <button id="nav-mobile-button" class="navbar__actions-mobile-button">
          <MenuIcon class="navbar__actions-mobile-button-icon" />
        </button>

        <div id="nav-mobile-menu" class="navbar__actions-mobile-menu-wrapper" />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
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

      &-menu-wrapper {
        transition: opacity 0.5s ease;
      }

      &-menu {
        @keyframes fade-menu {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        & {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #ffffff;
          padding: spacing(3);
          border-radius: spacing(2);
          margin-top: spacing(2);
          box-shadow: 0 2px 2px 2px #00000017;
          min-width: 150px;
          display: flex;
          align-items: center;
          gap: spacing(3);
          flex-direction: column;
          animation: fade-menu 0.5s ease;

          .btn {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
