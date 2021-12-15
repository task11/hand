import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const [newPhoto, setNewPhoto] = useState(userObj.photoURL);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);


  const changeProfileImg = (event) => {
    console.log(event);

    //setNewPhoto();
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

  const onCancel = () => {
    navigate('/');
  }



  return (
    <>
      <h2>프로필 편집</h2>
      <form onSubmit={onSubmitProfileInfo}>
        <div style={{ display: "flex" }}>
          <div>
            <img style={{ borderRadius: "40px" }} src={newPhoto} alt={userObj.displayName} />
            <br />
            <label htmlFor="input-file">
              이미지 추가
            </label>
            <input
              id="input-file"
              type="file"
              name="changeImg"
              onClick={changeProfileImg}
              style={{ display: "none" }}
            />
            <br />
            <label htmlFor="delete-file">
              이미지 삭제
            </label>
            <input
              id="delete-file"
              type="button"
              name="deleteImg"
              onClick={deleteProfileImg}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <h2>이름</h2>
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
          <button type="reset" onClick={onCancel}>취소</button>
        </div>
      </form>
    </>
  );
};

export default Profile;