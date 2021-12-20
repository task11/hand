import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import React from "react";


const Auth = () => {
  return (
    <div className="text-center bg-orange-100 w-full h-full">
      < div className=" font-bold text-5xl" >
        <span>HAND</span>
      </div >
      <AuthForm />
      <div>
        <OAuthForm />
      </div>
    </div >
  );
};

export default Auth;