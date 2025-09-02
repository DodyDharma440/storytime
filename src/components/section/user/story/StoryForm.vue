<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";
import UiInput from "~/components/ui/Input.vue";
import UiSelect from "~/components/ui/Select.vue";
import UiTiptapEditor from "~/components/ui/TiptapEditor.vue";
import type { IStory, IStoryForm } from "~/interfaces/story";
import { storySchema } from "~/schemas/story";

interface StoryFormProps {
  editData?: IStory;
}

const props = defineProps<StoryFormProps>();

const { $api } = useNuxtApp();

const categoriesStore = useCategoriesStore();
if (!categoriesStore.categories.length) {
  const { data } = await useAsyncData("categories", () =>
    $api.story.getCategories()
  );
  categoriesStore.setCategories(data.value?.data ?? []);
}

const { handleSubmit, defineField, errors, values, setFieldValue } =
  useForm<IStoryForm>({
    validationSchema: storySchema,
    initialValues: props.editData
      ? {
          category_id: `${props.editData.category.id}`,
          content: props.editData.content,
          title: props.editData.title,
          content_image_url: props.editData.content_image,
        }
      : undefined,
  });

const { mutate: createStory, isLoading: isLoadingCreate } = useMutation({
  mutationFn: (data: FormData) => $api.story.createStory(data),
  successMessage: "Story successfully created",
  onSuccess: () => navigateTo({ name: "dashboard" }),
});

const { mutate: updateStory, isLoading: isLoadingUpdate } = useMutation({
  mutationFn: ({ data, id }: { data: FormData; id: string }) =>
    $api.story.updateStory(data, id),
  successMessage: "Story successfully updated",
  onSuccess: () => navigateTo({ name: "dashboard" }),
});

const categoryOptions = computed(() => {
  return categoriesStore.categories.map((category) => ({
    label: category.name,
    value: `${category.id}`,
  }));
});

const submitHandler = handleSubmit((values) => {
  const formData = new FormData();

  const { title, category_id, content_image, content } = values;
  delete values.content_image_url;

  formData.append("title", title);
  formData.append("category_id", category_id);
  if (content_image) {
    formData.append("content_image", content_image);
  }
  formData.append("content", content);

  if (props.editData) {
    updateStory({ data: formData, id: props.editData.id });
  } else {
    createStory(formData);
  }
});

const [title, titleAttrs] = defineField("title");
const [content, contentAttrs] = defineField("content");
const [categoryId, categoryIdAttrs] = defineField("category_id");
const [contentImage, contentImageAttrs] = defineField("content_image");

const handleClearImage = () => {
  contentImage.value = null;
  setFieldValue("content_image_url", props.editData?.content_image);
};

const handleChangeFile = (e: Event) => {
  contentImage.value = (e.target as HTMLInputElement)?.files?.[0] ?? null;
  setFieldValue("content_image_url", undefined);
};

const previewUrl = computed(() =>
  contentImage.value
    ? URL.createObjectURL(contentImage.value)
    : values.content_image_url ?? null
);
</script>

<template>
  <div class="container story-form">
    <div class="story-form__header">
      <NuxtLink :to="{ name: 'dashboard' }" class="story-form__header-back">
        <Icon name="formkit:arrowleft" />
      </NuxtLink>
      <h1 class="story-form__header-title">
        {{ editData ? "Edit" : "Write" }} Story
      </h1>
    </div>

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
        />
        <UiInput label="Cover Image" :error="errors.content_image">
          <template #field="slotProps">
            <div class="story-form__fields-image-wrapper">
              <button
                v-if="contentImage"
                type="button"
                class="story-form__fields-image-input-clear-btn"
                @click="handleClearImage"
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
                  @change="handleChangeFile"
                />
              </label>
            </div>
          </template>
        </UiInput>
      </div>

      <div class="story-form__action">
        <UiButton
          type="button"
          variant="outline"
          :to="{ name: 'dashboard' }"
          :disabled="isLoadingUpdate || isLoadingCreate"
        >
          Cancel
        </UiButton>
        <UiButton
          type="submit"
          :is-loading="isLoadingUpdate || isLoadingCreate"
        >
          {{ editData ? "Update" : "Post" }} Story
        </UiButton>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.story-form {
  padding-top: 120px;
  padding-bottom: 120px;

  @include min-md {
    padding-top: 180px;
    padding-bottom: 180px;
  }

  @include min-lg {
    padding-top: 220px;
    padding-bottom: 220px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: spacing(8);

    @include min-lg {
      gap: spacing(14);
    }

    @include min-lg {
      gap: 84px;
    }

    &-back {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: to-rem(26);

      @include min-lg {
        font-size: to-rem(40);
      }
    }

    &-title {
      font-size: to-rem(38);

      @include min-lg {
        font-size: to-rem(44);
      }
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
