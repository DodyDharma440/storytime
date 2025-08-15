<script setup lang="ts">
import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiInput from "~/components/ui/Input.vue";

import AuthFormSubmitter from "./FormSubmitter.vue";
</script>

<template>
  <div class="login-wrapper">
    <div class="login-wrapper__logo">
      <DefaultLogo />
    </div>
    <div class="login-wrapper__content">
      <AuthFormWrapper title="Login" form-position="left">
        <div class="login">
          <div class="login__fields">
            <UiInput
              id="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
            />
            <UiInput
              id="password"
              placeholder="Enter your chosen password"
              label="Password"
              type="password"
            />
          </div>
          <AuthFormSubmitter form-type="login" />
        </div>
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
