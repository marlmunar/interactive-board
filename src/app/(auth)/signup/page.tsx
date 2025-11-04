import AuthForm from "@/components/AuthForm";
import signUpUser from "@/services/auth/signup";
import React from "react";

const SignUp = () => <AuthForm type="signup" onSubmit={signUpUser} />;

export default SignUp;
