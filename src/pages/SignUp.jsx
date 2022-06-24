import SignUpForm from "@/components/Forms/SignUpForm";

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return <SignUpForm onSubmit={handleSubmit} />;
};

export default SignUp;
