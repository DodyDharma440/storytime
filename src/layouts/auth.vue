<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1920px;
  padding-top: spacing(5);
  padding-bottom: spacing(5);
}

:deep(.auth-container) {
  display: grid;
  align-items: center;
  @include grid-col(12);
}
</style>
