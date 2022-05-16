import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "fBase";
import styled from "styled-components";

const ProfileSection = styled.section`
  display: flex;
  width: auto;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const SectionName = styled.span`
  font-weight: bold;
  font-size: 3rem;
  padding: 3rem;
`;

const ProfileForm = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImgForm = styled.div`
  margin-right: 1.5rem;
`;

const ProfileImg = styled.img`
  border-radius: 9999px;
  width: 11rem;
  height: 11rem;
`;

const ProfileButton = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const Label = styled.label`
  display: block;
  border-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity));
  margin: 0.3rem;
  &:hover{
    color: ${(props) => props.theme.accentColor};
  }
`;

const AddLabel = styled(Label).attrs({
  htmlFor: "input-file"
})`
cursor: pointer;


`;

const DelLabel = styled(Label).attrs({
  htmlFor: "delete-file"
})`
cursor: pointer;
`;

const NameLabel = styled(Label).attrs({
  htmlFor: "input-text"
})``;

const AddImg = styled.input.attrs({
  id: "input-file",
  type: "file",
  name: "changeImg",
  accept: "image/*",
})`
  display: none;
`;

const DelImg = styled.input.attrs({
  id: "delete-file",
  type: "button",
  name: "deleteImg",
})`
  display: none;
`;

const ProfileNameForm = styled.div`
  margin-top: 3rem;
`;

const ProfileName = styled.input.attrs({
  id: "input-text",
  type: "text",
  name: "changeName",
})`
  display: block;
  border-bottom-width: 1px;
  width: 14rem;
  height: 1.5rem;
  padding: 1rem;
  border: none;
  outline: none;
`;

const ProfileNameInfo = styled.span`
  font-size: 0.7rem;
`;

const Hr = styled.div`
margin-top: 1.5rem;
margin-bottom: 0.5rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const Button = styled.button`
  margin-right: 1rem;
  width: 3rem;
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
    };
    reader.readAsDataURL(imgFile);

  };

  const deleteProfileImg = async () => {
    const deletePhotoRef = ref(storageService, userObj.photoURL);
    const ok = window.confirm("정말로 삭제할까요?");
    if (ok && (userObj.photoURL !== defaultProfilePhotoUrl)) {
      await deleteObject(deletePhotoRef);
      await updateProfile(userObj, {
        photoURL: defaultProfilePhotoUrl,
      });
      setNewPhoto(userObj.photoURL);
      navigate('/');
    }

    // desertRef.delete().then(function () {
    //   // File deleted successfully
    // }).catch(function (error) {
    //   // Uh-oh, an error occurred!
    // });
  };

  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  };

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
      });
    }
    navigate('/');
  };

  const onCancel = () => {
    navigate('/');
  };

  return (
    <ProfileSection>
      <SectionName>프로필 수정</SectionName>
      <form onSubmit={onSubmitProfileUpdate}>
        <ProfileForm>
          <ProfileImgForm>
            <ProfileImg
              src={newPhoto}
              alt={userObj.displayName}
            />
            <ProfileButton>
              <AddLabel>이미지 변경</AddLabel>
              <AddImg onChange={changeProfileImg} />
              <DelLabel>이미지 삭제</DelLabel>
              <DelImg onClick={deleteProfileImg} />
            </ProfileButton>
          </ProfileImgForm>
          <ProfileNameForm>
            <NameLabel>이름</NameLabel>
            <ProfileName
              value={newDisplayName}
              onChange={onChange}
            />
            <ProfileNameInfo>* 이름은 최소 2자, 최대 20자 까지 입력이 가능해요</ProfileNameInfo>
          </ProfileNameForm>
        </ProfileForm>
        <Hr><hr /></Hr>
        <ButtonWrap>
          <Button
            type="submit">
            완료
          </Button>
          <Button
            type="reset"
            onClick={onCancel}>취소</Button>
        </ButtonWrap>
      </form>
    </ProfileSection >
  );
};

export default Profile;