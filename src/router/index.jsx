import { lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import DefayultLayout from "@/layouts/DefayultLayout";
import CenteredLayout from "@/layouts/CenteredLayout";

const Main = lazy(() => import("@/pages/Main"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const NoMatch = lazy(() => import("@/pages/NoMatch"));
const UserList = lazy(() => import("@/pages/UserList"));

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/store/slices/authSlice";

const PrivateRoute = () => {
  // const { isAuth } = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem('isAuth')
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

const AppRouter = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DefayultLayout />}>
        <Route element={<CenteredLayout />}>
          <Route index element={<Main />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UserList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;

{
  /* <Route index element={<Main />} /> */
}
{
  /* <Route path="dashboard" element={<Dashboard />} /> */
}

// export const publicRoutes = [
//   { path: "/sign-up", exact: true, component: <SignUp /> },
// ];

// export const privateRoutes = [
//   { path: "/sign-in", exact: true, component: <SignIn /> },
// ];
