import {
  emailRegex,
  passwordRegex,
  phoneRegex,
  minPasswordLength,
  maxPasswordLength,
} from "./constants";

export const required = (val) => !!val;
export const minLength = (num) => (val) => val.length >= num;
export const maxLength = (num) => (val) => val.length <= num;
export const validEmail = (email) => email.toLowerCase().match(emailRegex);
export const validPassword = (password) => password.match(passwordRegex);
export const validPhone = (phone) => phone.match(phoneRegex);
