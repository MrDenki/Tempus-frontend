import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";
import BaseForm from "@/components/Forms/BaseForm";
import { useForm, useError } from "@/hooks";
import {
  required,
  validEmail,
  minLength,
  maxLength,
  validPassword,
} from "@/common/rules";
import { length } from "@/common/constants";

const SignUpForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    firstName: {
      validators: {
        required,
        minLength: minLength(length.firstNameMinLength),
        maxLength: maxLength(length.firstNameMaxLength),
      },
    },
    lastName: {
      validators: {
        required,
        minLength: minLength(length.lastNameMinLength),
        maxLength: maxLength(length.lastNameMaxLength),
      },
    },
    email: {
      validators: {
        required,
        validEmail,
      },
    },
    password: {
      validators: {
        required,
        validPassword,
        minLength: minLength(length.passwordMinLength),
        maxLength: maxLength(length.passwordMaxLength),
      },
    },
  });

  const [firstNameError, firstNameErrorMessage] = useError(form.firstName);
  const [lastNameError, lastNameErrorMessage] = useError(form.lastName);
  const [emailError, emailErrorMessage] = useError(form.email);
  const [passwordError, passwordErrorMessage] = useError(form.password);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.valid()) {
      form.touchFields();
      return;
    }

    const data = new FormData(event.currentTarget);

    const credentials = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    onSubmit(credentials);
  };

  return (
    <BaseForm title="Sign Up" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className="form__input"
            fullWidth
            label="First Name"
            name="firstName"
            disabled={isLoading}
            error={firstNameError}
            helperText={firstNameErrorMessage}
            value={form.firstName.value}
            onChange={(e) => form.firstName.onChange(e.target.value)}
            onBlur={form.firstName.blur}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            className="form__input"
            fullWidth
            label="Last Name"
            name="lastName"
            disabled={isLoading}
            error={lastNameError}
            helperText={lastNameErrorMessage}
            value={form.lastName.value}
            onChange={(e) => form.lastName.onChange(e.target.value)}
            onBlur={form.lastName.blur}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="form__input"
            label="Email Address"
            name="email"
            disabled={isLoading}
            error={emailError}
            helperText={emailErrorMessage}
            value={form.email.value}
            onChange={(e) => form.email.onChange(e.target.value)}
            onBlur={form.email.blur}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="form__input"
            label="Password"
            name="password"
            disabled={isLoading}
            error={passwordError}
            type="password"
            helperText={passwordErrorMessage}
            value={form.password.value}
            onChange={(e) => form.password.onChange(e.target.value)}
            onBlur={form.password.blur}
          />
        </Grid>

        <Grid item xs={12} flex>
          <Button
            className="form__button"
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            Sign Up
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Link to="/sign-in" className="form__link">
            <div>Already have an account? Sign in</div>
          </Link>
        </Grid>
      </Grid>
    </BaseForm>
  );
};

export default SignUpForm;
