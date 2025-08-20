<script setup lang="ts">
import type { SelectHTMLAttributes } from "vue";

import type { BaseInputProps, InputSlots } from "./Input.vue";
import UiInput from "./Input.vue";

interface SelectProps
  extends BaseInputProps,
    /* @vue-ignore */ SelectHTMLAttributes {
  options: Array<Record<"label" | "value", string>>;
  placeholder?: string;
  label?: string;
}

const model = defineModel<string>();
const props = defineProps<SelectProps>();
const slots = defineSlots<Omit<InputSlots, "rightIcon">>();

const selectedLabel = computed(() => {
  const selectedLabel = props.options.find(
    (opt) => opt.value === model.value
  )?.label;
  return selectedLabel;
});

const search = ref(selectedLabel.value ?? "");
const isSearched = ref(false);
const isOpen = ref(false);

const filteredOptions = computed(() => {
  return props.options.filter((opt) => {
    const isValid = opt.label
      .toLowerCase()
      .includes(search.value.toLowerCase());
    return isSearched.value ? isValid : true;
  });
});

const menuRef = useTemplateRef("select-input");

const handleChange = (value: string) => {
  model.value = value;
  isOpen.value = false;
};

const handleChangeSearch = (e: Event) => {
  isSearched.value = true;
  search.value = (e.target as HTMLInputElement).value;
};

watch(model, () => {
  search.value = selectedLabel.value ?? "";
});

useClickOutside(menuRef, () => {
  isOpen.value = false;
  search.value = model.value ?? "";
  isSearched.value = false;
});
</script>

<template>
  <UiInput :label="label" :sr-only-label="srOnlyLabel" :error="error">
    <template v-if="slots.leftIcon" #leftIcon>
      <slot name="leftIcon" />
    </template>
    <template #rightIcon>
      <Icon name="iconoir:nav-arrow-down" size="28" />
    </template>
    <template #field="slotProps">
      <div ref="select-input">
        <input
          v-bind="$attrs"
          :id="id"
          :value="search"
          :class="slotProps.className"
          :placeholder="placeholder"
          @input="handleChangeSearch"
          @focus="isOpen = true"
        />
        <Transition name="select__dropdown-transition">
          <ul v-if="isOpen" class="select__dropdown">
            <li
              v-for="option in filteredOptions"
              :key="option.value"
              class="select__dropdown-item"
              :class="{
                'select__dropdown-item--active': option.value === model,
              }"
              @click="handleChange(option.value)"
            >
              {{ option.label }}
            </li>
          </ul>
        </Transition>
      </div>
    </template>
  </UiInput>
</template>

<style lang="scss" scoped>
.select {
  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 400px;
    background-color: #fff;
    border-radius: spacing(2);
    margin-top: spacing(2);
    box-shadow: 0 0 5px 1px #00000021;
    overflow: auto;

    &-transition-enter-active,
    &-transition-leave-active {
      transition: opacity 0.3s ease;
    }

    &-transition-enter-from,
    &-transition-leave-to {
      opacity: 0;
    }

    &-item {
      padding: spacing(4);
      font-size: to-rem(20);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.1);
      }

      &--active {
        background-color: $primary-color;
        color: #fff;
        &:hover {
          background-color: rgba($color: $primary-color, $alpha: 0.9);
        }
      }
    }
  }
}
</style>
