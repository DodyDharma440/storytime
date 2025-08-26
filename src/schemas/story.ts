import { mixed, object, string } from "yup";

export const storySchema = object({
  title: string().required("Title should not be empty"),
  content: string().required("Content should not be empty"),
  category_id: string().required("Category should not be empty"),
  content_image: mixed()
    .nullable()
    .when("content_image_url", {
      is: (value?: string) => !value,
      then: (schema) =>
        schema
          .required("Thumbnail image is required")
          .test(
            "fileSize",
            "File size exceeds 2MB limit",
            (value: any) => value && value.size <= 2 * 1024 * 1024
          )
          .test(
            "fileType",
            "Only JPEG and PNG images are allowed",
            (value: any) =>
              value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          ),
      otherwise: (schema) => schema,
    }),
  content_image_url: string(),
});
