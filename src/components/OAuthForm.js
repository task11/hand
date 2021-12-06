import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fBase";


const OAuthForm = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }

  return (
    <div>
      <button onClick={onSocialClick} name="google">
        GOOGLE
      </button>
    </div>
  );
};

export default OAuthForm;