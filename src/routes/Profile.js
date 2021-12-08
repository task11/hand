import React from "react";

const Profile = ({ userObj }) => {


  return (
    <div>
      <h2>프로필 편집</h2>
      <img src={userObj.photoURL} alt={userObj.displayName} />
      <span>Hi {userObj.displayName}</span>
    </div>
  );
};

export default Profile;