import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import React from "react";
import Cookie from "../static/MainLogo2.svg"

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={Cookie} />
      <br />
      <AuthForm />
      <OAuthForm />
    </div >
  );
};

export default Auth;