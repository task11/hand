import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import React from "react";
import Cookie from "../static/MainLogo2.svg";
import BgImg from "../static/hand-background-mid.jpeg";

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${BgImg})` }}>
      <br />
      <AuthForm />
      <OAuthForm />
    </div >
  );
};

export default Auth;