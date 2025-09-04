export const useCreateStory = createMutation(
  (api) => api.story.createStory.bind(api.story),
  {
    successMessage: "Story successfully created",
    onSuccess: () => navigateTo({ name: "dashboard" }),
  }
);

export const useUpdateStory = createMutation(
  (api) => api.story.updateStory.bind(api.story),
  {
    successMessage: "Story successfully updated",
    onSuccess: () => navigateTo({ name: "dashboard" }),
  }
);

export const useDeleteStory = createMutation(
  (api) => api.story.deleteStory.bind(api.story),
  { successMessage: "Story successfully deleted" }
);
