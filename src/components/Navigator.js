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
          <Link to="/profile">프로필</Link>
        </li>
        <li>
          <Link to="/setting">설정</Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navigator;