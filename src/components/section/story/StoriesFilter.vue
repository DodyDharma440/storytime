<script setup lang="ts">
import SearchIcon from "~/assets/icons/SearchIcon.vue";
import UiInput from "~/components/ui/Input.vue";
import { sortByOptions } from "~/constants/stories";

import DropdownFilter from "./DropdownFilter.vue";

const route = useRoute();
const categoriesStore = useCategoriesStore();

const storiesFilter = useStoriesFilterStore();
const searchValue: Ref<string> = ref((route.query.search as string) ?? "");

const categoriesOptions = computed(() => {
  const options = categoriesStore.categories.map((category) => ({
    label: category.name,
    value: category.slug,
  }));

  return [{ label: "All", value: "All" }, ...options];
});

watch(searchValue, (newValue) => {
  debounce(() => {
    storiesFilter.setValue({
      search: newValue.trim(),
      page: 1,
    });
  }, 500);
});
</script>

<template>
  <div class="stories-filter">
    <div class="stories-filter__dropdown-group">
      <DropdownFilter
        filter-key="sortBy"
        :items="sortByOptions"
        label="Sort by"
      />
      <DropdownFilter
        filter-key="category"
        :items="categoriesOptions"
        label="Category"
      />
    </div>
    <div class="stories-filter__search">
      <UiInput
        id="search-input"
        v-model="searchValue"
        type="search"
        placeholder="Search story"
        label="Search story"
        sr-only-label
      >
        <template #rightIcon>
          <SearchIcon />
        </template>
      </UiInput>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stories-filter {
  margin-bottom: spacing(15);
  display: flex;
  flex-direction: column;
  gap: spacing(8);

  @include min-lg {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__dropdown-group {
    display: flex;
    flex-direction: column;
    gap: spacing(0);

    @include min-lg {
      flex-direction: row;
      align-items: center;
      gap: spacing(7.5);
    }
  }

  &__search {
    width: 100%;

    @include min-lg {
      max-width: 547px;
    }

    :deep(.input__field) {
      font-size: to-rem(20);

      @include min-lg {
        font-size: to-rem(24);
      }
    }
  }
}
</style>
