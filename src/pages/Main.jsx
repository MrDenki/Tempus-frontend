import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Spiner from "@/components/UI/Spiner";

const Main = () => (
  <div className="main">
    <div className="main__logo">
      <div className="main__imageLogo"></div>
      <div className="main__logo-quote">
        <div className="main__title-logo">Tempus</div>

        <div className="main__quote">
          Quia tempus est mensura motus, erit etiam a mensura de requiem, pro
          omnibus ceteris est in tempus...
        </div>
      </div>
    </div>

    <div className="test-wrapc">
      <div className="test">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <div className="main__form">
      <Suspense fallback={<Spiner />}>
        <Outlet />
      </Suspense>
    </div>
  </div>
);

export default Main;
