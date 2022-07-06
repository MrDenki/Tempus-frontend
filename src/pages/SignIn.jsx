import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, clearSignInError } from "@/store/slices/authSlice";
import Alert from "@/components/UI/Alert";
import SignInForm from "@/components/Forms/SignInForm";
import { Outlet } from "react-router-dom";


const SignIn = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const { isLoading, isAuth, signInError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (signInError) setOpenAlert(true);
    else setOpenAlert(false);
  }, [signInError]);

  const handleSubmit = async (credentials) => {
    await dispatch(signIn(credentials));
    if (isAuth) router("/");
  };

  const closeAlert = () => {
    dispatch(clearSignInError());
  };

  return (
    // <div className="signIn">
    //   <div className="signIn__logo">
    //     <div className="signIn__imageLogo"></div>

    //     <div className="signIn__title-logo">TEMPUS</div>

    //     <div className="signIn__quote">
    //       Quia tempus est mensura motus, erit etiam a mensura de requiem, pro
    //       omnibus ceteris est in tempus...
    //     </div>
    //   </div>

    //   <div className="signIn__form">
    //     <Outlet />

        <SignInForm onSubmit={handleSubmit} isLoading={isLoading} />
    //     <Alert
    //       title="Sign in error"
    //       message={signInError}
    //       open={openAlert}
    //       onClose={closeAlert}
    //     />
    //   </div>
    // </div>
  );
};

export default SignIn;
