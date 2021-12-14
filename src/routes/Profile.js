import { updateProfile } from "firebase/auth";
import React, { useState } from "react";

const Profile = ({ userObj }) => {
  const [newPhoto, setNewPhoto] = useState(userObj.photoURL);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);


  const changeProfileImg = () => {
    console.log("change");
  }

  const deleteProfileImg = () => {
    console.log("delete");
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }

  const onSubmitProfileInfo = (event) => {
    event.preventDefault();

  }

  return (
    <>
      <h2>프로필 편집</h2>
      <form onSubmit={onSubmitProfileInfo}>
        <div style={{ display: "flex" }}>
          <div>
            <img style={{ borderRadius: "40px" }} src={newPhoto} alt={userObj.displayName} />
            <br />
            <button
              name="changeImg"
              onClick={changeProfileImg}
            >이미지 변경</button>
            <button
              name="deleteImg"
              onClick={deleteProfileImg}
            >이미지 삭제</button>
          </div>
          <div>
            <h1>이름</h1>
            <input
              type="text"
              name="changeName"
              value={newDisplayName}
              onChange={onChange}
            ></input>
          </div>
        </div>
        <div>
          <button type="submit">완료</button>
          <button type="reset">취소</button>
        </div>
      </form>
    </>
  );
};

export default Profile;