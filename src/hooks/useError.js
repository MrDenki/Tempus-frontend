import { useEffect, useState } from "react";
import { length } from "../common/constants";

const useError = (field) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (field.touched && !field.valid) setError(true);
    else setError(false);
  }, [field.touched, field.valid]);

  useEffect(() => {
    if (field.touched) {
      if (field.errors.required) {
        setErrorMessage("Field is required");
        return;
      }

      if (field.errors.minLength) {
        let minLength = length[field.name + "MinLength"];
        setErrorMessage(`Field cannot be less than ${minLength}`);
        return;
      }

      if (field.errors.maxLength) {
        let maxLength = length[field.name + "MaxLength"];
        setErrorMessage(`Field cannot be more than ${maxLength}`);
        return;
      }

      if (field.errors.validEmail) {
        setErrorMessage("Invalid email");
        return;
      }

      if (field.errors.validPassword) {
        setErrorMessage("Invalid password");
        return;
      }

      setErrorMessage("");
    }
  }, [field.touched, field.errors]);

  return [error, errorMessage];
};

export default useError;
