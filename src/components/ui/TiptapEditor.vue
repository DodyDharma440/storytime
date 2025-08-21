<script setup lang="ts">
import type { Level } from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extensions";

import type { BaseInputProps } from "./Input.vue";
import UiInput from "./Input.vue";

const textStyleOptions = [
  {
    label: "Normal",
    value: "paragraph",
  },
  {
    label: "Heading 1",
    value: "heading_1",
  },
  {
    label: "Heading 2",
    value: "heading_2",
  },
  {
    label: "Heading 3",
    value: "heading_3",
  },
  {
    label: "Heading 4",
    value: "heading_4",
  },
  {
    label: "Heading 5",
    value: "heading_5",
  },
  {
    label: "Heading 6",
    value: "heading_6",
  },
];

interface TiptapEditorProps extends Omit<BaseInputProps, "classNames" | "id"> {
  placeholder?: string;
}

const model = defineModel<string>({ default: "" });
const emit = defineEmits<{ (e: "empty"): void }>();
const props = defineProps<TiptapEditorProps>();
const textStyle = ref(textStyleOptions[0].value);

const editor = useEditor({
  content: model.value,
  extensions: [
    TiptapStarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Underline,
    Subscript,
    Superscript,
    Link.configure({
      openOnClick: false,
      autolink: false,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`);

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false;
          }

          // disallowed protocols
          const disallowedProtocols = ["ftp", "file", "mailto"];
          const protocol = parsedUrl.protocol.replace(":", "");

          if (disallowedProtocols.includes(protocol)) {
            return false;
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map((p) =>
            typeof p === "string" ? p : p.scheme
          );

          if (!allowedProtocols.includes(protocol)) {
            return false;
          }

          // disallowed domains
          const disallowedDomains = [
            "example-phishing.com",
            "malicious-site.net",
          ];
          const domain = parsedUrl.hostname;

          if (disallowedDomains.includes(domain)) {
            return false;
          }

          // all checks have passed
          return true;
        } catch {
          return false;
        }
      },
    }),
  ],
  onUpdate: (value) => {
    model.value = value.editor.getHTML();
  },
  onBlur: (value) => {
    if (value.editor.isEmpty) {
      emit("empty");
    }
  },
  onSelectionUpdate: ({ editor }) => {
    if (editor.isActive("paragraph")) textStyle.value = "paragraph";

    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) {
        textStyle.value = `heading_${i}`;
        return;
      }
    }

    textStyle.value = "paragraph";
  },
  editorProps: {
    attributes: {
      class: `input__field`,
    },
  },
});

const handleSelectLink = () => {
  if (editor.value) {
    const { state, view } = editor.value;
    const selectedText = state.doc.textBetween(
      view.state.selection.from,
      view.state.selection.to
    );

    if (!selectedText.startsWith("https")) return;

    editor.value
      .chain()
      .focus()
      .toggleLink({
        href: selectedText || "https://",
      })
      .run();
  }
};

const handleErrorStyles = (isError: boolean) => {
  editor.value?.setOptions({
    editorProps: {
      attributes: {
        class: `input__field ${isError ? "input__field-is-error" : ""}`,
      },
    },
  });
};

onMounted(() => {
  if (props.error) handleErrorStyles(!!props.error);
});

watch(
  () => editor.value?.isEmpty,
  (value) => {
    if (value) emit("empty");
  }
);

watch(
  () => props.error,
  (value) => {
    handleErrorStyles(!!value);
  }
);

watch(textStyle, (value) => {
  if (value.includes("heading")) {
    const [_, level] = value.split("_");
    editor.value
      ?.chain()
      .focus()
      .setHeading({ level: Number(level) as Level })
      .run();
  } else {
    editor.value?.chain().focus().setParagraph().run();
  }
});

onBeforeUnmount(() => {
  unref(editor)?.destroy();
});
</script>

<template>
  <div class="editor">
    <UiInput :label="label" :sr-only-label="srOnlyLabel" :error="error">
      <template #field>
        <div v-if="editor" class="editor__tools">
          <div class="editor__tools-group">
            <div class="editor__tools-select-wrapper">
              <select v-model="textStyle" class="editor__tools-select">
                <option
                  v-for="option in textStyleOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <Icon
                name="iconoir:arrow-separate-vertical"
                class="editor__tools-select-icon"
              />
            </div>
          </div>

          <div class="editor__tools-group">
            <button
              type="button"
              :disabled="!editor.can().chain().focus().toggleBold().run()"
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('bold'),
              }"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <Icon name="iconoir:bold" />
            </button>
            <button
              type="button"
              :disabled="!editor.can().chain().focus().toggleItalic().run()"
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('italic'),
              }"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <Icon name="iconoir:italic" />
            </button>
            <button
              type="button"
              :disabled="!editor.can().chain().focus().toggleUnderline().run()"
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('underline'),
              }"
              @click="editor.chain().focus().toggleUnderline().run()"
            >
              <Icon name="iconoir:underline" />
            </button>
            <button
              type="button"
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('link'),
              }"
              @click="handleSelectLink"
            >
              <Icon name="iconoir:link" />
            </button>
          </div>

          <div class="editor__tools-group">
            <button
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('bulletList'),
              }"
              :disabled="!editor.can().chain().focus().toggleBulletList().run()"
              @click="editor.chain().focus().toggleBulletList().run()"
            >
              <Icon name="iconoir:list" />
            </button>
            <button
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('orderedList'),
              }"
              :disabled="
                !editor.can().chain().focus().toggleOrderedList().run()
              "
              @click="editor.chain().focus().toggleOrderedList().run()"
            >
              <Icon name="iconoir:numbered-list-left" />
            </button>
          </div>

          <div class="editor__tools-group">
            <button
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('subscript'),
              }"
              :disabled="!editor.can().chain().focus().toggleSubscript().run()"
              @click="editor.chain().focus().toggleSubscript().run()"
            >
              <Icon name="mdi:format-subscript" />
            </button>
            <button
              class="editor__tools-button"
              :class="{
                'editor__tools-button--active': editor.isActive('superscript'),
              }"
              :disabled="
                !editor.can().chain().focus().toggleSuperscript().run()
              "
              @click="editor.chain().focus().toggleSuperscript().run()"
            >
              <Icon name="mdi:format-superscript" />
            </button>
          </div>
        </div>

        <TiptapEditorContent :editor="editor" class="editor__content" />
      </template>
    </UiInput>
  </div>
</template>

<style lang="scss" scoped>
.editor {
  &__tools {
    display: flex;
    align-items: center;
    gap: spacing(4);
    position: absolute;
    top: 0;
    padding: spacing(3) spacing(6);
    z-index: 2;

    &-group {
      display: flex;
      align-items: center;
      gap: spacing(1);
    }

    &-select-wrapper {
      position: relative;
    }

    &-select {
      padding: spacing(2) spacing(10) spacing(2) spacing(2);
      &:focus {
        outline: none;
      }

      &-icon {
        position: absolute;
        right: spacing(3);
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &-button {
      font-size: to-rem(24);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: spacing(2);
      border-radius: spacing(2);

      &--active {
        background-color: #eeeeee;
      }
    }
  }

  &__content {
    :deep(.tiptap) {
      padding-top: calc(spacing(6) + 52px);

      * {
        all: revert;
      }

      .is-editor-empty:first-child:before {
        content: attr(data-placeholder);
        opacity: 0.8;
        float: left;
        height: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
