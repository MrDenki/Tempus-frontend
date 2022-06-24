import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import Button from '@/components/UI/Button';
import { Title } from '../Typography';
// import './style.scss'

const SignUpForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container maxWidth="xs" className='form'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar className='form__avatar'>
          <LockOutlinedIcon />
        </Avatar>

        <Title className='form__title' variant='h5'>
          Sign up
        </Title>

        <Box component="form" onSubmit={handleSubmit}>
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
                id="lastName"
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
          </Grid>

          <Button
            className="form__button"
            type="submit"
            fullWidth
            sx={{ p: 1 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/sign-in" className='form__link'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUpForm