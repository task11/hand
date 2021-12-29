import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <div className="flex justify-center items-center w-auto h-max">
      <div className="flex m-5 w-auto h-auto">
        <Calendar userObj={userObj} />
      </div>
      <div className="flex m-5 w-auto h-auto">
        <ToDoList userObj={userObj} />
        <MemoList userObj={userObj} />
      </div>
    </div>
  );
};

export default Home;