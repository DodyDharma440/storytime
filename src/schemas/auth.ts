import { object, ref, string } from "yup";

export const registerSchema = object({
  name: string().required("Name should not be empty"),
  email: string()
    .required("Email should not be empty")
    .email("Email must be a valid email"),
  password: string()
    .required("Password should not be empty")
    .min(8, "Password in minimum 8 characters")
    .matches(
      /[a-z]/,
      "Password must include at least one lowercase letter (a-z)"
    )
    .matches(/[0-9]/, "Password must include at least one number (0-9)")
    .matches(/^[^\s]+$/, "Password must not contain spaces"),
  password_confirmation: string()
    .required("Confirm Password should not be empty")
    .oneOf([ref("password")], "Confirm password must match to password"),
});

export const loginSchema = object({
  username_or_email: string()
    .required("Email should not be empty")
    .email("Email must be a valid email"),
  password: string().required("Password should not be empty"),
});
