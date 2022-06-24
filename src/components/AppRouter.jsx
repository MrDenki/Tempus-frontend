import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";

const AppRouter = () => {
  const isAuth = false;

  return (
    <Routes>
      {isAuth
        ? publicRoutes.map((route) => (
            <Route
              path={route.path}
              exact={route.exact}
              element={route.component}
              key={route.path}
            />
          ))
        : privateRoutes.map((route) => (
            <Route
              path={route.path}
              exact={route.exact}
              element={route.component}
              key={route.path}
            />
          ))}
    </Routes>
  );
};

export default AppRouter;
