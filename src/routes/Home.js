import Memo from "components/Memo";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <>
      <ToDoList userObj={userObj} />
      <Memo userObj={userObj} />
    </>
  );
};

export default Home;