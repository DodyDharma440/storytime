<script setup lang="ts">
import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import DefaultLogo from "~/components/layout/default/Logo.vue";
import UiInput from "~/components/ui/Input.vue";

import AuthFormSubmitter from "./FormSubmitter.vue";
</script>

<template>
  <div class="register-wrapper">
    <div class="register-wrapper__logo">
      <DefaultLogo />
    </div>

    <AuthFormWrapper title="Create Account" form-position="right">
      <div class="register">
        <div class="register__fields">
          <UiInput id="name" placeholder="Enter your name" label="Name" />
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
          <UiInput
            id="confirm-password"
            placeholder="Re-enter your chosen password"
            label="Confirm Password"
            type="password"
          />
        </div>
        <AuthFormSubmitter form-type="register" />
      </div>
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
