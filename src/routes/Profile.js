import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const [newPhoto, setNewPhoto] = useState(userObj.photoURL);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);


  const changeProfileImg = (event) => {
    const { target: { files } } = event;
    const imgFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (endEvent) => {
      const { currentTarget: { result } } = endEvent;
      setNewPhoto(result);
    }
    reader.readAsDataURL(imgFile);

    //setNewPhoto();
  }

  const deleteProfileImg = () => {
    console.log("delete");
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }

  const onSubmitProfileUpdate = async (event) => {
    event.preventDefault();
    if ((userObj.photoURL !== newPhoto) && (userObj.displayName !== newDisplayName)) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
        photoURL: newPhoto
      })
    } else if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      })
    } else if (userObj.photoURL !== newPhoto) {
      await updateProfile(userObj, {
        photoURL: newPhoto
      })
    }
  }

  const onCancel = () => {
    navigate('/');
  }



  return (
    <>
      <h2>프로필 편집</h2>
      <form onSubmit={onSubmitProfileUpdate}>
        <div style={{ display: "flex" }}>
          <div>
            <img
              style={{ backgroundImage: newPhoto, borderRadius: "40px", width: "50px", height: "50px" }}
              src={newPhoto}
              alt={userObj.displayName}
            />
            <br />
            <label htmlFor="input-file">
              이미지 추가
            </label>
            <input
              id="input-file"
              type="file"
              name="changeImg"
              accept="image/*"
              onChange={changeProfileImg}
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