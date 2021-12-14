import Preference from "components/Preference";
import React from "react";

const Setting = ({ userObj }) => {
  console.log(userObj);
  return (
    <div>
      <div>
        <Preference />
      </div>
    </div>
  )
}

export default Setting;