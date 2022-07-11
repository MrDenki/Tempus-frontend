import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/store/slices/authSlice";
import Sidebar from "../components/Sidebar";

const Reports = () => {
    const dispatch = useDispatch();
    const router = useNavigate();
  
    const { isAuth } = useSelector((state) => state.auth);
  
    const handleClick = async () => {
      await dispatch(signOut());
      router("/sign-in");
    };
  

  return (
    <>
      <div className="reports-page">
        <h3 className="reports-page__title">My Reports</h3>
            <div>Reports</div>
      </div>
    </>
  );
};

export default Reports;
