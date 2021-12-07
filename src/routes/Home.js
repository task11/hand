import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <ToDoList userObj={userObj} />
  );
};

export default Home;