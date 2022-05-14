import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import { faCog, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultThumnail from "../static/basicProfile.jpeg";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  position: fixed;
  top: 0;
  font-size: 1.7rem;
  height: 5rem;
  width: 100%;
`;

const Logo = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20%;
  
`;
const Strong = styled.strong`
  font-size: 2rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 50%;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UserThumnail = styled.img.attrs({
  src: `${defaultThumnail}`,
  alt: "user-thumnail"
})`
  width: auto;
  height: 2.6rem;
  margin-right: 1rem;
  border-radius: 20px;
`;

const UserName = styled.span`
  font-size: 1.4rem;
`;


const Navigator = () => {
  const el = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSection = (event) => {
    if (el.current && !el.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onToggle = (prev) => setIsOpen((prev) => !prev);

  useEffect(() => {
    window.addEventListener('mousedown', handleCloseSection);
    return () => {
      window.removeEventListener('mousedown', handleCloseSection);
    };
  }, []);

  return (
    <Header>
      <Logo>
        <h1>
          <Link to="/">
            <span>
              <Strong>H</Strong>ave&nbsp;
              <Strong>A</Strong>&nbsp;
              <Strong>N</Strong>ice&nbsp;
              <Strong>D</Strong>ay
            </span>
          </Link>
        </h1>
      </Logo>
      <Nav>
        <Ul>
          <Li>
            <Link to="/profile">
              <Profile>
                <UserThumnail />
                <UserName>Welcome! Username</UserName>
              </Profile>
            </Link>
          </Li>
          <Li>
            <Link to="/setting">Preference</Link>
          </Li>
          <Li >
            <LogOut />
          </Li>
        </Ul>
      </Nav>
    </Header >
  );
};

export default Navigator;