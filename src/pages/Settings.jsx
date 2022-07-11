import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/store/slices/authSlice";

const Settings = () => {
    const dispatch = useDispatch();
    const router = useNavigate();
  
    const { isAuth } = useSelector((state) => state.auth);
  
    const handleClick = async () => {
      await dispatch(signOut());
      router("/sign-in");
    };
  

  return (
    <>
      <div className="settings-page">
        <h3 className="settings-page__title">Settings</h3>
            <div>Your settings</div>
      </div>
    </>
  );
};

export default Settings;
