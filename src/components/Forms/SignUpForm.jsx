import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import TextField from "@mui/material/TextField";
import BaseForm from "./BaseForm";

const SignUpForm = ({ onSubmit }) => {
  const validation = () => {};

  return (
    <BaseForm title="Sign Up" onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className="form__input"
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            className="form__input"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="form__input"
            required
            fullWidth
            label="Email Address"
            name="email"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="form__input"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
          />
        </Grid>

        <Grid item xs={12}>
          <Button className="form__button" type="submit" fullWidth>
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
