<script setup lang="ts">
import UiModal from "~/components/ui/Modal.vue";
const isOpen = defineModel<boolean>();
</script>

<template>
  <UiModal v-model="isOpen"> Edit profile </UiModal>
</template>
