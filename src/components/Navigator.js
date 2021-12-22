import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import Cookie from "../static/NavLogo2.svg"
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigator = () => {
  const [setToggle, setSetToggle] = useState(false);

  const clickToggle = (prev) => setSetToggle((prev) => !prev);

  return (
    <nav className="bg-gray-200 relative">
      <ul className="w-full h-auto text-lg font-bold p-7">
        <li className="inline-block pt-1">
          <img src={Cookie} />
        </li>
        <li className="inline-block float-right pt-2 pr-14">
          <button onClick={clickToggle}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          {setToggle
            &&
            <div className="relative left-3 ">
              <Link to="/setting">설정</Link>
              <br />
              <LogOut />
            </div>
          }
        </li>
        <li className="inline-block float-right pt-2 pr-14 ">
          <Link to="/profile">프로필</Link>
        </li>
        <li className="inline-block float-right pt-2 pr-14 ">
          <Link to="/">HOME</Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navigator;