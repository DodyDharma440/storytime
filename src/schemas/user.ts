import { mixed, object, ref, string } from "yup";

export const editProfilSchema = object({
  name: string().required("Name should not be empty"),
  about: string().required("About should not be empty"),
  old_password: string(),
  new_password: string()
    .when("old_password", {
      is: (val: string) => val && val.length > 0,
      then: (schema) =>
        schema.required("New password is required when old password is filled"),
      otherwise: (schema) => schema,
    })
    .transform((val) => (val === "" ? undefined : val))
    .nullable()
    .min(8, "Password in minimum 8 characters")
    .matches(
      /[a-z]/,
      "Password must include at least one lowercase letter (a-z)"
    )
    .matches(/[0-9]/, "Password must include at least one number (0-9)")
    .matches(/^[^\s]+$/, "Password must not contain spaces"),
  new_password_confirmation: string()
    .transform((val) => (val === "" ? undefined : val)) // kosong dianggap undefined
    .nullable()
    .oneOf([ref("new_password")], "Confirm password must match to password"),
  profile_picture: mixed()
    .nullable()
    .when("profile_picture_url", {
      is: (value?: string) => !value,
      then: (schema) =>
        schema
          .notRequired()
          .nullable()
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
}).test(
  "passwords-required-together",
  "Old password is required when changing password",
  function (values) {
    const { old_password, new_password } = values;
    if ((old_password && !new_password) || (!old_password && new_password)) {
      return this.createError({
        path: !old_password ? "old_password" : "new_password",
      });
    }
    return true;
  }
);
