<script setup lang="ts">
import UiDropdown from "~/components/ui/Dropdown.vue";

interface DropdownFilterProps {
  items: string[];
  label: string;
}
defineProps<DropdownFilterProps>();
const model = defineModel<string>();

const handleChange = (value: string) => {
  model.value = value;
};
</script>

<template>
  <div class="dropdown-filter">
    <p class="dropdown-filter__label">{{ label }}</p>
    <UiDropdown v-slot="slotProps" :label="model ?? ''">
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="dropdown-filter__item"
          :class="{
            'dropdown-filter__item--active': item === model,
          }"
          @click="
            () => {
              slotProps.onClose();
              handleChange(item);
            }
          "
        >
          {{ item }}
        </li>
      </ul>
    </UiDropdown>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-filter {
  display: flex;
  align-items: center;

  &__label {
    font-size: to-rem(20);
    @include min-lg {
      font-size: to-rem(24);
    }
  }

  &__item {
    padding: spacing(3) spacing(4);
    font-size: to-rem(20);
    font-weight: 500;
    border-left: 3px solid transparent;
    transition: all 0.3s;
    cursor: pointer;
    min-width: 225px;

    &:hover {
      color: $primary-color;
    }

    &--active {
      border-left-color: $primary-color;
    }
  }
}
</style>
