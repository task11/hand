import React, { useState } from "react";
import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@firebase/auth";


const AuthForm = () => {
  const defaultProfilePhotoUrl = "https://firebasestorage.googleapis.com/v0/b/hand-f5ddb.appspot.com/o/basicProfile.jpeg?alt=media&token=7e5fa233-5f6f-43a0-894a-65388faaf895";
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const toggleAccount = (prev) => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "text") {
      setUsername(value);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccount) {
      createUserWithEmailAndPassword(
        authService,
        email,
        password
      ).then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
          photoURL: defaultProfilePhotoUrl,
        });
      }).catch((error) => {
        setError(error.message);
      })
    } else {
      signInWithEmailAndPassword(
        authService,
        email,
        password
      ).catch((error) => {
        setError(error.message);
      });
    }

  }

  return (
    <div className="text-center">
      <form onSubmit={onSubmit} >
        {newAccount &&
          <input className="m-1 w-72 h-12 bg-gray-200 shadow-md"
            name="text"
            type="text"
            value={username}
            onChange={onChange}
            placeholder="이름(2자 이상)"
          />
        }
        <br />
        <input className="m-1 w-72 h-12 bg-gray-200 shadow-md "
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder="이메일(example@gmail.com)"
        />
        <br />
        <input className="m-1 w-72 h-12 bg-gray-200 shadow-md "
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder="영문, 숫자, 특문 중 2개 조합 10자 이상"
        />
        <br />
        <br />
        <input className="m-1 w-32 h-6 rounded-3xl bg-gray-400 font-bold"
          type="submit"
          value={newAccount ? "Sign In" : "Log In"}
        />
        <br />
        <button
          className="m-1 w-32 h-6 rounded-3xl bg-gray-400 font-bold"
          onClick={toggleAccount}>
          {newAccount ? "Log In" : "Join"}
        </button>
        <br />
        {error && <span>{error}</span>}
        <br />
      </form>
    </div>
  );
};

export default AuthForm;