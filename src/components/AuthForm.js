import React, { useState } from "react";
import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InputEmail = styled.input`
  margin-top: 1rem;
  width: 14rem;
  height: 1.5rem;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid ${props => props.theme.bgColor};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  outline: none;
`;

const InputUsername = styled.input`
  border-bottom-width: 1px;
  width: 14rem;
  height: 1.5rem;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid ${props => props.theme.bgColor};
  outline: none;
`;

const InputPasswd = styled.input`
  width: 14rem;
  height: 1.5rem;
  padding: 1rem;
  border: none;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  outline: none;
`;

const Login = styled.input`
  margin-top: 0.8rem;
  width: 12rem;
  height: 1.5rem;
  border: solid 1px ${(props) => props.theme.btnColor};
  border-radius: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.btnColor};
  transition: all 0.5s linear;
  
  &:hover{
    color: ${(props) => props.theme.hoverTextColor};
    background-color: ${(props) => props.theme.hoverBtnColor};
    box-shadow:200px 0 0 0 rgba(0,0,0,0.2) inset;
  }
`;

const Button = styled.button`
  margin-top: 0.8rem;
  margin-bottom: 1rem;
  width: 12rem;
  height: 1.5rem;
  border: solid 1px ${(props) => props.theme.btnColor};
  border-radius: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.btnColor};
  transition: all 0.5s linear;
  
  &:hover{
    color: ${(props) => props.theme.hoverTextColor};
    background-color: ${(props) => props.theme.hoverBtnColor};
    box-shadow:200px 0 0 0 rgba(0,0,0,0.2) inset;
  }
`;




const AuthForm = () => {
  const defaultProfilePhotoUrl = "https://firebasestorage.googleapis.com/v0/b/hand-f5ddb.appspot.com/o/basicProfile.jpeg?alt=media&token=7e5fa233-5f6f-43a0-894a-65388faaf895";
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const [passwdValid, setPasswdVaild] = useState(false);

  const toggleAccount = (prev) => {
    setNewAccount((prev) => !prev);
    setPasswdVaild(false);
  };

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "text") {
      setUsername(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccount) {
      if (password.length >= 10) {
        createUserWithEmailAndPassword(
          authService,
          email,
          password
        ).then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username,
            photoURL: defaultProfilePhotoUrl,
          });
        }).catch((error) => {
          setError(error.message);
        });
      } else {
        setError("패스워드의 길이가 짧습니다.");
        setPassword("");
        setPasswdVaild(true);
      }
    } else {
      signInWithEmailAndPassword(
        authService,
        email,
        password
      ).catch((error) => {
        setError(error.message);
      });
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit} >
        <InputEmail
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder={newAccount ? "이메일(example@gmail.com)" : "이메일을 입력하세요."}
        />

        {newAccount &&
          <>
            <InputUsername
              name="text"
              type="text"
              value={username}
              onChange={onChange}
              placeholder="이름(2자 이상)"
            />
          </>
        }
        <InputPasswd
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder={newAccount ? "영문, 숫자, 특문 중 2개 조합 10자 이상" : "비밀번호를 입력하세요."}
        />
        <Login
          type="submit"
          value={newAccount ? "완료" : "로그인"}
        />
      </form>
      <Button
        onClick={toggleAccount}>
        {newAccount ? "로그인" : "회원가입"}
      </Button>
      {error && <span>{error}</span>}
    </Container>
  );
};

export default AuthForm;