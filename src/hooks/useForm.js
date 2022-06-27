import useField from "./useField";

const useForm = (fields) => {
  const form = {};

  for (const [key, value] of Object.entries(fields)) {
    form[key] = useField(value);
  }

  const withoutValidAndTouchFields = (k) =>
    k !== "valid" && k !== "touchFields";

  form.valid = () =>
    Object.keys(form)
      .filter(withoutValidAndTouchFields)
      .every((k) => form[k].valid);

  form.touchFields = () => {
    Object.keys(form)
      .filter(withoutValidAndTouchFields)
      .forEach((k) => form[k].blur());
  };

  return form;
};

export default useForm;
