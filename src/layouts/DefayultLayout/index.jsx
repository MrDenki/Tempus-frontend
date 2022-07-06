import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Spiner from "@/components/UI/Spiner";
// import Header from '../components/Header';
// import Footer from '../components/Footer'
import Sidebar from "@/components/Sidebar";

const DefayultLayout = () => {
  return (
    <>
      <Sidebar />
      <Container className="wrapper">
        {/* <Header /> */}

        <Suspense fallback={<Spiner />}>
          <Outlet />
        </Suspense>

        {/* <Footer /> */}
      </Container>
    </>
  );
};
export default DefayultLayout;
