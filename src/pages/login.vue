<script setup lang="ts">
import AuthWelcome from "~/components/layout/auth/Welcome.vue";
import AuthLoginForm from "~/components/section/auth/LoginForm.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});
</script>

<template>
  <div class="auth-container">
    <div class="content-grid">
      <AuthLoginForm />
    </div>
    <div class="content-grid">
      <AuthWelcome
        title="Welcome Back to Story Time!"
        description="Dive back into captivating stories, follow your favorite authors, and continue sharing your own tales."
        image="/images/auth/login.png"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-grid {
  @include col-span(12);
  height: 100%;

  @include min-xl {
    @include col-span(6);
  }
}
</style>
