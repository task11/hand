import React from "react";

const AuthForm = () => {
  return (
    <div>
      <form>
        <input type="email" placeholder="input id" />
        <input type="password" placeholder="input password" />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default AuthForm;