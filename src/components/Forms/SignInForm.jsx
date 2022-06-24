import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Button from "@/components/UI/Button";
import { Title } from "../Typography";
import Checkbox from "@mui/material/Checkbox";
import BaseForm from "./BaseForm";

// import './style.scss'

// const SignInForm = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

const SignInForm = ({ onSubmit }) => {
  const validation = () => {};

  return (
    <BaseForm onSubmit={onSubmit}>
      <Grid container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="form__avatar" sx={{ mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Title className="form__title" variant="h5">
              Sign In
            </Title>
          </Grid>

          <Grid container spacing={2}>
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
          </Grid>
          <Grid justifyContent="left" sx={{ mt: 1 }}>
            <Checkbox className="form__checkbox" type="checkbox"></Checkbox>
            Remember me
          </Grid>
          <Button
            className="form__button"
            type="submit"
            fullWidth
            sx={{ p: 1 }}
          >
            Sign In
          </Button>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Link to="/sign-up" className="form__link">
              <div>Don't have an account? Sign up</div>
            </Link>
          </Grid>
        </Box>
      </Grid>
    </BaseForm>
  );
};

export default SignInForm;
