import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <div className="flex w-full">
      <div className="flex m-5 w-3/5 h-auto">
        <Calendar userObj={userObj} />
      </div>
      <div className="flex m-5 w-2/5 h-4/5">
        <ToDoList userObj={userObj} />
        <MemoList userObj={userObj} />
      </div>
    </div>
  );
};

export default Home;