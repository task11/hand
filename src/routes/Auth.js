import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import React from "react";


const Auth = () => {
  return (
    <div className="text-center">
      <div className=" font-bold text-5xl">
        <span>HAND</span>
      </div>
      <AuthForm />
      <OAuthForm />
    </div>
  );
};

export default Auth;