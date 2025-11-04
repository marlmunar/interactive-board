import AuthForm from "@/components/AuthForm";
import signInUser from "@/services/auth/signin";
import React from "react";

const SignIn = () => <AuthForm type="signin" onSubmit={signInUser} />;

export default SignIn;
