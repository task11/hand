import React, { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";


const OAuthForm = () => {
  const provider = new GoogleAuthProvider();

  return (
    <div>
      <span>OAuth</span>
    </div>
  );
};

export default OAuthForm;