import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Spiner from "@/components/UI/Spiner";

const CenteredLayout = () => (
  <Container className="wrapper">
    <div className="container">
      <div className="center-container">
        <Suspense fallback={<Spiner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  </Container>
);

export default CenteredLayout;
