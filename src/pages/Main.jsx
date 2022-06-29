import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import { Heading, Title, Subtitle } from "@/components/Typography";
import { signOut } from "@/store/slices/authSlice";
import { useState } from "react";
import Modal from "../modals/modal";
import CreateTask from "../components/Modals/CreateTask";

const Main = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const { isAuth } = useSelector((state) => state.auth);

  const handleClick = async () => {
    await dispatch(signOut());
    router("/sign-in");
  };

  const [modalActive, setModalAtive] = useState(false);

  return (
    <Grid container justifyContent="center" alignItems="center">
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

        <Button onClick={() => setModalAtive(true)}>Модальное окношко</Button>
        <Modal active={modalActive} setActive={setModalAtive}>
          <CreateTask/>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Main;
