<script setup lang="ts">
import DefaultHeader from "~/components/layout/default/Header.vue";
import DefaultFooter from "~/components/layout/default/Footer.vue";
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
