import React from "react";
import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">PROFILE</Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navigator;