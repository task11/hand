import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Navigator = () => {
  const [setToggle, setSetToggle] = useState(false);

  const clickToggle = (prev) => setSetToggle((prev) => !prev);

  return (
    <nav >
      <ul className=" m-2.5 p-2.5 bg-gray-200 w-full h-11 rounded-lg text-base font-bold">
        <li className="inline-block">
          <Link to="/">홈</Link>
        </li>
        <li className="inline-block">
          <Link to="/profile">프로필</Link>
        </li>
        <li className="inline-block">
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