<template>
  <NuxtLoadingIndicator color="#466543" :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
  transform: rotate(0deg);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(spacing(-4));
}
</style>
