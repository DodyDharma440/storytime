<script setup lang="ts">
interface DropdownProps {
  label: string;
}

interface DropdownSlots {
  default?(a: { isOpen: boolean; onClose: () => void }): any;
}

defineProps<DropdownProps>();
defineSlots<DropdownSlots>();

const isOpen = ref(false);

const handleToggle = () => {
  isOpen.value = !isOpen.value;
};

const menuRef = useTemplateRef("dropdown-menu");

useClickOutside(menuRef, () => {
  isOpen.value = false;
});
</script>

<template>
  <div ref="dropdown-menu" class="dropdown">
    <button class="dropdown__button" @click="handleToggle">
      <span>{{ label }}</span>
      <Icon name="mdi:chevron-down" size="32" />
    </button>
    <Transition name="fade">
      <div v-if="isOpen" class="dropdown__content">
        <slot :is-open="isOpen" :on-close="handleToggle" />
      </div>
    </Transition>
  </div>
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

.dropdown {
  position: relative;

  &__button {
    display: flex;
    align-items: center;
    gap: spacing(3.5);
    font-size: to-rem(20);
    padding: spacing(5);
    transition: all 0.3s;
    font-weight: 500;

    &:hover {
      color: $primary-color;
    }

    @include min-lg {
      font-size: to-rem(24);
      padding: spacing(7.5);
    }
  }

  &__content {
    position: absolute;
    top: 100%;
    border-radius: spacing(1);
    box-shadow: 0 0 5px 1px #00000021;
    min-width: 100%;
    z-index: $dropdown-z-index;
    background-color: #fff;
  }
}
</style>
