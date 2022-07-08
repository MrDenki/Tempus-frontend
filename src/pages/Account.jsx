import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/store/slices/authSlice";

const Account = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useNavigate();

  const { isAuth } = useSelector((state) => state.auth);

  const handleClick = async () => {
    await dispatch(signOut());
    router("/sign-in");
  };

  return (
    <>
      <div className="account-page">
        <h3 className="account-page__title">Account</h3>
        <div className="account-info-body">
          {/* <div className="account-info">Your First_Name: {currentUser.firstName}</div>
          <div className="account-info">Your Last_Name: {currentUser.lastName}</div>
          <div className="account-info">Your e-mail: {currentUser.email}</div> */}
          <ul>
              <li className="account-info">
                  <span className="title"> Имя пользователя: {console.log(currentUser)}
                  </span>
                  <span className="user-info">{currentUser.lastName} {currentUser.firstName}</span>
              </li>
              <li className="account-info">
                  <span className="title"> E-mail:
                  </span>
                  <span className="user-info">{currentUser.email}</span>
              </li>
            </ul>
        </div>
      </div>
    </>
  );
};

export default Account;
