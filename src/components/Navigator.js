import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Navigator = () => {
  const [setToggle, setSetToggle] = useState(false);

  const clickToggle = (prev) => setSetToggle((prev) => !prev);

  return (
    <nav >
      <ul className="flex">
        <li className="m-2.5 p-2.5">
          <Link to="/">홈</Link>
        </li>
        <li className="m-2.5 p-2.5">
          <Link to="/profile">프로필</Link>
        </li>
        <li className="m-2.5 p-2.5">
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