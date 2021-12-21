import Calendar from "components/Calendar";
import MemoList from "components/MemoList";
import ToDoList from "components/ToDoList";
import React from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  return (
    <div className="flex w-full h-3/5">
      <div className=" m-5 w-4/5 h-3/5">
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