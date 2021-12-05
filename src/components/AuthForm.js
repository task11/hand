import React, { useState } from "react";

const AuthForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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



  }

  return (
    <div>
      <form>
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
          value="Log In"
          onSubmit={onSubmit}
        />
      </form>
    </div>
  );
};

export default AuthForm;