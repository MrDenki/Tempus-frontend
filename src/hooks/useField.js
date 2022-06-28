import { useEffect, useState } from "react";

const useField = (field, fieldName) => {
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState(field.value || "");

  const onChange = (val) => {
    val = val.replace(/\s/g, "");

    setValue(val);
    setValid(true);

    const validators = field.validators ?? {};

    Object.keys(validators).map((name) => {
      const isValid = field.validators[name](val);

      const _errors = errors;
      _errors[name] = !isValid;
      setErrors({ ..._errors });

      if (!isValid) setValid(false);
    });
  };

  useEffect(() => {
    onChange(field.value || "");
  }, []);

  const onBlur = () => {
    setTouched(true);
  };

  return { fieldName, value, onChange, valid, errors, touched, blur: onBlur };
};

export default useField;
