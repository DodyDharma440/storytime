<script setup lang="ts">
import DefaultFooter from "~/components/layout/default/Footer.vue";
import DefaultHeader from "~/components/layout/default/Header.vue";
</script>

<template>
  <div>
    <DefaultHeader />
    <main>
      <slot />
    </main>
    <DefaultFooter />
  </div>
</template>
