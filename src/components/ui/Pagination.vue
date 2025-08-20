<script setup lang="ts">
interface PaginationProps {
  total: number;
  perPage: number;
}

const props = defineProps<PaginationProps>();
const model = defineModel<number>({ default: 1 });

const handleChangePage = (value: number) => {
  model.value = value;
};

const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage);
});

const canPrev = computed(() => model.value > 1);

const canNext = computed(() => model.value < totalPages.value);
const { total, perPage } = toRefs(props);

const paginationRange = usePagination({
  currentPage: model,
  totalCount: total,
  siblingCount: 1,
  pageSize: perPage,
});

const handleClickPage = (pageItem: string | number, index: number) => {
  if (pageItem === "...") {
    const isActiveRight =
      model.value > Number(paginationRange.value?.[index - 1]);
    const dotIndex = isActiveRight ? index + 1 : index - 1;
    let dotClickValue = Number(paginationRange.value?.[dotIndex] ?? "0");

    if (!isActiveRight) {
      dotClickValue += 1;
    } else {
      dotClickValue -= 1;
    }

    handleChangePage(Number(dotClickValue));
    return;
  }

  handleChangePage(Number(pageItem));
};
</script>

<template>
  <div class="pagination">
    <button
      v-if="canPrev"
      type="button"
      class="pagination__button"
      @click="
        () => {
          handleChangePage(Number(model - 1));
        }
      "
    >
      Prev
    </button>
    <button
      v-for="(pageItem, index) in paginationRange"
      :key="index"
      type="button"
      class="pagination__button"
      :class="{ 'pagination__button--active': Number(pageItem) === model }"
      @click="() => handleClickPage(pageItem, index)"
    >
      {{ pageItem }}
    </button>
    <button
      v-if="canNext"
      type="button"
      class="pagination__button"
      @click="
        () => {
          handleChangePage(Number(model + 1));
        }
      "
    >
      Next
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: spacing(3);
  flex-wrap: wrap;

  @include min-md {
    flex-wrap: nowrap;
    gap: spacing(5);
  }

  &__button {
    font-size: to-rem(20);
    font-weight: 700;
    padding: spacing(3) spacing(6.5);
    border-radius: spacing(2);
    background-color: $primary-color-light;
    transition: all 0.3s;

    @include min-md {
      font-size: to-rem(24);
      padding: spacing(4) spacing(7.5);
    }

    @include min-xl {
      font-size: to-rem(28);
    }

    &--active {
      background-color: $primary-color;
      color: #fff;
    }
  }
}
</style>
