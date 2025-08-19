<script setup lang="ts">
interface ModalProps {
  withCloseButton?: boolean;
}

defineProps<ModalProps>();
const isOpen = defineModel<boolean>({ default: false });

const handleClose = () => {
  isOpen.value = false;
};
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <Transition name="modal__overlay-transition">
        <div v-if="isOpen" class="modal__overlay" @click="handleClose"></div>
      </Transition>
      <Transition name="modal__body-transition">
        <div v-if="isOpen" class="modal__body">
          <div v-if="withCloseButton" class="modal__body-header">
            <div></div>
            <button class="modal__body-close-btn" @click="handleClose">
              <Icon name="mdi:close" size="40" />
            </button>
          </div>
          <div class="modal__body-content">
            <slot />
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  &__overlay {
    background-color: rgba(#000000, 0.25);
    position: fixed;
    inset: 0;
    z-index: $modal-overlay-z-index;

    &-transition {
      &-enter-active,
      &-leave-active {
        transition: all 200ms ease;
      }
      &-enter-from,
      &-leave-to {
        opacity: 0;
      }
    }
  }

  &__body {
    z-index: $modal-z-index;
    background: #fff;
    border-radius: spacing(2);
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;

    &-transition {
      &-enter-active,
      &-leave-active {
        transition: all 200ms ease;
      }
      &-enter-from,
      &-leave-to {
        opacity: 0;
        transform: translate(-50%, -40%);
      }
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: spacing(4) spacing(4) 0px spacing(4);
    }

    &-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $primary-color;
      color: #fff;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    &-content {
      max-height: 90dvh;
      overflow: auto;
      padding: spacing(4);
    }
  }
}
</style>
