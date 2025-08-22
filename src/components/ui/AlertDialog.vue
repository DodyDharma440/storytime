<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";
import UiModal from "~/components/ui/Modal.vue";

interface AlertDialogProps {
  isOpen: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  title: string;
  description: string;
}

interface AlertDialogEmits {
  (e: "close" | "confirm"): void;
}

withDefaults(defineProps<AlertDialogProps>(), {
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
});
const emit = defineEmits<AlertDialogEmits>();
</script>

<template>
  <UiModal :is-open="isOpen" @close="emit('close')">
    <div class="alert-dialog">
      <h3 class="section-title">{{ title }}</h3>
      <p>{{ description }}</p>

      <div class="alert-dialog__actions">
        <UiButton variant="outline" @click="emit('close')">Cancel</UiButton>
        <UiButton @click="emit('confirm')">{{ confirmButtonText }}</UiButton>
      </div>
    </div>
  </UiModal>
</template>

<style lang="scss" scoped>
.alert-dialog {
  padding: spacing(6);
  display: flex;
  flex-direction: column;
  gap: spacing(5);
  align-items: center;
  justify-content: center;
  text-align: center;

  &__actions {
    display: flex;
    align-items: center;
    gap: spacing(8);
    margin-top: spacing(2.5);

    @include min-lg {
      gap: spacing(11);
    }
  }
}
</style>
