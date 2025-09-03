<script setup lang="ts">
import UiAvatar from "~/components/ui/Avatar.vue";
import UiButton from "~/components/ui/Button.vue";
import UiInput from "~/components/ui/Input.vue";
import type { IUpdateProfileForm } from "~/interfaces/user";
import { editProfilSchema } from "~/schemas/user";

import ModalCropImage from "./ModalCropImage.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const { $api, $toast } = useNuxtApp();

const userStore = useUserAuthStore();
const { user } = storeToRefs(userStore);

const email = ref(user.value?.email);

const { handleSubmit, defineField, errors, setFieldError } =
  useForm<IUpdateProfileForm>({
    validationSchema: editProfilSchema,
    initialValues: {
      name: user.value?.name,
      about: user.value?.about ?? "",
      profile_picture_url: user.value?.profile_image ?? undefined,
    },
  });

const { mutate: mutateProfile, isLoading: isLoadingProfile } = useMutation({
  mutationFn: (data: IUpdateProfileForm) => $api.user.updateProfile(data),
  onError: (error) => {
    const errors = error.response?._data?.errors;
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        if (key !== "username") {
          setFieldError(
            key as keyof IUpdateProfileForm,
            (value as string[])[0]
          );
        }
      });
    }
  },
  onSuccess: () => {
    emit("close");
    userStore.getUser($api.user);
  },
  successMessage: "Your profile successfuly updated",
});

const { mutate: mutatePicture, isLoading: isLoadingPicture } = useMutation({
  mutationFn: (data: FormData) => $api.user.updateProfilePicture(data),
  successMessage: "Profile picture updated",
});

const submitHandler = handleSubmit((values) => {
  const {
    old_password,
    new_password,
    new_password_confirmation,
    profile_picture,
  } = values;

  delete values.temp_profile_picture;
  delete values.profile_picture_url;

  if (!old_password || !new_password || !new_password_confirmation) {
    delete values.new_password;
    delete values.old_password;
    delete values.new_password_confirmation;
  }

  if (profile_picture) {
    const formData = new FormData();
    formData.append("profile_image", profile_picture);
    mutatePicture(formData, {
      onSuccess: () => {
        delete values.profile_picture;
        mutateProfile(values);
      },
    });
  } else {
    delete values.profile_picture;
    mutateProfile(values);
  }
});

const [name, nameAttrs] = defineField("name");
const [about, aboutAttrs] = defineField("about");
const [oldPassword, oldPasswordAttrs] = defineField("old_password");
const [newPassword, newPasswordAttrs] = defineField("new_password");
const [confirmPassword, confirmPasswordAttrs] = defineField(
  "new_password_confirmation"
);

const [picture, pictureAttrs] = defineField("temp_profile_picture");

const [defaultPicture] = defineField("profile_picture_url");
const [croppedPicture] = defineField("profile_picture");
const croppedPictureUrl = computed(() =>
  croppedPicture.value
    ? URL.createObjectURL(croppedPicture.value)
    : defaultPicture.value ?? null
);
</script>

<template>
  <form class="profile-form" @submit="submitHandler">
    <div class="profile-form__fields">
      <div class="profile-form__fields-section">
        <div class="profile-form__fields-avatar">
          <div class="profile-form__fields-avatar-circle">
            <button type="button" @click="$toast.success({ text: 'Hello' })">
              TOAST
            </button>
            <UiAvatar :src="croppedPictureUrl" :size="200" />
            <button
              v-if="croppedPicture"
              class="profile-form__fields-avatar-button"
              type="button"
              @click="() => (croppedPicture = null)"
            >
              <Icon name="iconoir:trash" />
            </button>
          </div>

          <UiButton is="label" variant="outline">
            Change Picture
            <input
              type="file"
              style="display: none"
              v-bind="pictureAttrs"
              accept="image/png,image/jpeg,image/jpg"
              @change="
                (e) => {
                  picture = (e.target as HTMLInputElement)?.files?.[0] ?? null;
                }
              "
            />
          </UiButton>
        </div>
        <UiInput
          v-model="name"
          label="Name"
          placeholder="Your name"
          autocomplete="off"
          v-bind="nameAttrs"
          :error="errors.name"
        />
        <UiInput
          v-model="email"
          label="Email"
          placeholder="Your email"
          disabled
        />
        <UiInput
          v-model="about"
          label="About me"
          placeholder="About..."
          type="textarea"
          v-bind="aboutAttrs"
          :error="errors.about"
        />
      </div>
      <div class="profile-form__fields-section">
        <h3 class="section-title">Change Password</h3>
        <UiInput
          v-model="oldPassword"
          label="Old Password"
          type="password"
          placeholder="Enter your old password"
          autocomplete="new-password"
          v-bind="oldPasswordAttrs"
          :error="errors.old_password"
        />
        <UiInput
          v-model="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          autocomplete="new-password"
          v-bind="newPasswordAttrs"
          :error="errors.new_password"
        />
        <UiInput
          v-model="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Re-enter your new password"
          autocomplete="new-password"
          v-bind="confirmPasswordAttrs"
          :error="errors.new_password_confirmation"
        />
      </div>
    </div>
    <div class="profile-form__action">
      <UiButton
        variant="outline"
        type="button"
        :disabled="isLoadingPicture || isLoadingProfile"
        @click="emit('close')"
      >
        Cancel
      </UiButton>
      <UiButton
        type="submit"
        :is-loading="isLoadingPicture || isLoadingProfile"
      >
        Update Profile
      </UiButton>
    </div>

    <ModalCropImage
      v-model="picture"
      @save="(file) => (croppedPicture = file)"
    />
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

      &-circle {
        position: relative;
      }

      &-button {
        position: absolute;
        top: 0;
        right: 0;
        font-size: to-rem(20);
        background-color: $error-color;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 50%;
        padding: spacing(3);
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
