import React, { useState } from "react";
import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@firebase/auth";


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
    <div className="text-center">
      <form onSubmit={onSubmit} >
        <input className=" w-72 h-12 p-6 rounded-t-xl bg-gray-200 border-gray-700 border-b border-solid shadow-md "
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder={newAccount ? "이메일(example@gmail.com)" : "이메일을 입력하세요."}
        />

        {newAccount &&
          <>
            <br />
            <input className=" w-72 h-12 p-6 border-gray-700 border-b border-solid bg-gray-200 shadow-md"
              name="text"
              type="text"
              value={username}
              onChange={onChange}
              placeholder="이름(2자 이상)"
            />
          </>
        }
        <br />
        <input className={`${passwdValid ? 'animate-pulse rounded-b-xl bg-red-400 w-72 h-12 p-6 shadow-md' : 'bg-gray-200 rounded-b-xl w-72 h-12 p-6 shadow-md'}`}
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder={newAccount ? "영문, 숫자, 특문 중 2개 조합 10자 이상" : "비밀번호를 입력하세요."}
        />
        <br />
        <br />
        <input className="m-1 bg-purple-400 w-72 rounded-xl h-8 text-white shadow-md cursor-pointer font-bold "
          type="submit"
          value={newAccount ? "완료" : "로그인"}
        />
        <br />
      </form>
      <button
        className="m-1 bg-purple-400 w-72 rounded-xl text-white h-8 shadow-md font-bold"
        onClick={toggleAccount}>
        {newAccount ? "로그인" : "회원가입"}
      </button>
      <br />
      {error && <span>{error}</span>}
      <br />

    </div>
  );
};

export default AuthForm;