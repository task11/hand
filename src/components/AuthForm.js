import React, { useState } from "react";
import { authService } from "fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";


const AuthForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const toggleAccount = (prev) => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
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
      }).catch((error) => {
        setError(error.message);
      })
    } else {
      signInWithEmailAndPassword(
        authService,
        email,
        password
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      }).catch((error) => {
        setError(error.message);
      });
    }

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder="input id"
        />
        <input
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder="input password"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span>{error}</span>}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
    </div>
  );
};

export default AuthForm;