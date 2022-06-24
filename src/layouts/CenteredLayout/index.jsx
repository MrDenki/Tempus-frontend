import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const CenteredLayout = () => (
  // <Grid
  //   component="main"
  //   container
  //   justifyContent="center"
  //   alignContent="center"
  // >
  //   <Grid item xs={12}>
  //     <Outlet />
  //   </Grid>
  // </Grid>
  <div className="wrapper">
    <div className="container">
      <div className="center-container">
        <Outlet />
      </div>
    </div>
  </div>
);

export default CenteredLayout;
