import AppRouter from "@/router";
import { useRoutes } from "react-router-dom";
import routes from "@/router";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/store/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  let elementRoute = useRoutes(routes);

  return <>{elementRoute}</>;
}

export default App;
