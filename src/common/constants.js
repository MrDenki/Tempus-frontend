export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegex =
  /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/;
export const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
const passwordMinLength = 6;
const passwordMaxLength = 20;

const firstNameMinLength = 3;
const firstNameMaxLength = 15;

const lastNameMinLength = 3;
const lastNameMaxLength = 15;

export const colors = {
  light: {
    primary: "#07042E",
    secondary: "rgba(#f52548, 85%)",
    error: "#f52548",
    warning: "#07042E",
    success: "rgba(13, 201, 60, 0.87)",
  },
};

// #f52548

const taskTitleMinLength = 3;
const taskTitleMaxLength = 50;

const tastDescriptionMinLength = 3;
const taskDescriptionMaxLength = 500;

export const length = {
  firstNameMinLength,
  firstNameMaxLength,

  lastNameMinLength,
  lastNameMaxLength,

  passwordMinLength,
  passwordMaxLength,

  taskTitleMinLength,
  taskTitleMaxLength,

  tastDescriptionMinLength,
  taskDescriptionMaxLength,
};
