import * as yup from "yup";

export const MAX_EMAIL_LENGTH = 100;

export const loginSchema = (dict) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(dict.VALIDATION.EMAIL_INVALID)
      .required(dict.VALIDATION.EMAIL_REQUIRED)
      .max(MAX_EMAIL_LENGTH, dict.VALIDATION.EMAIL_MAX_LENGTH),
    password: yup.string().required(dict.VALIDATION.PASSWORD_REQUIRED),
  });
};
