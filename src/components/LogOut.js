import { authService } from "fBase";
import React from "react";
import { useNavigate } from "react-router";

const LogOut = ({ userObj }) => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.LogOut();
    navigate('/');


  };

  return (
    <button onClick={onLogOutClick}>로그아웃</button>
  );
}

export default LogOut;