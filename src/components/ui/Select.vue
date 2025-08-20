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
const highlightedIndex = ref(-1);

const handleHighlight = (type: "inc" | "dec") => {
  switch (type) {
    case "inc":
      if (highlightedIndex.value === filteredOptions.value.length - 1) {
        highlightedIndex.value = 0;
      } else {
        highlightedIndex.value++;
      }
      break;
    case "dec":
      if (highlightedIndex.value === 0) {
        highlightedIndex.value = filteredOptions.value.length - 1;
      } else {
        highlightedIndex.value--;
      }
      break;
  }
};

const handleEnter = () => {
  model.value = filteredOptions.value[highlightedIndex.value].value;
  isOpen.value = false;
  inputRef.value?.blur();
};

const filteredOptions = computed(() => {
  return props.options.filter((opt) => {
    const isValid = opt.label
      .toLowerCase()
      .includes(search.value.toLowerCase());
    return isSearched.value ? isValid : true;
  });
});

const menuRef = useTemplateRef("select-input");
const inputRef = useTemplateRef("input-field");

const dropdownPosStyle: Ref<Record<string, any>> = ref({});

const handleDropdownPosition = () => {
  if (!menuRef.value) return;

  const rect = menuRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  const dropdownHeight = 400;

  if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
    // Render di atas
    dropdownPosStyle.value = {
      bottom: rect.height + "px",
      maxHeight: spaceAbove + "px",
    };
  } else {
    // Render di bawah (default)
    dropdownPosStyle.value = {
      top: rect.height + "px",
      maxHeight: spaceBelow + "px",
    };
  }
};

const handleChange = (value: string) => {
  model.value = value;
  isOpen.value = false;
};

const handleChangeSearch = (e: Event) => {
  isSearched.value = true;
  search.value = (e.target as HTMLInputElement).value;
  highlightedIndex.value = -1;
};

watch(model, () => {
  search.value = selectedLabel.value ?? "";
  highlightedIndex.value = -1;
});

watch(highlightedIndex, (newIndex) => {
  nextTick(() => {
    const el = document.querySelector(
      `.select__dropdown-item[data-index="${newIndex}"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  });
});

watch(isOpen, (val) => {
  if (val) {
    nextTick(handleDropdownPosition);
  }
});

const handleClickOutside = () => {
  isOpen.value = false;
  search.value = model.value ?? "";
  isSearched.value = false;
  inputRef.value?.blur();
  highlightedIndex.value = -1;
};

window.addEventListener("resize", handleDropdownPosition);
window.addEventListener("scroll", handleDropdownPosition);

useClickOutside(menuRef, handleClickOutside);
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
          ref="input-field"
          :value="search"
          :class="slotProps.className"
          :placeholder="placeholder"
          @input="handleChangeSearch"
          @focus="isOpen = true"
          @keydown.arrow-down="handleHighlight('inc')"
          @keydown.arrow-up="handleHighlight('dec')"
          @keydown.enter="handleEnter"
          @keydown.esc="handleClickOutside"
        />
        <Transition name="select__dropdown-transition">
          <ul v-if="isOpen" class="select__dropdown" :style="dropdownPosStyle">
            <template v-if="filteredOptions.length">
              <li
                v-for="(option, index) in filteredOptions"
                :key="option.value"
                class="select__dropdown-item"
                :class="{
                  'select__dropdown-item--highlight':
                    index === highlightedIndex && option.value !== model,
                  'select__dropdown-item--active': option.value === model,
                }"
                :data-index="index"
                @click="handleChange(option.value)"
              >
                {{ option.label }}
              </li>
            </template>
            <div v-else class="select__dropdown-empty">No options</div>
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
    left: 0;
    right: 0;
    max-height: 400px;
    background-color: #fff;
    border-radius: spacing(2);
    margin-top: spacing(2);
    box-shadow: 0 0 5px 1px #00000021;
    overflow: auto;
    z-index: $dropdown-z-index;

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

      &--highlight {
        background-color: rgba($color: #000000, $alpha: 0.2);
      }
    }

    &-empty {
      padding: spacing(4);
      text-align: center;
    }
  }
}
</style>
