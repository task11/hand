import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import Cookie from "../static/NavLogo.svg"

const Navigator = () => {
  const [setToggle, setSetToggle] = useState(false);

  const clickToggle = (prev) => setSetToggle((prev) => !prev);

  return (
    <nav>
      <ul className=" m-4 p-4 w-full h-14 text-base font-bold">
        <li className="inline-block">
          <img src={Cookie} />
        </li>

        <li className="inline-block float-right pr-14">
          <span onClick={clickToggle}>톱니</span>
          {setToggle
            &&
            <div>
              <LogOut />
              <Link to="/setting">설정</Link>
            </div>
          }
        </li>
        <li className="inline-block float-right pr-14 ">
          <Link to="/profile">프로필</Link>
        </li>
        <li className="inline-block float-right pr-14 ">
          <Link to="/">홈</Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navigator;