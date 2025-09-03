<script setup lang="ts">
import type { ToastStatus } from "~/interfaces/toast";

const iconName: Record<ToastStatus, string> = {
  success: "iconoir:check-circle",
  warning: "iconoir:warning-triangle",
  error: "iconoir:warning-circle",
};
const iconClasses: Record<ToastStatus, string> = {
  success: "toasts__item-icon--success",
  warning: "toasts__item-icon--warning",
  error: "toasts__item-icon--error",
};

const toastStore = useToastStore();

const toasts = computed(() => {
  return toastStore.toasts.toReversed();
});
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toastStore.toasts.length" class="toasts">
        <TransitionGroup name="toast" tag="ul" class="toasts__list">
          <li v-for="toast in toasts" :key="toast.id" class="toasts__item">
            <div class="toasts__item-close"></div>
            <div class="toasts__item-content">
              <Icon
                :name="iconName[toast.status]"
                :class="`toasts__item-icon ${iconClasses[toast.status]}`"
              />
              <p class="toasts__item-text">{{ toast.text }}</p>
            </div>
            <button
              type="button"
              class="toasts__item-close"
              @click="toastStore.close(toast.id)"
            >
              <Icon name="iconoir:xmark" />
            </button>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.toast-enter-from,
.toast-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.5s ease all;
}

.toasts {
  position: fixed;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  z-index: $toast-z-index;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__item {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: spacing(2);
    gap: spacing(4);
    box-shadow: 0px 1px 8px 0px #00000073;
    width: 90vw;
    margin: 0px spacing(4);
    padding: spacing(5) spacing(3);

    @include min-custom(650px) {
      width: 600px;
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: spacing(4);
      flex: 1;
    }

    &-icon {
      font-size: to-rem(24);

      @include min-md {
        font-size: to-rem(30);
      }

      &--error {
        color: $error-color;
      }
      &--warning {
        color: $warning-color;
      }
      &--success {
        color: $primary-color;
      }
    }

    &-text {
      font-size: to-rem(16);
      font-weight: 700;
      flex: 1;

      @include min-md {
        font-size: to-rem(20);
      }
    }

    &-close {
      width: 30px;
      height: 30px;
      font-size: 30px;
    }
  }
}
</style>
