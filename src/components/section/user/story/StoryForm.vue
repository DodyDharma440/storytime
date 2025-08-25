<script setup lang="ts">
import * as yup from "yup";

import UiButton from "~/components/ui/Button.vue";
import UiInput from "~/components/ui/Input.vue";
import UiSelect from "~/components/ui/Select.vue";
import UiTiptapEditor from "~/components/ui/TiptapEditor.vue";
import { allCategories } from "~/constants/stories";
import type { IStory, IStoryForm } from "~/interfaces/story";

const categoryOptions = allCategories
  .slice(1)
  .map((c) => ({ label: c, value: c }));

const schema = yup.object<IStoryForm>({
  title: yup.string().required("Title should not be empty"),
  content: yup.string().required("Content should not be empty"),
  category_id: yup.string().required("Category should not be empty"),
  content_image: yup
    .mixed()
    .required("Thumbnail image is required")
    .test(
      "fileSize",
      "File size exceeds 2MB limit",
      (value: any) => value && value.size <= 2 * 1024 * 1024 // 5 MB
    )
    .test(
      "fileType",
      "Only JPEG and PNG images are allowed",
      (value: any) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});

interface StoryFormProps {
  editData?: IStory;
}

defineProps<StoryFormProps>();

const { handleSubmit, defineField, errors, setFieldTouched } =
  useForm<IStoryForm>({
    validationSchema: schema,
  });

const submitHandler = handleSubmit(() => {});

const [title, titleAttrs] = defineField("title");
const [content, contentAttrs] = defineField("content");
const [categoryId, categoryIdAttrs] = defineField("category_id");
const [contentImage, contentImageAttrs] = defineField("content_image");

const previewUrl = computed(() =>
  contentImage.value ? URL.createObjectURL(contentImage.value) : null
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

    {{ errors }}
    content: {{ content }}
    <form @submit="submitHandler">
      <div class="story-form__fields">
        <UiInput
          v-model="title"
          label="Title"
          v-bind="titleAttrs"
          placeholder="Enter a story title"
          :error="errors.title"
        />
        <UiSelect
          v-model="categoryId"
          v-bind="categoryIdAttrs"
          label="Category"
          placeholder="Select category"
          :options="categoryOptions"
          :error="errors.category_id"
        />
        <UiTiptapEditor
          v-model="content"
          v-bind="contentAttrs"
          placeholder="Enter a content here"
          label="Content"
          :error="errors.content"
          @empty="content = ''"
          @create="setFieldTouched('content', false)"
        />
        <UiInput label="Cover Image" :error="errors.content_image">
          <template #field="slotProps">
            <div class="story-form__fields-image-wrapper">
              <button
                v-if="contentImage"
                type="button"
                class="story-form__fields-image-input-clear-btn"
                @click="contentImage = null"
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
                  v-bind="contentImageAttrs"
                  @change="
                    (e) => {
                      contentImage = (e.target as HTMLInputElement)?.files?.[0] ?? null;
                    }
                  "
                />
              </label>
            </div>
          </template>
        </UiInput>
      </div>

      <div class="story-form__action">
        <UiButton type="button" variant="outline" href="/dashboard">
          Cancel
        </UiButton>
        <UiButton type="submit">
          {{ editData ? "Update" : "Post" }} Story
        </UiButton>
      </div>
    </form>
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
