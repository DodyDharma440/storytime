<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";
import UiInput from "~/components/ui/Input.vue";
import UiSelect from "~/components/ui/Select.vue";
import UiTiptapEditor from "~/components/ui/TiptapEditor.vue";
import { allCategories } from "~/constants/stories";
import type { IStory } from "~/interfaces/story";

const categoryOptions = allCategories.map((c) => ({ label: c, value: c }));

interface StoryFormProps {
  editData?: IStory;
}

defineProps<StoryFormProps>();
const select = ref("All");
const editor = ref("");
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
  }

  &__action {
    display: flex;
    align-items: center;
    gap: spacing(10);
  }
}
</style>
