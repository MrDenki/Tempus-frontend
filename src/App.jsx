import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import routes from "@/router";
import { getCurrentUser } from "@/store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  let elementRoute = useRoutes(routes);

  return <>{elementRoute}</>;
};

export default App;
