import { useEffect, useState } from "react";

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
        setErrorMessage("Field is less than 3");
        return;
      }

      if (field.errors.maxLength) {
        setErrorMessage("Field is greater than 15");
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
