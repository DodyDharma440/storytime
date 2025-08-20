<script setup lang="ts">
import type { InputHTMLAttributes, InputTypeHTMLAttribute } from "vue";

export interface BaseInputProps {
  classNames?: Partial<Record<"wrapper" | "leftIcon" | "rightIcon", string>>;
  label?: string;
  srOnlyLabel?: boolean;
  id?: string;
  error?: string;
}

interface InputProps
  extends /* @vue-ignore */ InputHTMLAttributes,
    BaseInputProps {
  type?: InputTypeHTMLAttribute | "textarea";
}

export type InputSlots = {
  leftIcon?(): any;
  rightIcon?(): any;
  field?(props: { className: any }): any;
};

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<any>();
const props = defineProps<InputProps>();
const slots = defineSlots<InputSlots>();

const showPw = ref(false);
const togglePassword = () => {
  showPw.value = !showPw.value;
};

const inputType = computed(() => {
  if (props.type === "password") {
    return showPw.value ? "text" : "password";
  }
  return props.type;
});

const inputClass = computed(() => {
  return [
    "input__field",
    {
      "input__field--with-left-icon": slots.leftIcon,
      "input__field--with-right-icon": slots.rightIcon,
      "input__field-is-error": !!props.error,
      "input__field-textarea": inputType.value === "textarea",
    },
  ];
});
</script>

<template>
  <div class="input-wrapper">
    <label
      v-if="label"
      :for="id"
      :class="{ 'sr-only': srOnlyLabel }"
      class="input__label"
    >
      {{ label }}
    </label>
    <div class="input" :class="classNames?.wrapper">
      <div
        v-if="slots.leftIcon"
        class="input__left-icon"
        :class="classNames?.leftIcon"
      >
        <slot name="leftIcon" />
      </div>

      <template v-if="slots.field">
        <slot name="field" :class-name="inputClass" />
      </template>

      <template v-else>
        <textarea
          v-if="inputType === 'textarea'"
          :id="id"
          v-bind="$attrs"
          v-model="model"
          :class="inputClass"
          :type="inputType"
        />
        <input
          v-else
          :id="id"
          v-bind="$attrs"
          v-model="model"
          :class="inputClass"
          :type="inputType"
        />
      </template>

      <div
        v-if="slots.rightIcon || type === 'password'"
        class="input__right-icon"
        :class="classNames?.rightIcon"
      >
        <button
          v-if="type === 'password'"
          type="button"
          class="input__right-icon-button-pw"
          @click="togglePassword"
        >
          <Icon
            v-if="type === 'password'"
            :name="showPw ? 'iconoir:eye-off' : 'iconoir:eye-empty'"
            size="30"
          />
        </button>
        <slot v-else name="rightIcon" />
      </div>
    </div>
    <div v-if="error" class="input-error">
      <Icon name="iconoir:warning-circle" size="18" />
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@mixin icon-style {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b4b4b;

  @include min-lg {
    width: 30px;
    height: 30px;
  }
}

.input-wrapper {
  width: 100%;
}

.input {
  position: relative;

  &__label {
    display: block;
    margin-bottom: spacing(5);
  }

  &__field {
    padding-top: spacing(5);
    padding-bottom: spacing(5);
    padding-right: spacing(5.5);
    padding-left: spacing(5.5);
    border-radius: spacing(2);
    border: 2px solid #cccccc;
    width: 100%;
    font-size: to-rem(16);
    transition: all 0.3s;
    outline: 2px solid transparent;

    &:focus {
      border-color: $primary-color;
      outline-color: $primary-color;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #eeeeee;
    }

    @include min-lg {
      padding-top: spacing(6);
      padding-bottom: spacing(6);
      padding-right: spacing(7.5);
      padding-left: spacing(7.5);
      font-size: to-rem(18);
    }

    &-is-error {
      border-color: $error-color;

      &:focus {
        border-color: $error-color;
        outline-color: $error-color;
      }
    }

    &-textarea {
      min-height: 120px;
    }

    &--with-right-icon {
      padding-right: spacing(16);

      @include min-lg {
        padding-right: spacing(20);
      }
    }

    &--with-left-icon {
      padding-left: spacing(16);

      @include min-lg {
        padding-left: spacing(20);
      }
    }
  }

  &__right-icon {
    right: spacing(5.5);
    @include icon-style();

    @include min-lg {
      right: spacing(7.5);
    }

    &-button-pw {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__left-icon {
    left: spacing(5.5);
    @include icon-style();

    @include min-lg {
      left: spacing(7.5);
    }
  }
}

.input-error {
  display: flex;
  align-items: center;
  gap: spacing(3);
  color: $error-color;
  margin-top: spacing(1);
}
</style>
