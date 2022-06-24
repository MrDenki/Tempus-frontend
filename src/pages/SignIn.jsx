import SignInForm from "../components/Forms/SignInForm";

const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignIn;
