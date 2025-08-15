<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";

type FormType = "login" | "register";

interface FormSubmitterProps {
  formType: FormType;
}

const buttonLabels: Record<FormType, string> = {
  login: "Login",
  register: "Create Account",
};
const navContents: Record<
  FormType,
  Record<"description" | "label" | "href", string>
> = {
  login: {
    description: "Don't have an account?",
    label: "Register",
    href: "/register",
  },
  register: {
    description: "Already have an account?",
    label: "Login",
    href: "/login",
  },
};

const props = defineProps<FormSubmitterProps>();

const buttonLabel = computed(() => buttonLabels[props.formType]);
const navContent = computed(() => navContents[props.formType]);
</script>

<template>
  <div class="form-submitter">
    <UiButton class="form-submitter__button" type="submit">
      {{ buttonLabel }}
    </UiButton>
    <div class="form-submitter__nav">
      <p>{{ navContent.description }}</p>
      <NuxtLink class="form-submitter__nav-link" :href="navContent.href">
        {{ navContent.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-submitter {
  margin-top: spacing(6);

  &__button {
    margin-bottom: spacing(10.5);
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: spacing(2.5);
    font-size: to-rem(18);

    &-link {
      font-weight: 700;
      color: $primary-color;
    }
  }
}
</style>
