export const useUpdateProfile = createMutation(
  (api) => api.user.updateProfile.bind(api.user),
  { successMessage: "Your profile successfuly updated" }
);

export const useUpdateProfilePicture = createMutation(
  (api) => api.user.updateProfilePicture,
  { successMessage: "Profile picture updated" }
);
