<script setup lang="ts">
import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiInput from "~/components/ui/Input.vue";
import type { IRegisterForm } from "~/interfaces/auth";
import { registerSchema } from "~/schemas/auth";

import AuthFormSubmitter from "./FormSubmitter.vue";

const { $api } = useNuxtApp();

const { handleSubmit, defineField, errors, setFieldError } =
  useForm<IRegisterForm>({
    validationSchema: registerSchema,
  });

const { isLoading, mutate } = useMutation({
  mutationFn: (data: IRegisterForm) => $api.auth.register(data),
  onError: (error) => {
    const errors = error.response?._data?.errors;
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        if (key !== "username") {
          setFieldError(key as keyof IRegisterForm, (value as string[])[0]);
        }
      });
    }
  },
  onSuccess: async (res) => {
    const token = res.token;
    await $api.auth.setToken({ token });
    alert("Register success!");
    navigateTo("/dashboard", { replace: true });
  },
});

const submitHandler = handleSubmit((values) => {
  mutate({
    ...values,
    username: values.email,
  });
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField(
  "password_confirmation"
);
</script>

<template>
  <div class="register-wrapper">
    <div class="register-wrapper__logo">
      <DefaultLogo />
    </div>

    <AuthFormWrapper title="Create Account" form-position="right">
      <form class="register" @submit="submitHandler">
        <div class="register__fields">
          <UiInput
            id="name"
            v-model="name"
            placeholder="Enter your name"
            label="Name"
            v-bind="nameAttrs"
            :error="errors.name"
          />
          <UiInput
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            label="Email"
            v-bind="emailAttrs"
            :error="errors.email"
            autocomplete="username"
          />
          <UiInput
            id="password"
            v-model="password"
            placeholder="Enter your chosen password"
            label="Password"
            type="password"
            v-bind="passwordAttrs"
            :error="errors.password"
            autocomplete="new-password"
          />
          <UiInput
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Re-enter your chosen password"
            label="Confirm Password"
            type="password"
            v-bind="confirmPasswordAttrs"
            :error="errors.password_confirmation"
            autocomplete="new-password"
          />
        </div>
        <AuthFormSubmitter form-type="register" :is-loading="isLoading" />
      </form>
    </AuthFormWrapper>
  </div>
</template>

<style lang="scss" scoped>
.register-wrapper {
  &__logo {
    margin-top: spacing(7.5);
    margin-left: 32px;
    justify-content: center;
    display: flex;

    @include min-xl {
      display: none;
    }
  }
}

.register {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: spacing(6);
    margin-bottom: 100px;

    @include min-lg {
      margin-bottom: 130px;
    }
  }
}
</style>
