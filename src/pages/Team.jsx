import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/store/slices/authSlice";

const Team = () => {
    const dispatch = useDispatch();
    const router = useNavigate();
  
    const { isAuth } = useSelector((state) => state.auth);
  
    const handleClick = async () => {
      await dispatch(signOut());
      router("/sign-in");
    };
  

  return (
    <>
      <div className="team-page">
        <h3 className="team-page__title">My Teams</h3>
            <div>Team is not found</div>
      </div>
    </>
  );
};

export default Team;
