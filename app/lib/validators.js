export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const validateEmail = (value) =>
  EMAIL_REGEX.test(value) ? "" : "Enter a valid email address.";

export const validateName = (value, label) =>
  NAME_REGEX.test(value)
    ? ""
    : `${label} must be 2-50 letters (spaces and hyphens allowed).`;

export const validatePassword = (value) =>
  PASSWORD_REGEX.test(value)
    ? ""
    : "Password needs at least 8 characters, including a letter and a number.";
