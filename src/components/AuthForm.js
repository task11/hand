import React, { useState } from "react";
import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@firebase/auth";


const AuthForm = () => {
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
    <div>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
      <form onSubmit={onSubmit}>
        {newAccount &&
          <input
            name="text"
            type="text"
            value={username}
            onChange={onChange}
            placeholder="이름(2자 이상)"
          />}
        <input
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder="이메일(example@gmail.com)"
        />
        <input
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder="영문, 숫자, 특문 중 2개 조합 10자 이상"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

export default AuthForm;