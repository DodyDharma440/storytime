<script setup lang="ts">
import VuePictureCropper, { cropper } from "vue-picture-cropper";

import UiButton from "~/components/ui/Button.vue";
import UiModal from "~/components/ui/Modal.vue";

interface ModalCropImageEmits {
  (e: "save", file: File | null): void;
}

const model = defineModel<File | null>({ default: null });
const emit = defineEmits<ModalCropImageEmits>();

const fileUrl = computed(() =>
  model.value ? URL.createObjectURL(model.value) : null
);

const handleSave = async () => {
  if (!cropper) return;

  const file = await cropper.getFile({
    fileName: model.value?.name,
  });

  emit("save", file);
  model.value = null;
};
</script>

<template>
  <UiModal :is-open="!!model" with-close-button @close="model = null">
    <div class="image-preview">
      <VuePictureCropper
        class="image-preview__image"
        :img="fileUrl ?? undefined"
        :options="{
          viewMode: 1,
          dragMode: 'crop',
          aspectRatio: 1 / 1,
        }"
      />
      <div class="image-preview__actions">
        <UiButton variant="outline" type="button" @click="model = null">
          Cancel
        </UiButton>
        <UiButton type="button" @click="handleSave"> Save </UiButton>
      </div>
    </div>
  </UiModal>
</template>

<style lang="scss" scoped>
.image-preview {
  width: 400px;

  @include min-lg {
    width: 650px;
  }

  &__image {
    height: 100%;
    width: 100%;
    object-fit: contain;
    max-height: 550px;
    border: 1px solid #cccccc;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: spacing(5);
    padding: spacing(6) 0px;
  }
}
</style>
