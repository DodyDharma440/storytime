<script setup lang="ts">
import UiDropdown from "~/components/ui/Dropdown.vue";
import type { IStoryFilter } from "~/interfaces/story";

interface DropdownFilterProps {
  items: Record<"label" | "value", string>[];
  label: string;
  filterKey: keyof Pick<IStoryFilter, "category" | "sortBy">;
}

const store = useStoriesFilterStore();
const props = defineProps<DropdownFilterProps>();

const valueLabel = computed(() => {
  return (
    props.items.find((item) => item.value === store.filters[props.filterKey])
      ?.label ??
    store.filters[props.filterKey] ??
    ""
  );
});

const storiesFilter = useStoriesFilterStore();

const handleChange = (value: string) => {
  storiesFilter.setValue({
    [props.filterKey]: value,
    page: 1,
  });
};
</script>

<template>
  <div class="dropdown-filter">
    <p class="dropdown-filter__label">{{ label }}</p>
    <UiDropdown v-slot="slotProps" :label="valueLabel ?? ''">
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="dropdown-filter__item"
          :class="{
            'dropdown-filter__item--active':
              item.value === store.filters[filterKey],
          }"
          @click="
            () => {
              slotProps.onClose();
              handleChange(item.value);
            }
          "
        >
          {{ item.label }}
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
