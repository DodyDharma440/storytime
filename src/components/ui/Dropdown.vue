<script setup lang="ts">
import type { StyleValue } from "vue";

interface DropdownProps {
  label?: string;
  buttonRef?: HTMLElement | null;
}

interface SlotProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onOpen: () => void;
}

interface DropdownSlots {
  default?(a: SlotProps): any;
  button?(p: SlotProps): any;
}

const props = defineProps<DropdownProps>();
const slots = defineSlots<DropdownSlots>();

const isOpen = ref(false);

const handleToggle = () => {
  isOpen.value = !isOpen.value;
};

const handleOpen = () => {
  isOpen.value = true;
};

const handleClose = () => {
  isOpen.value = false;
};

const menuRef = useTemplateRef("dropdown-menu");
const defaultButtonRef = useTemplateRef("button-ref");
const menuContentRef = useTemplateRef("dropdown-content");

useClickOutside(menuRef, () => {
  isOpen.value = false;
});

const dropdownPosition: Ref<StyleValue> = ref({});

watch(isOpen, async (value) => {
  if (value) {
    const _buttonRef = props.buttonRef || defaultButtonRef.value;
    if (!_buttonRef) return;

    await nextTick();

    const rect = _buttonRef.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const menuWidth = menuContentRef.value!.offsetWidth;

    // jika dropdown bakal melewati kanan
    if (rect.left + menuWidth > screenWidth) {
      dropdownPosition.value = { right: "0px" };
    } else {
      dropdownPosition.value = { left: "0px" };
    }
  }
});
</script>

<template>
  <div ref="dropdown-menu" class="dropdown">
    <slot
      name="button"
      :is-open="isOpen"
      :on-close="handleClose"
      :on-open="handleOpen"
      :on-toggle="handleToggle"
    />
    <button
      v-if="!slots.button"
      ref="button-ref"
      class="dropdown__button"
      @click="handleToggle"
    >
      <span>{{ label }}</span>
      <Icon name="mdi:chevron-down" size="32" />
    </button>
    <Transition name="fade">
      <div
        v-if="isOpen"
        ref="dropdown-content"
        class="dropdown__content"
        :style="dropdownPosition"
      >
        <slot
          :is-open="isOpen"
          :on-close="handleClose"
          :on-open="handleOpen"
          :on-toggle="handleToggle"
        />
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
