import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Spiner from "@/components/UI/Spiner";
import Sidebar from "@/components/Sidebar";

const DefayultLayout = () => {
  return (
    <>
      <Sidebar />
      <Container className="wrapper">
        <Suspense fallback={<Spiner />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
export default DefayultLayout;
