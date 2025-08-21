<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";
import UiInput from "~/components/ui/Input.vue";
import UiSelect from "~/components/ui/Select.vue";
import UiTiptapEditor from "~/components/ui/TiptapEditor.vue";
import { allCategories } from "~/constants/stories";
import type { IStory } from "~/interfaces/story";

const categoryOptions = allCategories
  .slice(1)
  .map((c) => ({ label: c, value: c }));

interface StoryFormProps {
  editData?: IStory;
}

defineProps<StoryFormProps>();
const select = ref("");
const editor = ref("");
const image: Ref<File | null> = ref(null);

const previewUrl = computed(() =>
  image.value ? URL.createObjectURL(image.value) : null
);
</script>

<template>
  <div class="container story-form">
    <div class="story-form__header">
      <NuxtLink href="/dashboard" class="story-form__header-back">
        <Icon name="formkit:arrowleft" size="40" />
      </NuxtLink>
      <h1 class="story-form__header-title">
        {{ editData ? "Edit Story" : "Write Story" }}
      </h1>
    </div>

    <div class="story-form__fields">
      <UiInput label="Title" placeholder="Enter a story title" />
      <UiSelect
        v-model="select"
        label="Category"
        placeholder="Select category"
        :options="categoryOptions"
      />
      <UiTiptapEditor
        v-model="editor"
        placeholder="Enter a content here"
        label="Content"
        @empty="editor = ''"
      />
      <UiInput label="Cover Image">
        <template #field="slotProps">
          <div class="story-form__fields-image-wrapper">
            <button
              v-if="image"
              type="button"
              class="story-form__fields-image-input-clear-btn"
              @click="image = null"
            >
              <Icon name="mdi:close" size="30" />
            </button>
            <label
              :class="[slotProps.className, 'story-form__fields-image-input']"
              tabindex="0"
            >
              <template v-if="previewUrl">
                <NuxtImg
                  :src="previewUrl"
                  class="story-form__fields-image-input-preview"
                />
              </template>
              <template v-else>
                <Icon name="ph:image-light" size="100" />
                <p>Choose image</p>
              </template>
              <input
                type="file"
                style="display: none"
                accept="image/png,image/jpeg,image/jpg"
                @change="
                  (e) => {
                    image = (e.target as HTMLInputElement)?.files?.[0] ?? null;
                  }
                "
              />
            </label>
          </div>
        </template>
      </UiInput>
    </div>

    <div class="story-form__action">
      <UiButton variant="outline" href="/dashboard">Cancel</UiButton>
      <UiButton>{{ editData ? "Update" : "Post" }} Story</UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.story-form {
  padding-top: 220px;
  padding-bottom: 220px;

  &__header {
    display: flex;
    align-items: center;
    gap: 84px;

    &-back {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-title {
      font-size: to-rem(44);
    }
  }

  &__fields {
    display: flex;
    gap: spacing(7.5);
    padding: spacing(15) 0px;
    flex-direction: column;

    &-image-wrapper {
      position: relative;
      width: fit-content;
      max-width: 500px;
      width: 100%;
      height: 400px;
    }

    &-image-input {
      position: relative;
      overflow: hidden;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      text-align: center;

      color: #4b4b4b;
      cursor: pointer;
      padding: 0;

      &-clear-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        background-color: $primary-color;
        border-radius: 50%;
        position: absolute;
        top: spacing(4.5);
        right: spacing(4.5);
        color: #fff;
        z-index: 2;
      }

      &-icon {
        width: 100px;
        height: 100px;
      }
      &-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__action {
    display: flex;
    align-items: center;
    gap: spacing(10);
  }
}
</style>
