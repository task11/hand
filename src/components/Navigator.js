import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import Cookie from "../static/NavLogo2.svg"
import { faCog, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigator = () => {
  const el = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSection = (event) => {
    if (el.current && !el.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  const onToggle = (prev) => setIsOpen((prev) => !prev);

  useEffect(() => {
    window.addEventListener('mousedown', handleCloseSection);
    return () => {
      window.removeEventListener('mousedown', handleCloseSection);
    };
  }, [])


  return (
    <nav className="bg-gray-200">
      <ul className="w-full h-auto text-lg font-bold p-7">
        <li className="inline-block pt-1">
          <img src={Cookie} />
        </li>
        <li className="inline-block float-right pt-2 pr-14">
          <button onClick={onToggle}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          {isOpen
            &&
            <article ref={el} className="absolute rounded-lg font-normal border-gray-800 border-2 bg-slate-300">
              <div className="border-b-2 border-gray-800 text-center">
                <Link to="/setting">설정</Link>
              </div>
              <div>
                <LogOut />
              </div>
            </article>
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