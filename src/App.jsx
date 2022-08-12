import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import routes from "@/router";
import { getCurrentUser } from "@/store/slices/authSlice";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) dispatch(getCurrentUser());
  }, [isAuth]);

  let elementRoute = useRoutes(routes);

  return <>{elementRoute}</>;
};

export default App;
