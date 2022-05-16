import { authService } from "fBase";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Button = styled.a`
  border: none;
  background-color: white;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
`;


const LogOut = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');


  };

  return (
    <Button onClick={onLogOutClick}>Log out</Button>
  );
};

export default LogOut;;