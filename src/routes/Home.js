import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "600px", width: "900px" }}>
        <Calendar userObj={userObj} />
      </div>
      <div>
        <ToDoList userObj={userObj} />
        <MemoList userObj={userObj} />
      </div>
    </div>
  );
};

export default Home;