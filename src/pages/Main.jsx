import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Heading, Title, Subtitle } from "@/components/Typography";
import { signOut } from "@/store/slices/authSlice";
import Button from "../components/UI/Button";

const Main = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const { isAuth } = useSelector((state) => state.auth);

  const handleClick = async () => {
    await dispatch(signOut());
    router("/sign-in");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <div className="navigation">
        <ul>
          <li className="navigation-list active">
            <b></b>
            <b></b>
            <a href="#">
              <span className="icon">
                <ion-icon name="briefcase-outline"></ion-icon>
              </span>
              <span className="title">Tasks</span>
            </a>
          </li>
          <li className="navigation-list">
            <b></b>
            <b></b>
            <a href="#">
              <span className="icon">
                <ion-icon name="id-card-outline"></ion-icon>
              </span>
              <span className="title">Reports</span>
            </a>
          </li>
          <li className="navigation-list">
            <b></b>
            <b></b>
            <a href="#">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Team</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="toggle">
        <ion-icon name="menu-outline" className="open"></ion-icon>
        <ion-icon name="close-outline" className="close"></ion-icon>
      </div>
      <Grid item textAlign="center">
        <Heading>Tempus</Heading>

        <Title>Main page</Title>

        <Subtitle>This is the main page</Subtitle>

        {isAuth && (
          <Grid container style={{ marginTop: 20 }} justifyContent="center">
            <Link to="/users">
              <Button>Users list</Button>
            </Link>
          </Grid>
        )}

        {!isAuth && (
          <Grid container style={{ marginTop: 20 }} justifyContent="center">
            <Link to="/sign-in">
              <Button>Sign in</Button>
            </Link>
          </Grid>
        )}

        {!isAuth && (
          <Grid container style={{ marginTop: 20 }} justifyContent="center">
            <Link to="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </Grid>
        )}

        {isAuth && (
          <Grid container style={{ marginTop: 20 }} justifyContent="center">
            <Button onClick={handleClick}>Sign out</Button>
          </Grid>
        )}

      </Grid>
    </Grid>
  );
};

export default Main;
