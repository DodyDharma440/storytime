<script setup lang="ts">
import * as yup from "yup";

import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiInput from "~/components/ui/Input.vue";
import type { ILoginForm } from "~/interfaces/auth";

import AuthFormSubmitter from "./FormSubmitter.vue";

const schema = yup.object<ILoginForm>({
  email: yup
    .string()
    .required("Email should not be empty")
    .email("Email must be a valid email"),
  password: yup.string().required("Password should not be empty"),
});

const { $api } = useNuxtApp();

const { handleSubmit, defineField, errors } = useForm<ILoginForm>({
  validationSchema: schema,
});

const submitHandler = handleSubmit(async (values) => {
  try {
    const res = await $api.auth.login(values);
    // eslint-disable-next-line no-console
    console.log("🚀 ~ res:", res);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("🚀 ~ error:", error);
  }
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
</script>

<template>
  <div class="login-wrapper">
    <div class="login-wrapper__logo">
      <DefaultLogo />
    </div>
    <div class="login-wrapper__content">
      <AuthFormWrapper title="Login" form-position="left">
        <form class="login" @submit="submitHandler">
          <div class="login__fields">
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
            />
          </div>
          <AuthFormSubmitter form-type="login" />
        </form>
      </AuthFormWrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__logo {
    margin-top: spacing(7.5);
    margin-left: 32px;
    display: flex;
    justify-content: center;

    @include min-xl {
      margin-left: 62px;
      justify-content: flex-start;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-bottom: spacing(15);
  }
}

.login {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: spacing(6);
  }
}
</style>
