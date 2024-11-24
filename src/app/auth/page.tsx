import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

const Auth = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-10 items-center justify-center h-full">
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Auth;
