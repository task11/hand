import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "fBase";

const Profile = ({ userObj }) => {
  const defaultProfilePhotoUrl = "https://firebasestorage.googleapis.com/v0/b/hand-f5ddb.appspot.com/o/basicProfile.jpeg?alt=media&token=7e5fa233-5f6f-43a0-894a-65388faaf895";
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

  const deleteProfileImg = async () => {
    const deletePhotoRef = ref(storageService, userObj.photoURL);
    const ok = window.confirm("정말로 삭제할까요?");
    if (ok && (userObj.photoURL !== defaultProfilePhotoUrl)) {
      await deleteObject(deletePhotoRef);
      await updateProfile(userObj, {
        photoURL: defaultProfilePhotoUrl,
      })
      setNewPhoto(userObj.photoURL)
      navigate('/');
    }

    // desertRef.delete().then(function () {
    //   // File deleted successfully
    // }).catch(function (error) {
    //   // Uh-oh, an error occurred!
    // });
  }

  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }

  const onSubmitProfileUpdate = async (event) => {
    event.preventDefault();
    let newPhotoUrl = "";

    if (userObj.photoURL === newPhotoUrl && userObj.displayName === newDisplayName) {
      navigate('/');
    } else if (userObj.photoURL !== newPhotoUrl) {
      const profilePhotoRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(profilePhotoRef, newPhoto, "data_url");
      newPhotoUrl = await getDownloadURL(response.ref);
      //이전 프로필 사진 storage에서 제거
      if (userObj.photoURL !== defaultProfilePhotoUrl) {
        const deletePhotoRef = ref(storageService, userObj.photoURL);
        await deleteObject(deletePhotoRef);
      }

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
    <section className="flex w-auto flex-col text-xl items-center h-screen overflow-hidden">
      <span className="font-bold text-5xl p-10">프로필 수정</span>
      <form onSubmit={onSubmitProfileUpdate}>
        <div className="flex">
          <div className="mr-6">
            <div>
              <img
                className="bg-['newPhoto'] rounded-full w-44 h-44"
                src={newPhoto}
                alt={userObj.displayName}
              />
            </div>
            <div className="text-center mt-3 ">
              <label className="block cursor-pointer border-2 border-slate-300 p-1" htmlFor="input-file">
                이미지 추가
              </label>
              <input
                className="hidden "
                id="input-file"
                type="file"
                name="changeImg"
                accept="image/*"
                onChange={changeProfileImg}

              />
              <label className="block cursor-pointer border-2 border-slate-300 mt-1 p-1" htmlFor="delete-file">
                이미지 삭제
              </label>
              <input
                className="hidden"
                id="delete-file"
                type="button"
                name="deleteImg"
                onClick={deleteProfileImg}
              />
            </div>
          </div>
          <div className="mt-8">
            <label className="block" htmlFor="input-text">이름</label>
            <input
              className="block border-4 bg-slate-300 border-slate-300 mt-2"
              id="input-text"
              type="text"
              name="changeName"
              value={newDisplayName}
              onChange={onChange}
            ></input>
            <span className="text-slate-300 text-xs">* 이름은 최소 2자, 최대 20자 까지 입력이 가능해요</span>
          </div>
        </div>
        <div className="mt-6 mb-2"><hr /></div>
        <div className="text-2xl">
          <button
            className="border-2 bg-slate-300 border-slate-300 m-1 p-1"
            type="submit">
            완료
          </button>
          <button
            className="border-2 bg-slate-300 border-slate-300 m-1 p-1"
            type="reset" onClick={onCancel}>취소</button>
        </div>
      </form>
    </section >
  );
};

export default Profile;