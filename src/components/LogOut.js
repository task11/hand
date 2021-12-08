import { authService } from "fBase";
import React from "react";
import { Navigate } from "react-router";

const LogOut = () => {

  const onLogOutClick = () => {
    authService.signOut();
    Navigate('/');
  };

  return (
    <span onClick={onLogOutClick}>로그아웃</span>
  );
}

export default LogOut;