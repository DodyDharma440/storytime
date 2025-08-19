<script setup lang="ts">
import SearchIcon from "~/assets/icons/SearchIcon.vue";
import UiInput from "~/components/ui/Input.vue";
import { allCategories, sortByOptions } from "~/constants/stories";

import DropdownFilter from "./DropdownFilter.vue";

const storiesFilter = useStoriesFilterStore();

const searchValue = ref("");

storiesFilter.$subscribe((mutate, state) => {
  searchValue.value = state.search;
});

const handleSearch = () => {
  storiesFilter.setValue({
    search: searchValue.value,
  });
};
</script>

<template>
  <div class="stories-filter">
    <div class="stories-filter__dropdown-group">
      <DropdownFilter
        v-model="storiesFilter.sortBy"
        :items="sortByOptions"
        label="Sort by"
      />
      <DropdownFilter
        v-model="storiesFilter.category"
        :items="allCategories"
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
        @keyup.enter="handleSearch"
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
