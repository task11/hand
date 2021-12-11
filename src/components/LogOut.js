import { authService } from "fBase";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";

const LogOut = ({ userObj }) => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(userObj).then(() => {
      console.log("로그아웃 완료");
      navigate('/');
    }).catch((error) => {
      console.log(error);
    })

  };

  return (
    <button onClick={onLogOutClick}>로그아웃</button>
  );
}

export default LogOut;