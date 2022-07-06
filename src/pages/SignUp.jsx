import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearSignUpError } from "@/store/slices/authSlice";
import Alert from "@/components/UI/Alert";
import SignUpForm from "@/components/Forms/SignUpForm";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const { isLoading, isAuth, signUpError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (signUpError) setOpenAlert(true);
    else setOpenAlert(false);
  }, [signUpError]);

  const handleSubmit = async (credentials) => {
    await dispatch(signUp(credentials));
    if (isAuth) router("/");
  };

  const closeAlert = () => {
    dispatch(clearSignUpError());
  };

  return (
      <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} />
      // <Alert
      //   title="Sign up error"
      //   message={signUpError}
      //   open={openAlert}
      //   onClose={closeAlert}
      // />
  );
};

export default SignUp;
