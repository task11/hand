import LogOut from "components/LogOut";
import Preference from "components/Preference";
import React from "react";

const Setting = ({ userObj }) => {
  return (
    <div>
      <div>
        <LogOut userObj={userObj} />
        <Preference />
      </div>
    </div>
  )
}

export default Setting;