import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import { Heading, Title, Subtitle } from "@/components/Typography";
import { signOut } from "@/store/slices/authSlice";

const Main = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = async () => {
    await dispatch(signOut());
    router("/sign-in");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item textAlign="center">
        <Heading>Tempus</Heading>

        <Title>Main page</Title>

        <Subtitle>This is the main page</Subtitle>

        <Grid container style={{ marginTop: 20 }} justifyContent="center">
          <Link to="/users">
            <Button>Users list</Button>
          </Link>
        </Grid>

        <Grid container style={{ marginTop: 20 }} justifyContent="center">
          <Link to="/sign-in">
            <Button>Sign in</Button>
          </Link>
        </Grid>

        <Grid container style={{ marginTop: 20 }} justifyContent="center">
          <Link to="/sign-up">
            <Button>Sign up</Button>
          </Link>
        </Grid>

        <Grid container style={{ marginTop: 20 }} justifyContent="center">
          <Button onClick={handleClick}>Sign out</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
