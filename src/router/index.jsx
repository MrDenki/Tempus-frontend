import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import DefayultLayout from "@/layouts/DefayultLayout";
import CenteredLayout from "@/layouts/CenteredLayout";

import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import NoMatch from "@/pages/NoMatch";

function PrivateRoute() {
  // const {user_id, session_key}=store.getState().logReducer;
  // store.dispatch(login_check({user_id: user_id, session_key: session_key}))
  // const {logged_in}=store.getState().logReducer;
  // if (!logged_in) {
  //     browserHistory.push('#/login');
  //     hashHistory.push('/login');
  // }

  const auth = true;
  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
}

// const PrivateRoute = ({ ...rest }) => <Route {...rest} render={requireLogin} />;

const AppRouter = () => {
  const isAuth = false;

  return (
    <Routes>
      <Route path="/" element={<DefayultLayout />}>
        <Route element={<CenteredLayout />}>
          {/* <Route index element={<Main />} /> */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="/" element={<PrivateRoute />}>
          <Route path="sign-up" element={<SignUp />} />
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;

// export const publicRoutes = [
//   { path: "/sign-up", exact: true, component: <SignUp /> },
// ];

// export const privateRoutes = [
//   { path: "/sign-in", exact: true, component: <SignIn /> },
// ];
