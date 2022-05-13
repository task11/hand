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
  top: 0;
  font-size: 1.7rem;
  height: 5rem;
  width: 100%;
  
  /* background-color: ${props => props.theme.bgColor}; */
  /* box-shadow: inset 4px 0 0 0 rgb(0 0 0 / 6%); */
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
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const Li = styled.li`
  padding: 1.7rem;
  width: 30%;
  &:first-child{
    width: 35%;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const UserThumnail = styled.img.attrs({
  src: `${defaultThumnail}`,
  alt: "user-thumnail"
})`
  width: auto;
  height: 2.2rem;
  border-radius: 20px;
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
              <Strong>H</Strong>ave
              <Strong>A</Strong>&nbsp;
              <Strong>N</Strong>ice
              <Strong>D</Strong>ay
            </span>
          </Link>
        </h1>
      </Logo>
      <Nav>
        <Ul>
          <Li>
            <Profile>
              <UserThumnail ></UserThumnail>
              <span>username</span>
            </Profile>
          </Li>
          <Li>
            <Link to="/profile">Edit profile</Link>
          </Li>
          {/* <Button onClick={onToggle}>
              <FontAwesomeIcon icon={faCog} />
            </Button> */}
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