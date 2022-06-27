import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, clearSignInError } from "@/store/slices/authSlice";
import Alert from "@/components/UI/Alert";
import SignInForm from "@/components/Forms/SignInForm";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const { isLoading, isAuth, signInError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (signInError) setOpenAlert(true);
    else setOpenAlert(false);
  }, [signInError]);

  useEffect(() => {
    if (isAuth) router("/");
  }, [isAuth]);

  const handleSubmit = (credentials) => {
    dispatch(signIn(credentials));
  };

  const closeAlert = () => {
    dispatch(clearSignInError());
  };

  return (
    <>
      <SignInForm onSubmit={handleSubmit} isLoading={isLoading} />
      <Alert
        title="Sign in error"
        message={signInError}
        open={openAlert}
        onClose={closeAlert}
      />
    </>
  );
};

export default SignIn;
