import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "fBase";
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
    let newPhotoUrl = "";


    if (userObj.photoURL !== newPhotoUrl) {
      const profilePhotoRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(profilePhotoRef, newPhoto, "data_url");
      newPhotoUrl = await getDownloadURL(response.ref);


      await updateProfile(userObj, {
        displayName: newDisplayName,
        photoURL: newPhotoUrl,

      })


    }
    navigate('/');
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
              style={{ backgroundImage: newPhoto, borderRadius: "40px", width: "100px", height: "100px" }}
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