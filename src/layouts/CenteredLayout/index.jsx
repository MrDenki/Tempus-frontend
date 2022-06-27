import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Spiner from "@/components/Spiner";

const CenteredLayout = () => (
  <div className="wrapper">
    <div className="container">
      <div className="center-container">
        <Suspense fallback={<Spiner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  </div>
);

export default CenteredLayout;
