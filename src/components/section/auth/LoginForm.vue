<script setup lang="ts">
import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiInput from "~/components/ui/Input.vue";
import { useLogin } from "~/composables/modules/auth";
import type { ILoginForm } from "~/interfaces/auth";
import { loginSchema } from "~/schemas/auth";

import AuthFormSubmitter from "./FormSubmitter.vue";

const { handleSubmit, defineField, errors } = useForm<ILoginForm>({
  validationSchema: loginSchema,
});

const { isLoading, mutate } = useLogin();

const submitHandler = handleSubmit((values) => {
  mutate(values);
});

const [email, emailAttrs] = defineField("username_or_email");
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
              :error="errors.username_or_email"
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
          <AuthFormSubmitter form-type="login" :is-loading="isLoading" />
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
