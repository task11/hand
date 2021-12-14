import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Navigator = () => {
  const [setToggle, setSetToggle] = useState(false);

  const clickToggle = (prev) => setSetToggle((prev) => !prev);

  return (
    <nav >
      <ul style={{ display: "flex" }}>
        <li style={{ margin: "10px", padding: "10px" }}>
          <Link to="/">홈</Link>
        </li>
        <li style={{ margin: "10px", padding: "10px" }}>
          <Link to="/profile">프로필</Link>
        </li>
        <li style={{ margin: "10px", padding: "10px" }}>
          <span onClick={clickToggle}>톱니</span>
          {setToggle
            &&
            <div>
              <LogOut />
              <Link to="/setting">설정</Link>
            </div>
          }
        </li>
      </ul>

    </nav>
  );
};

export default Navigator;