<script setup lang="ts">
import UiAvatar from "~/components/ui/Avatar.vue";
import UiButton from "~/components/ui/Button.vue";
import UiInput from "~/components/ui/Input.vue";

const emit = defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <form class="profile-form">
    <div class="profile-form__fields">
      <div class="profile-form__fields-section">
        <div class="profile-form__fields-avatar">
          <UiAvatar src="" :size="200" />
          <UiButton is="label" variant="outline"> Change Picture </UiButton>
        </div>
        <UiInput label="Name" placeholder="Your name" autocomplete="off" />
        <UiInput label="Email" placeholder="Your email" disabled />
        <UiInput label="About me" placeholder="About..." type="textarea" />
      </div>
      <div class="profile-form__fields-section">
        <h3 class="section-title">Change Password</h3>
        <UiInput
          label="Old Password"
          type="password"
          placeholder="Enter your old password"
          autocomplete="new-password"
        />
        <UiInput
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          autocomplete="new-password"
        />
        <UiInput
          label="Confirm New Password"
          type="password"
          placeholder="Re-enter your new password"
          autocomplete="new-password"
        />
      </div>
    </div>
    <div class="profile-form__action">
      <UiButton variant="outline" type="button" @click="emit('close')">
        Cancel
      </UiButton>
      <UiButton>Update Profile</UiButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.profile-form {
  &__fields {
    padding-bottom: spacing(10);
    display: grid;
    @include grid-col(2);
    gap: spacing(7.5);

    &-section {
      @include col-span(2);
      display: flex;
      flex-direction: column;
      gap: spacing(7.5);
      min-width: 80dvw;

      @include min-sm {
        min-width: 500px;
      }

      @include min-xxl {
        @include col-span(1);
        min-width: 700px;
      }
    }

    &-avatar {
      display: flex;
      align-items: center;
      gap: spacing(7.5);
      flex-direction: column;

      @include min-lg {
        flex-direction: row;
      }
    }
  }

  &__action {
    display: flex;
    align-items: center;
    gap: spacing(6);

    @include min-lg {
      gap: spacing(11);
    }
  }
}
</style>
