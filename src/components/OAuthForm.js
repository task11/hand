import React from "react";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fBase";


const OAuthForm = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'facebook') {
      provider = new FacebookAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }

  return (
    <div>
      <button onClick={onSocialClick} name="google">
        GOOGLE
      </button>
      <button onClick={onSocialClick} name="facebook">
        FACEBOOK
      </button>
    </div>
  );
};

export default OAuthForm;