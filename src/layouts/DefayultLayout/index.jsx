import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Spiner from "@/components/Spiner";
// import Header from '../components/Header';
// import Footer from '../components/Footer'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/store/slices/authSlice";

const DefayultLayout = () => {

  return (
    <Container className="wrapper">
      {/* <Header /> */}

      <Suspense fallback={<Spiner />}>
      <Outlet />
      </Suspense>

      {/* <Footer /> */}
    </Container>
  );
};
export default DefayultLayout;
