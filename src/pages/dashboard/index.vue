<script setup lang="ts">
import UserProfile from "~/components/section/user/profile/UserProfile.vue";
import UserStories from "~/components/section/user/story/UserStories.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="stories">
    <UserProfile />
    <UserStories />
  </div>
</template>

<style lang="scss" scoped>
.stories {
  padding-top: 70px;

  @include min-md {
    padding-top: 74px;
  }

  @include min-lg {
    padding-top: 105px;
  }
}
</style>
