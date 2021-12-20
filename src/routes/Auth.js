import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import React from "react";


const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h3 className="text-8xl text-black">HAND</h3>
      <br />
      <br />
      <AuthForm />
      <OAuthForm />
    </div >
  );
};

export default Auth;