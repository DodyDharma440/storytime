<script setup lang="ts">
import AuthWelcome from "~/components/layout/auth/Welcome.vue";

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div class="content-grid">
    <AuthWelcome
      title="Join the World’s Most-Loved Social Storytelling Platform!"
      description="Create an account to explore interesting articles, connect with like-minded people, and share your own stories. "
      image="/images/auth/register.png"
      with-logo
    />
  </div>
  <div class="content-grid">Register</div>
</template>

<style lang="scss" scoped>
.content-grid {
  @include col-span(6);
}
</style>
