<script setup lang="ts">
import AuthWelcome from "~/components/layout/auth/Welcome.vue";
import AuthRegisterForm from "~/components/section/auth/RegisterForm.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

useSeoMeta({
  title: "Storytime - Register",
});
</script>

<template>
  <div class="auth-container">
    <div class="content-grid">
      <AuthWelcome
        title="Join the World’s Most-Loved Social Storytelling Platform!"
        description="Create an account to explore interesting articles, connect with like-minded people, and share your own stories. "
        image="/images/auth/register.png"
        with-logo
      />
    </div>
    <div class="content-grid">
      <AuthRegisterForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-grid {
  @include col-span(12);

  @include min-xl {
    @include col-span(6);
  }
}
</style>
