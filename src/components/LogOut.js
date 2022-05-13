import { authService } from "fBase";
import React from "react";
import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');


  };

  return (
    <button onClick={onLogOutClick}>로그아웃</button>
  );
};

export default LogOut;