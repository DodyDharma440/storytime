<script setup lang="ts">
import AuthFormWrapper from "~/components/layout/auth/FormWrapper.vue";
import UiInput from "~/components/ui/Input.vue";

import AuthFormSubmitter from "./FormSubmitter.vue";
</script>

<template>
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
</template>

<style lang="scss" scoped>
.register {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: spacing(6);
    margin-bottom: 130px;
  }
}
</style>
