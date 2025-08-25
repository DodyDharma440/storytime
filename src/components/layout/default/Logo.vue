<template>
  <NuxtLink :to="{ path: '/' }">
    <NuxtImg src="/images/logo.png" alt="Storytime Logo" class="logo" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  width: 180px;
  height: 100%;

  @include min-lg {
    width: 254px;
  }
}
</style>
