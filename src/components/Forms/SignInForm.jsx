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

const SignInForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
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
        minLength: minLength(3),
        maxLength: maxLength(15),
      },
    },
  });

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
      email: data.get("email"),
      password: data.get("password"),
    };

    onSubmit(credentials);
  };

  return (
    <BaseForm title="Sign In" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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

        {/* <Grid item xs={12}>
          <div className="form__checkbox">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
            ></Checkbox>
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </Grid> */}

        <Grid item xs={12}>
          <Button
            className="form__button"
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            Sign In
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Link to="/sign-up" className="form__link">
            <div>Don't have an account? Sign up</div>
          </Link>
        </Grid>
      </Grid>
    </BaseForm>
  );
};

export default SignInForm;
