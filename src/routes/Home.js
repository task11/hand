import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <>
      <Calendar userObj={userObj} />
      <ToDoList userObj={userObj} />
      <MemoList userObj={userObj} />
    </>
  );
};

export default Home;