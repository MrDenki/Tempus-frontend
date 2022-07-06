import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import DefayultLayout from "@/layouts/DefayultLayout";
import CenteredLayout from "@/layouts/CenteredLayout";

const Main = lazy(() => import("@/pages/Main"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const NoMatch = lazy(() => import("@/pages/NoMatch"));
const UserList = lazy(() => import("@/pages/UserList"));
const Tasks = lazy(() => import("@/pages/Tasks"));

const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

const CheckAuht = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

const routes = [
  {
    path: "/",
    element: <DefayultLayout />,
    children: [
      {
        element: <CenteredLayout />,
        children: [{ path: "*", element: <NoMatch /> }],
      },
      {
        element: <CheckAuht />,
        children: [
          {
            element: <Main />,
            children: [
              { path: "sign-in", element: <SignIn /> },
              { path: "sign-up", element: <SignUp /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: "users", element: <UserList /> },
          {
            path: "tasks",
            element: <Tasks />,
          },
        ],
      },
    ],
  },
];

export default routes;
