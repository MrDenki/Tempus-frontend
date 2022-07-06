import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Spiner from "@/components/UI/Spiner";
// import Header from '../components/Header';
// import Footer from '../components/Footer'

const DefayultLayout = () => {
  return (
    <div className="wrapper">
      {/* <Header /> */}

      <Suspense fallback={<Spiner />}>
        <Outlet />
      </Suspense>

      {/* <Footer /> */}
    </div>
  );
};
export default DefayultLayout;
