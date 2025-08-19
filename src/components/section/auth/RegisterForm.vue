<script setup lang="ts">
import * as yup from "yup";

import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiInput from "~/components/ui/Input.vue";
import type { IRegisterForm } from "~/interfaces/auth";

import AuthFormSubmitter from "./FormSubmitter.vue";

const schema = yup.object({
  name: yup.string().required("Name should not be empty"),
  email: yup
    .string()
    .required("Email should not be empty")
    .email("Email must be a valid email"),
  password: yup
    .string()
    .required("Password should not be empty")
    .min(8, "Password in minimum 8 characters")
    .matches(
      /[a-z]/,
      "Password must include at least one lowercase letter (a-z)"
    )
    .matches(/[0-9]/, "Password must include at least one number (0-9)")
    .matches(/^[^\s]+$/, "Password must not contain spaces"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password must match to password"),
});

const { handleSubmit, defineField, errors } = useForm<IRegisterForm>({
  validationSchema: schema,
});

const submitHandler = handleSubmit(() => {});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");
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
            :error="errors.confirmPassword"
            autocomplete="new-password"
          />
        </div>
        <AuthFormSubmitter form-type="register" />
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
