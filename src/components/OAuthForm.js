import React from "react";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Li = styled.li`
  display: flex;
  flex-direction: row;
  margin: 0.25rem;
`;

const Button = styled.button`
 border: none;
 background-color: white;
 cursor: pointer;
`;

const OAuthForm = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'facebook') {
      provider = new FacebookAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <ul>
      <Li>
        <Button onClick={onSocialClick} name="google">
          <FontAwesomeIcon icon={faGoogle} />
        </Button>
      </Li>
      {/* <li className="inline-block m-1">
        <button onClick={onSocialClick} name="facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </button>
      </li> */}
    </ul>
  );
};

export default OAuthForm;