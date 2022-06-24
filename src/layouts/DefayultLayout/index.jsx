import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
// import Header from '../components/Header';
// import Footer from '../components/Footer'
// import Spiner from "../components/Spiner";

const DefayultLayout = () => (
  <Container className="wrapper">
    {/* <Header /> */}

    {/* <Suspense fallback={<Spiner />}> */}
    <Outlet />
    {/* </Suspense> */}

    {/* <Footer /> */}
  </Container>
);

export default DefayultLayout;
